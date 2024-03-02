let mongoose = require('mongoose');

let databaseUrl = 'mongodb+srv://admin:image-upload77@cluster0.rpfaxm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

let connection = mongoose.connect(databaseUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log('connected'))

module.exports = {
    connection
}