const sql = require('mssql')

const config = {
    user: "sa",
    password: "sa123",
    server: "CGM2016",
    database: "Freducate",
    options: {
        encrypt: false,
    },
    pool: {
        max: 50,
        min: 0,
        idleTimeoutMillis: 300000,
    },
};

const dbConnection = ()=>{
    sql.connect(config).then(() => {
        console.log("Connected to SQL Server");
    }).catch((err) => {
        console.error("Error connecting to SQL Server:", err);
    });
}

module.exports = dbConnection