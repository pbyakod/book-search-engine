// loading in user, signtoken, and authenticationerror to resolvers
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require("apollo-server-express")

const resolvers = {
    // generating our query resolver
    Query: {
        me: async (parent, args, context) => {
            // if the user exists, find and return their id and password
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id });
                return userData;
            }
            // else throw an autherror asking the user to login properly
            throw new AuthenticationError('Please log in using your credentials!');
        },
    },

    // generating our mutation resolver
    Mutation: {
        // the login mutation
        login: async (parent, { email, password }) => {
            // retrieving a user by their email input
            const user = await User.findOne({ email });
            // if the email does not match a particular user, return an autherror stating the error
            if (!user) {
                throw new AuthenticationError('No user profile matches the entered email address!');
            }
            // checking to see if their password input matches the listed password
            const correctPw = await user.isCorrectPassword(password);
            // if the passwords do not match, return an autherror stating the error
            if (!correctPw) {
                throw new AuthenticationError('The password you have entered is not valid!');
            }
            const token = signToken(user);
            return { token, user };
        },
        // the adduser mutation
        addUser: async (parent, args) => {
            // making a user based off their username, email, and password inputs
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        // the savebook mutation
        saveBook: async (parent, { bookData }, context) => {
             // if the data assigned to that particular user exists
            if (context.user) {
                // search for that book and uploading its id to the user
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );
                return updatedUser;
            }
            // throw an autherror if the user tries to save a book without logging in first
            throw new AuthenticationError('Please make sure you are logged in before saving a book');
        },
        // the removebook mutation
        removeBook: async (parent, { bookId }, context) => {
            // if the data assigned to that particular user exists
            if (context.user) {
                // update the user's library to remove that particular book based off its id
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            // throw an autherror if the user tries to remove a book without logging in first
            throw new AuthenticationError('Please make sure you are logged in before removing a book');
        }
    },
};

module.exports = resolvers;