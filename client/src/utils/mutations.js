// exports and executes the loginuser mutation in the apollo server
export const LOGIN_USER = gql`
    mutation login (email: String!, password: String!) {
        login (email: String!, password: String!) {
            user {
                _id
                username
            }
            token
        }
    }
`;

// exports and executes the adduser mutation in the apollo server
export const ADD_USER = gql`
    mutation addUser (username: String!, email: String!, password: String!) {
        addUser (username: String!, email: String!, password: String!) {
            user {
                _id
                username
            }
            token
        }
    }
`;

// exports and executes the savebook mutation in the apollo server
export const SAVE_BOOK = gql`
    mutation saveBook (authors: [String]!, description: String!, title: String!, bookId: String!, image: String!, link: String!) {
        saveBook (authors: [String]!, description: String!, title: String!, bookId: String!, image: String!, link: String!) {
            _id
            username
            email
            bookCount
            savedBooks {
                author
                description
                title
                bookId
                image
                link
            }
        }
    }
`;

// exports and executes the removebook mutation in the apollo server
export const REMOVE_BOOK = gql`
    mutation saveBook (authors: [String]!, description: String!, title: String!, bookId: String!, image: String!, link: String!) {
        saveBook (authors: [String]!, description: String!, title: String!, bookId: String!, image: String!, link: String!) {
            _id
            username
            email
            bookCount
            savedBooks {
                author
                description
                title
                bookId
                image
                link
            }
        }
    }
`;