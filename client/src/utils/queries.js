// importing gql from apollo client
import { gql } from '@apollo/client';

// creating GET_ME gql, which will execute the me query set up using Apollo Server.
export const GET_ME = gql`
 query me { 
     me {
         _id
         username
         email
         bookCount
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