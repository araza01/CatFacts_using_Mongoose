const mongoose = require(`mongoose`);

mongoose.connect(`mongodb://localhost:27017/catfacts`, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log(`Connection Successful!`))
.catch((err) => console.log(`Something went wrong! \n Error: ` + err.message));