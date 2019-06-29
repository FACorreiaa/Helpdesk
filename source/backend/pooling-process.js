/* eslint-disable no-console */
require("dotenv").config();

const {
  FORCED_EMAIL,
  REDMINEAPI_BASE_URL,
  API_BASE_URL,
  POOLING_DELTA_SECS,
  MONGODB_URL
} = process.env;

const axios = require("axios");

const moment = require("moment");

const mongoose = require("mongoose");

//
// Models
//
const { Issue } = require("./models/Issue");

const { sendEmailBySMTP } = require("./helpers/sendmail");

async function main() {
  try {
    console.log("starting...");

    // Connecting to the database
    await mongoose
      .connect(MONGODB_URL, {
        keepAlive: 1,
        useNewUrlParser: true
      })
      .then(() => {
        console.log("Successfully connected to the database");
      })
      .catch(err => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
      });
    console.log("connected to db");

    //
    // configure pooling timer
    //
    let timer0 = setInterval(() => {
      getIssues(
        moment()
          .subtract(POOLING_DELTA_SECS, "seconds")
          .toISOString()
      );
    }, 1000 * POOLING_DELTA_SECS);
  } catch (err) {
    console.log(err);
  }
}

main();

async function getUserFromRAPI(uid) {
  const url = `${REDMINEAPI_BASE_URL}/users/${uid}`;

  try {
    let res = await axios({
      method: "get",
      url: url,
      responseType: "json"
    });
    return res;
  } catch (error) {
    return new Error("getUserFromRAPI error");
  }
}

async function getIssues(dateAfter) {
  try {
    //
    // get issues new issues
    //
    let res = await axios({
      method: "get",
      url: `${REDMINEAPI_BASE_URL}/issues?after=${dateAfter}`,
      responseType: "json"
    });

    const { issues } = res.data;

    (() => {
      let { total_count, offset, limit } = res.data;
      console.log({
        total_count,
        offset,
        limit
      });
    })();

    for (let issue of issues) {
      try {
        //
        // get assigned_to email
        //
        let res_assigned_to = await axios({
          method: "get",
          url: `${REDMINEAPI_BASE_URL}/users/${issue.assigned_to.id}`,
          responseType: "json"
        });

        //
        // get author email
        //
        let res_author = await axios({
          method: "get",
          url: `${REDMINEAPI_BASE_URL}/users/${issue.author.id}`,
          responseType: "json"
        });

        //
        // extract product_name, client_name from project.name
        //
        const [product_name, client_name] = issue.project.name
          .slice(11)
          .split("@");

        const project = {
          id: issue.project.id,
          product_name,
          client_name
        };

        const dbIssue = new Issue({
          //
          // _id: default internal ObjectId
          //
          // fields with default values
          //
          // requested_on: {type: Date, default: new Date.now()}
          // evaluated_on: {type: Date, default: null},
          // score: {type: Number, default: 0}

          //
          // data from issue
          //
          project: project,
          tracker: issue.tracker,
          priority: issue.priority,

          assigned_to: {
            id: issue.assigned_to.id,
            name: issue.assigned_to.name,
            email: res_assigned_to.data.mail
          },

          author: {
            id: issue.author.id,
            name: issue.author.name,
            email: res_author.data.mail
          },

          created_on: new Date(issue.created_on),
          closed_on: new Date(issue.closed_on),

          subject: issue.subject,
          description: issue.description
        });

        const newIssue = await dbIssue.save();

        //
        // compose and send email to client
        //

        let message = `
                    <b>TrackerID:</b>
                    <p><i>${newIssue.tracker.name}</i></p>
                    <b>Client:</b>
                    <p><i>${newIssue.project.client_name}</i></p>
                    <b>Product:</b>
                    <p><i>${newIssue.project.product_name}</i><p>
                    <b>Date of creation:</b>
                    <p><i>${newIssue.created_on}</i></p>
                    <b>Colaborator:</b>
                    <p><i>${newIssue.assigned_to.name}</i></p>
                    <b>Subject:</b>
                    <p><i>${newIssue.subject}<i></p>
                    <b>Description:</b>
                    <p><i>${newIssue.description}</i></p>
                    <ul>
                    <li><a href="${API_BASE_URL}/issues/${
          newIssue.id
        }/vote/1">Vote 1</a></li>
                    <li><a href="${API_BASE_URL}/issues/${
          newIssue.id
        }/vote/2">Vote 2</a></li>
                    <li><a href="${API_BASE_URL}/issues/${
          newIssue.id
        }/vote/3">Vote 3</a></li>
                    <li><a href="${API_BASE_URL}/issues/${
          newIssue.id
        }/vote/4">Vote 4</a></li>
                    <li><a href="${API_BASE_URL}/issues/${
          newIssue.id
        }/vote/5">Vote 5</a></li>
                    </ul>`;

        await sendEmailBySMTP({
          subject: "Helpdesk issue evaluation",
          message: message
        });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (error) {
    //
    // axios errors
    //
    if (error.response) console.log("response error", error.response.status);
    else if (error.request) console.log("request error", error.request);
    else console.log("other error", error.message);
  }
}
