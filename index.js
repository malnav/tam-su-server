const express = require('express');
const moongoose = require('mongoose');
const cors = require('cors')
const confessionRoutes = require('./routes/confession');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const app = express();
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config()

module.exports.bcrypt = bcrypt

// const URI = 'mongodb+srv://malnav:malnav@malnav.dg4da.mongodb.net/mernMemories?retryWrites=true&w=majority';

app.use(express.json({limit: '30mb'}))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

//routes
app.use('/api/v1/confession',confessionRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/comment',commentRoutes);

// const URI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000'

moongoose.connect(process.env.DB_HOST,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}, console.log('Databased Connected !!!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log('Server is running'));