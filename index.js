const express = require("express");
const { connectionToDb } = require("./config/db");
// const userRouter = require("./routes/user.routes");
// const bookRouter = require("./routes/booking");
// const auth = require("./middleware/auth");
const authRoutes = require('./routes/authRoutes');
const patientRouter = require("./routes/patients");

const app = express();
app.use(express.json());

const port = 8080;

app.get("/", (req, res) => {
  res.send("This is home");
});

app.use('/auth', authRoutes);
app.use('/patient',patientRouter);

app.listen(port, async () => {
  await connectionToDb();
  console.log(  `Server is running on port ${port}  `);
});