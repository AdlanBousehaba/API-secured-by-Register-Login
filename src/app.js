const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

app.use(express.json());
app.use('/',userRoutes);

mongoose.connect('mongodb://root:root@cluster0-shard-00-00.tvarc.mongodb.net:27017,cluster0-shard-00-01.tvarc.mongodb.net:27017,cluster0-shard-00-02.tvarc.mongodb.net:27017/?ssl=true&replicaSet=atlas-8vxs10-shard-0&authSource=admin&retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
    
    
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    });

module.exports = app;