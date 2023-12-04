const express = require('express');
const app = express();
const publicRouter = require("./routes/public");
const authRouter = require("./routes/auth");

//Load Environment Variables
require("dotenv").config();

app.use(express.json());
app.use('/api/v1', publicRouter);
app.use('/api/v1/secure', authRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port ' + process.env.PORT);
})