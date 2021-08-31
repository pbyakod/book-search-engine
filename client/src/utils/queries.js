import { gql } from '@apollo/client';

// holding the get-me query, which then executes the me query located in the apollo server
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                auhtors
                description
                title
                bookId
                image
                link
            }
        }
    }
`;