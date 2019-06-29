const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const auth = require('../../../auth');

// Load input validation
const validateRegisterInput = require("../../config/register");
const validateLoginInput = require("../../config/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation

    const {errors, isValid} = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            return res.status(400).json({email: "Email already exists"});
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation

    const {errors, isValid} = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({email}).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({emailnotfound: "Email not found"});
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({passwordincorrect: "Password incorrect"});
            }
        });
    });
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const result = await User.deleteOne({_id: req.params.id});
        if (result.n > 0) {
            res.status(200).json({message: "user removed"});
        } else {
            res.status(401).json({message: "Not allowed"})
        }
    } catch (error) {
        next(error);
    }
});

router.put("/:id", auth, async (req, res, next) => {
    console.log(req.params.id);
    try {
        const user = await User.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true});
        res.status(200).json({data: user, message: "User has been updated"});
    } catch (error) {
        next(error);
    }
});

router.get("/",auth, async (req, res, next) => {
    try {
        if (req.query.logical==="AND") {
            if (req.query.name && req.query.email) {
                const user = await User.find({$and: [{email: req.query.email}, {name: new RegExp(req.query.name,'i')}]});
                res.status(200).json({data: user, message: "Users fetched"});
            }else{
                res.status(422).json({message: "Missing query parameters"})
            }
        } else if (req.query.email || req.query.name) {
            const user = await User.find({$or: [{email: req.query.email}, {name: new RegExp(req.query.name,'i')}]});
            res.status(200).json({data: user, message: "Users fetched"});

        } else {
            const user = await User.find({});
            res.status(200).json({data: user, message: "Users fetched"});
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
