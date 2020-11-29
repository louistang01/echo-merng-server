const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators')
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

//sometimes you have multiple resolvers and data goes through multiple resolvers. register(_) -> The (_) is actualy "parent". This "parent" would be the resolver before this one. 
//But if there are no resolvers before this, just use (_)
//the args refers to the typeDef "registerInput", and registerInput is linked to RegisterInput typeDef which has 4 parameters:         
        //username: String!
        //password: String!
        //confirmPassword: String!
        //email: String! 


function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, 
    { expiresIn: '1h'}
    );
}


module.exports = {
    Mutation: {
      async login(_, { username, password }) {
        const { errors, valid } = validateLoginInput(username, password);
  
        if (!valid) {
          throw new UserInputError('Errors', { errors });
        }
  
        const user = await User.findOne({ username });
  
        if (!user) {
          errors.general = 'User not found';
          throw new UserInputError('User not found', { errors });
        }
  
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          errors.general = 'Wrong crendetials';
          throw new UserInputError('Wrong crendetials', { errors });
        }
  
        const token = generateToken(user);
  
        return {
          ...user._doc,
          id: user._id,
          token
        };
      },
      async register(
        _,
        {
          registerInput: { username, email, password, confirmPassword }
        }
      ) {
        // Validate user data
        const { valid, errors } = validateRegisterInput(
          username,
          email,
          password,
          confirmPassword
        );
        if (!valid) {
          throw new UserInputError('Errors', { errors });
        }
        // TODO: Make sure user doesnt already exist
        const user = await User.findOne({ username });
        if (user) {
          throw new UserInputError('Username is taken', {
            errors: {
              username: 'This username is taken'
            }
          });
        }
        // hash password and create an auth token
        password = await bcrypt.hash(password, 12);
  
        const newUser = new User({
          email,
          username,
          password,
          createdAt: new Date().toISOString()
        });
  
        const res = await newUser.save();
  
        const token = generateToken(res);
  
        return {
          ...res._doc,
          id: res._id,
          token
        };
      }
    }
  };