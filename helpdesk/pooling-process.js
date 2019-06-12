/* eslint-disable no-console */

const axios = require('axios');

const moment = require('moment');

const mongoose = require('mongoose');

function getDate(dateAfter) {
    return dateAfter ? moment(dateAfter).toISOString() : moment().subtract(1, 'minutes').toISOString();
}

//
// Models
//
const {
    User
} = require('./models/userModel');
const {
    Evaluation
} = require('./models/evaluationModel');
const {
    Issue
} = require('./models/issueModel');

const config = require('./config');

const {
    sendEmailBySMTP
} = require('./helpers/sendmail');
//
// projectName : "Helpdesk | CA Datacomm@Vectren"
//
function getProjectInfo(project) {
    const r = project.name.slice(11).split('@');
    return {
        id: project.id,
        product_name: r[0],
        client_name: r[1]
    };
}

async function main() {
    try {
        console.log('starting...');

        // Connecting to the database
        await mongoose.connect(config.url, {
            useNewUrlParser: true
        }).then(() => {
            console.log("Successfully connected to the database");
        }).catch(err => {
            console.log('Could not connect to the database. Exiting now...', err);
            process.exit();
        });

        console.log('connected to db');

        //
        // get all users
        //
        let res = await axios({
            method: 'get',
            url: 'https://redmine-mock-api.herokuapp.com/api/v1/users',
            responseType: 'json'
        });
        console.log('users from endpoint');

        const users = res.data;

        //
        // copy each user to local database
        //
        for (let user of users) {
            try {
                const dbUser = new User({
                    _id: user.id,
                    login: user.login,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    mail: user.mail,
                    created_on: user.created_on,
                    last_login_on: user.last_login_on
                });

                await User.findByIdAndUpdate(user.id, dbUser, {
                    useFindAndModify: false,
                    upsert: true
                }).exec();
            } catch (err) {
                // caused by 
                console.log(err);
            }
        }

        let timer0 = setInterval(() => getIssues(getDate(process.argv[2])), 1000 * 15);

    } catch (err) {
        console.log('******ERROR********');
        console.log(err);
    }
}

main();

async function getIssues(dateAfter) {

    const url = `https://redmine-mock-api.herokuapp.com/api/v1/issues?after=${dateAfter}`;

    try {
        let res = await axios({
            method: 'get',
            url: url,
            responseType: 'json'
        });

        const issues = res.data.issues;

        (() => {
            let {
                total_count,
                offset,
                limit
            } = res.data;
            console.log({
                total_count,
                offset,
                limit
            });
        })();

        for (let issue of issues) {
            try {
                const dbIssue = new Issue({
                    _id: issue.id,
                    project: issue.project,
                    tracker: issue.tracker,
                    status: issue.status,
                    priority: issue.priority,
                    author: issue.author,
                    assigned_to: issue.assigned_to,
                    subject: issue.subject,
                    description: issue.description,
                    done_ratio: issue.done_ratio,
                    start_date: issue.start_date,
                    closed_on: issue.closed_on,
                    created_on: issue.created_on,
                    updated_on: issue.updated_on
                });

                await dbIssue.save();

                const dbEvaluation = new Evaluation({
                    _id: issue.id,
                    //
                    // fields with default values
                    //
                    // requested_on: {type: Date, default: new Date.now()}
                    // evaluated_on: {type: Date, default: null},
                    // score: {type: Number, default: 0}

                    //
                    // data from issue
                    //
                    project: getProjectInfo(issue.project),
                    tracker: issue.tracker,
                    priority: issue.priority,
                    assigned_to: issue.assigned_to,
                    created_on: new Date(issue.created_on),
                    closed_on: new Date(issue.closed_on),


                    // compute response_time
                    response_time: (new Date(issue.closed_on) - new Date(issue.created_on))
                });

                await dbEvaluation.save();

                //
                // compose and send email to client
                //
                let message = `
                    <h1><a href="http://127.0.0.1:3000/votes/${issue.id}/1">Vote 1</a></h1>
                    <h1><a href="http://127.0.0.1:3000/votes/${issue.id}/2">Vote 2</a></h1>
                    <h1><a href="http://127.0.0.1:3000/votes/${issue.id}/3">Vote 3</a></h1>
                    <h1><a href="http://127.0.0.1:3000/votes/${issue.id}/4">Vote 4</a></h1>
                    <h1><a href="http://127.0.0.1:3000/votes/${issue.id}/5">Vote 5</a></h1>
                `;

                await sendEmailBySMTP({
                    subject: "vote this",
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
        if (error.response)
            console.log('response error', error.response.status);
        else if (error.request)
            console.log('request error', error.request);
        else
            console.log('other error', error.message);
    }
}