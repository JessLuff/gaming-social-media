const router = require('express').Router();
const {
  getUserPlatforms,
  getSingleUser,
  saveTeam,
  deleteTeam,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveTeam);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/team/:teamId').delete(authMiddleware, deleteTeam);

module.exports = router;
