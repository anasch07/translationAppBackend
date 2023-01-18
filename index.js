const connectDatabase = require("./configDb/mongoDB");
const dotenv = require("dotenv");
const indexRoute = require("./routes/index");
const express = require("express");
const cors = require("cors");




const app = express();
dotenv.config();
connectDatabase();
app.use(express.json());
app.use(cors());




//cors



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

//routes
app.use("/", indexRoute);

//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
	console.log(
		`Server running on port ${PORT}`
	)
);
