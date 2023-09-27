const sql = require('mssql')
var router = require("express").Router();
var loginuser = require('../middleware/login')
var validationData = require('../middleware/countryMiddleware')
const { body, validationResult } = require('express-validator');


//get All Country API   GET--REQUEST
router.get("/country", loginuser, async (req, res) => {
    try {
        if (req.query.pagesize || req.query.page) {
            const pageSize = parseInt(req.query.pagesize) || 10; // Default to 10 if not provided
            const page = parseInt(req.query.page) || 0; // Default to page 0 if not provided
            const query = `
            SELECT *
            FROM country
            ORDER BY PKId
            OFFSET ${(page-1) * pageSize} ROWS
            FETCH NEXT ${pageSize} ROWS ONLY
        `;

            const result = await sql.query(query)
            res.json(result.recordset)
        } else {

            const result = await sql.query("select * from country");
            res.json(result.recordset);
        }

    } catch (err) {
        console.error("Error executing SQL query", err);
        res.status(500).json({ error: "Internal Server error" });
    }
});


//Add/Update Country API    POST--REQUEST
router.post("/Country",
    loginuser,
    validationData,
    async (req, res) => {
        try {
            console.log(req.body.CountryName)
            const CountryName = req.body.CountryName
            const check = await sql.query(`select * from country where CountryName ='${CountryName}' `)
            console.log("Length : " + check.recordset)
            if (check.recordset.length >= 1) {
                res.json(check.recordset)
            } else {
                if (req.body.PKId) {
                    const PKId = req.body.PKId
                    await sql.query(`update Country set CountryName = '${CountryName}' , ModifiedOn = getdate() where PKId = ${PKId}`);
                    res.json({
                        "result": "Success"
                    }).status(202);
                } else {
                    await sql.query(`Insert into country values('${CountryName}',1,0,getdate(), 1, getdate())`);
                    res.json({
                        "result": "Success"
                    }).status(202);
                }
            }
        } catch (err) {
            console.error("Error executing SQL query", err);
            res.status(500).json({ "result": "Fail" });
        }
    });


// DELETE Country API   DELETE--REQUEST
router.delete("/Country", loginuser, async (req, res) => {
    try {
        console.log(req.body.PKId)
        const PKId = req.body.PKId
        const check = await sql.query(`select * from country where PKId ='${PKId}' `)
        if (check.recordset.length >= 1) {
            await sql.query(`delete from Country where PKId = ${PKId}`);
            res.send({
                "result": "Success"
            })
        } else {
            res.json({
                "result": "PKId Not Found"
            }).status(202);
        }

    } catch (err) {
        console.error("Error executing SQL query", err);
        res.status(500).json({ "result": "Fail" });
    }
});


module.exports = router;
