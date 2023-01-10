const mongoose= require('mongoose')
const logger = require('winston')
try {
 // Connect to the MongoDB cluster
 mongoose.connect(
 process.env.MongoConfig,
   { useNewUrlParser: false, useUnifiedTopology: false },
   () => logger.info(" Mongoose is connected")
 );
 
} catch (e) {
 console.log("could not connect");
}

