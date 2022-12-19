const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const blog = require('./routes/blog.route');
const user = require('./routes/user.route');

mongoose.connect('mongodb+srv://backeryousif:Obsidian87$@cluster0.shvkrik.mongodb.net/?retryWrites=true&w=majority').then((success)=>{
    console.log('Successfully connected to database');
}).catch((error)=>{
    console.log(error);
    process.exit(1);
});

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use('/Blog',blog);
app.use('/User', user);

app.listen(3000,()=>{console.log('Server Listening on port 3000');})

module.exports=app;
