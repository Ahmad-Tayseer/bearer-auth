'use strict';

const { users } = require('../models/users.model');

async function handleSignup(req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await users.create(req.body);
        res.status(201).json(record);
        } catch (e) { res.status(403).send('Error Creating User, Try Another Username'); }
};

function handleSignin(req, res, next) {
    res.status(200).json(req.user);
}

async function handleGetUsers(req, res, next) {
    try {
        const userRecords = await users.findAll({});
        const list = userRecords.map(user => user.username);
        res.status(200).json(list);
    } catch (e) {
        console.error(e);
        next(e);
    }
};

function handleSecret(req, res) {
    res.status(200).json({
        'message': 'You are authorized to view the user orders',
        'user': req.user
    });
};
  
module.exports = {
    handleSignup,
    handleSignin,
    handleGetUsers,
    handleSecret
  }