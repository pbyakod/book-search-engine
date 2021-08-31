import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// getting the neccesary imports from the apollo client
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

// making the graphql http link
const gqlHttpLink = createHttpLink({
  uri: '/graphql'
});

// generating middleware with a jswebtoken attached to requests
const gqlAuthLink = setContext(( _, { headers } ) => {
  // retrieving the auth token from localstorage and returns the headers to the graphql http link
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}`: '',
    },
  }
});

// executing the gqlauthlink middleware for our graphql api
const gqlClient = new ApolloClient({
  link: gqlAuthLink.concat(gqlHttpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    // implementing thee apolloprovider for our client
    <ApolloProvider client={ client }>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
