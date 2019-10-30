export default {
  Query: {
    me: (_, __, { currentUser }) => currentUser
  },
  User: {
    id: user => user._id,
    username: user => user.username
  }
};
