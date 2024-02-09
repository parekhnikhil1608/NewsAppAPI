const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs');
let obj = {
  users: []
};  

app.use(express.static(path.join(__dirname, '../api_test/build')))


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname,'../api_test/build/index.html'))
  // res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})
app.get('/about', function (req, res) {
  res.send('About')
})


app.post('/api',(req,res)=>{
  const { name} = req.body;
  // Do some validation on the data
  if (!name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newUser = { id: 1, name };
  res.status(201).json(newUser);
})


app.get('/json', function (req, res) {
  let obj=fs.readFileSync('../demo.json','utf8' , (err,data)=>{

    let obj = JSON.parse(data)
    // obj.users.push({
    //   _id: "test5",
    //   username:"<EMAIL>",
    //   password:"<PASSWORD>",
    //   email : "test5@gmail.com",
    //   });
    //   let jso = JSON.stringify(obj); //convert it back to json
    //   fs.writeFile('../demo.json', jso);
    })
    res.json(obj)
  })

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port ${port}`)
})
