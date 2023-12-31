const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const { SERVER_SECRET } = require('../middlewares/auth-mdw');

router.post('/', async (req, res) => {
    const { user, pass } = req.body;
    const userFound = await userService.validateUser(user, pass);
    if(userFound) { 
        const token = jwt.sign( {user/*, role: "User"*/}, SERVER_SECRET);
        return res.json({ token });
    } else {
        res.status(401).json( {error: 'Invalid user or password'} );
    }
});

module.exports = router;