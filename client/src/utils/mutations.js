import { gql } from '@apollo/client';

// exports and executes the loginuser mutation in the apollo server
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// exports and executes the adduser mutation in the apollo server
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// exports and executes the savebook mutation in the apollo server
export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!){
      saveBook( bookData: $bookData){
              _id
              username
              email
              savedBooks {
                 bookId
                 authors
                 description
                 title
                 image
                 link
             }
        
      }
  }  
`;

// exports and executes the removebook mutation in the apollo server
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!){
      removeBook(bookId: $bookId){
        _id
        username
        email
        savedBooks {
           bookId
           authors
           description
           title
           image
           link
        }
      }
  } 
`;