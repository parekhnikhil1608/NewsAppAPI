const sql = require('mssql')

const config = {
    user: "sa",
    password: "sa123",
    server: "CGM2016",
    database: "trainee_test",
    options: {
        encrypt: false,
        trustServerCertificate: true,
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