const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();

const connection=()=>{

    const urlDatbase=process.env.DATABASE_URL;


    // old

    mongoose.connect(urlDatbase, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(console.log("Connected to MongoDB")).catch((err) => console.log(err))

};
module.exports= connection;

