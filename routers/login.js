const sql = require('mssql')
var router = require("express").Router();
const express = require('express');
const jwt = require('jsonwebtoken');
let jwtSecretKey = process.env.JWT_SECRET_KEY;


// Login User API   POST--REQUEST
router.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if(username == 'admin' && password == '123'){
            let data = {
                username : username,
                password: password,
            }
            const token = jwt.sign(data, jwtSecretKey);
            res.json({
                'token' : token
            });

        }else{
            res.json({
                "message": "Invalid Username or Password",
            })
        }

    } catch (err) {
        console.error("Error executing SQL query", err);
        res.status(500).json({ "result": "Fail" });
    }
})

module.exports = router;
