const mongoose = require("mongoose");

mongoose.connect("URLL" , {
    useNewUrlParser: true,
    useUnifiredTopology: true,
    useCreateIndex: true
}).then(()=> { 
    console.log('connection successful');
}).catch(() => {
    console.log('NO connection');
})