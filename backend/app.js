const express = require('express');
const cors = require('cors'); 
const routes = require('./routes/index.route');
const errorMiddleware = require('./middleware/error');


const app = express();
const port = 3000;

// Middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define CORS headers (optional, as CORS middleware already handles this)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});


app.use('/api', routes);


app.use(errorMiddleware);


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
