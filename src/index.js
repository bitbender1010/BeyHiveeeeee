const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config;
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

//Database
mongoose.connect('mongodb+srv://adebayoileri:'+ process.env.PASSWORD +'@trackman-kt05w.mongodb.net/test?retryWrites=true&w=majority',{
  useUnifiedTopology: true ,
  useNewUrlParser: true
});

const userRoutes = require('./routes/userRoutes');

// CORS POLICY
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', 'PUT,DELETE,GET,PATCH,POST');
    return res.status(200).json({});
  }
  next();
});

//Routes
app.use('/api/v1/user', userRoutes);
const port = process.env.PORT;
app.listen(port, () => console.log(`App started on ${process.env.PORT}`));

app.all('*', (req, res) =>
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Route unavailable on server.'
  })
);