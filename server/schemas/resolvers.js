// loading in user, signtoken, and authenticationerror to resolvers
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require("apollo-server-express")

const resolvers = {
    // generating our query resolver
    Query: {
        me: async (parent, args, context) => {
            // if the user exists, find and return their id
            if (context.user) {
                return User.findOne({
                    _id: context.user._id
                });
            }
            // else throw an autherror asking the user to login properly
            throw new AuthenticationError ('Please log in using your credentials!');
        }
    },

    // generating our mutation resolver
    Mutation: {

        // the login mutation
        login: async (parent, { email, password }) => {
            // retrieving a user by their email input
            const getUser = await User.findOne({ email });
            // if the email does not match a particular user, return an autherror stating the error
            if (!getUser) {
                throw new AuthenticationError ('No user profile matches the entered email address!')
            }
            // checking to see if their password input matches the listed password
            const checkPassword = await User.isCorrectPassword(password)
            // if the passwords do not match, return an autherror stating the error
            if (!checkPassword) {
                throw new AuthenticationError ('The password you have entered is not valid!')
            }
        },

        // the adduser mutation
        addUser: async (parent, { username, email, password }) => {
            // making a user based off their username, email, and password inputs
            const makeUser = await User.create({ username, email, password });
            // allocating a generated token to that particular user
            const token = signToken(user);
            // returning both the user credentials and their respective token
            return { makeUser, token };
        },

        // the savebook mutation
        saveBook: async (parent, args, context) => {
            // if the data assigned to that particular user exists
            if (context.user) {
                // try searching for a book and uploading its id to the user
                try {
                    const searchBook = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedBooks: args} },
                        { new: true }
                    );
                    return searchBook;
                // catch any errors if they exist
                } catch (err) {
                    return err;
                }
            }
            // throw an autherror if the user tries to save a book without logging in first
            throw new AuthenticationError ('Please make sure you are logged in before saving a book');
        },

        // the removebook mutation
        removeBook: async (parent, { bookId }, context) => {
            // if the data assigned to that particular user exists
            if (context.user) {
                // try updating the user's library to remove that particular book based off its id
                try {
                    const updatingUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { savedBooks: { bookId: bookId }  } },
                        { new: true }
                    );
                    return updatingUser;
                // catch any errors
                } catch (err) {
                    return err;
                }
            }
            // throw an autherror if the user tries to remove a book without logging in first
            throw new AuthenticationError ('Please make sure you are logged in before removing a book');
        }
    }
}

// exporting the resolvers
module.exports = resolvers;