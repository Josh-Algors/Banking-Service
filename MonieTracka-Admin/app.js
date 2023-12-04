const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const cors = require('cors'); 

const publicRouter = require("./routes/public");
const bodyParser = require('body-parser');
const authRouter = require("./routes/auth");


//Load Environment Variables
require("dotenv").config();

app.use(express.json());

// Parse JSON bodies for all requests
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Service is up!');
});


// const corsOptions = {
//   origin: 'http://127.0.0.1:5500', // Adjust to your client's origin
//   methods: ['GET', 'POST'],
// };
// app.use(cors(corsOptions));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/websocket.html');
// });

app.use('/api/v1', publicRouter);
app.use('/api/v1/secure', authRouter);

app.use((err, req, res, next) => {

  if(err.code == 401)
  {
    return res.status(401).send(err.message);
  }
  res.status(err.code).json({ message: "Internal Server Error!" });

});

// Listen for WebSocket connections
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle events from clients
//   socket.on('custom-event', (data) => {
//     // Broadcast the event to all connected clients
//     io.emit('custom-event', data);
//   });

//   // Handle disconnections
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

app.listen(process.env.PORT || 3001, () => {
  console.log('Server started on port ' + process.env.PORT);
})