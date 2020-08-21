const apiUsersRouter = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users.js');

apiUsersRouter.get('/users', getUsers);
apiUsersRouter.get('/users/:id', getUser);
apiUsersRouter.post('/users', createUser);
apiUsersRouter.patch('/users/me', updateUser);
apiUsersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = apiUsersRouter;
