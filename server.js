const express = require('express');
const cors = require('cors')
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const PORT = 8000;
const USER_NAME = `user1`;
const PASSWORD = `user1P`;
const DATA_BASE_NAME = `NewWaveDb`;

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(`/api`, testimonialsRoutes);
app.use(`/api`, concertsRoutes);
app.use(`/api`, seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


app.use((req, res) => {
  res.status(404).send('404 not found...');
})


mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.pv477hr.mongodb.net/${DATA_BASE_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));


const server = app.listen(process.env.PORT || PORT, () => {
  console.log()
  console.log('Server is running on Port:', 8000)
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

});

// "test": "mocha --watch \"./{,!(node_modules|client)/**/}*.test.js\""

module.exports = server;