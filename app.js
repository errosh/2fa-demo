const express = require('express')
const app = express()
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');
const router = require('./routes/user');
const path = require('path');
const PORT = process.env.PORT || 8000;

const AWS = require('aws-sdk');

// Set the region for AWS SDK if it's not set in your environment variables
AWS.config.update({ region: 'us-east-1' });

const secretsManager = new AWS.SecretsManager();

const getSecret = async () => {
  try {
    const params = {
      SecretId: 'DATABASE_URI' // Replace with your secret ID or name
    };

    const data = await secretsManager.getSecretValue(params).promise();
    const secretValue = JSON.parse(data.SecretString);
    console.log('Retrieved secret:', secretValue);
    return secretValue;
  } catch (err) {
    console.error('Error retrieving secret:', err);
    throw err;
  }
};

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("Database connection established!");
  })
  .catch((err) => console.log(err));
app.use(express.static(path.join(__dirname, 'build')));
app.get("/hello",(req, res) => {
  res.send("Hello World");
})
router.get('/', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, 'build')});
});
app.use(cors({origin:['http://localhost:3000']}))
app.use(express.json())
app.get('/test',async(req, res)=>{
  const test = await getSecret()
  res.send(test)
})
app.use('/api',router)

app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`)
})



