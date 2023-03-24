const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sneh:root@cluster0.vtybwdu.mongodb.net/?retryWrites=true&w=majority" , {
    useNewUrlParser: true,
    // useUnifiredTopology: true,
    // useCreateIndex: true
}).then(()=> { 
    console.log('connection successful');
}).catch((ERR) => {
    console.log('Not connected');
})

const contactSchema = {
    email: String,
    username: String
 }; 
 