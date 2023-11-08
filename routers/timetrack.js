const sql = require('mssql')
var router = require("express").Router();
router.post('/', async (req, res) => {
  try {
    const userId = req.body.userId;
    const screenName = req.body.screenName;
    const timeSpent = req.body.timeSpent;
    const startTracking = req.body.startTracking;

    // Use string interpolation, but validate and sanitize the input
    const sqlQuery = `INSERT INTO screen_time_tracking (user_id, screen_name, time_spent, start_tracking, stop_tracking, inserted_on)
          VALUES ('${userId}', '${screenName}', ${timeSpent}, '${startTracking}', CURRENT_TIMESTAMP, GETDATE())`;

    const result = await sql.query(sqlQuery);

    console.log(result);
    res.json({
      result: "success",
      message: "Your screen time added"
    });
  } catch (err) {
    console.error("Error executing SQL query", err);
    res.json({
      result: "Fail",
      message: "Error executing SQL query"
    });
  }
});

// Define a GET route to retrieve data
router.get('/', async (req, res) => {
  try {
    const query = `
        SELECT user_id, SUM(time_spent) AS total_time_spent, screen_name
        FROM screen_time_tracking
        WHERE user_id = 1 
        GROUP BY user_id, screen_name;
      `;

    const result = await sql.query(query); // Execute the SQL query using your SQL library
    // console.log(result);
    res.json(result);
  } catch (err) {
    console.error("Error executing SQL query", err);
    res.json({
      result: "Fail",
      message: "Error executing SQL query"
    });
  }
});

router.get('/getByCategory/:screen_name', async (req, res) => {
  try {
    const { screen_name } = req.params; // Get the screen_name from the URL parameter
    const query = `
    SELECT id,time_spent,screen_name , inserted_on
    FROM screen_time_tracking
    WHERE screen_name = @screen_name
    `;

    const request = new sql.Request();
    request.input('screen_name', sql.VarChar, screen_name);

    const result = await request.query(query); // Execute the SQL query with the screen_name parameter

    if (result.recordset.length > 0) {
      res.json({
        result: "Success",
        data: result.recordset
      });
    } else {
      res.json({
        result: "Fail",
        message: "No data found"
      });
    }
  } catch (error) {
    console.error("Error executing SQL query", error);
    res.json({
      result: "Fail",
      message: "Error executing SQL query"
    });
  }
});



module.exports = router;