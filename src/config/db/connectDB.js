const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/todo-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect MongoDB successfully');
    }
    catch (error) {
        console.log(console.error());
    }
}
module.exports = { connect };