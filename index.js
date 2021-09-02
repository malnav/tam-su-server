const express = require('express');
const moongoose = require('mongoose');
const cors = require('cors')
const memoriesRoutes = require('./routes/memories');
const usersRoutes = require('./routes/users');
const app = express();
const bcrypt = require('bcrypt')

module.exports.bcrypt = bcrypt

const URI = 'mongodb+srv://malnav:malnav@malnav.dg4da.mongodb.net/mernMemories?retryWrites=true&w=majority';

app.use(express.json({limit: '30mb'}))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
//app.use(cors())

//routes
app.use('/api/v1/memories',memoriesRoutes);
app.use('/api/v1/users',usersRoutes);

// const URI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000'

moongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}, console.log('Databased Connected !!!'));

const PORT = 5000;

app.listen(PORT,console.log('Server is running'));