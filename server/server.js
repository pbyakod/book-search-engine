const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// loading in middleware
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

// creating server const to apply middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
})

// applying middleware to the application
server.applyMiddleware({ app });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MONGODB_URI = 'mongodb+srv://user-1:passwordauth123@cluster0.y5cwp.mongodb.net/books?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI || "mongodb://localhost/books", 
  { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
  }
);

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
