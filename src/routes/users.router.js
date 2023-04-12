import { Router } from 'express';
import passport from 'passport';
import {
    githubLoginPassportController,
    logoutController
} from '../controllers/users.controller.js';

const router = Router();

router.get('/logout', logoutController);

// registro sin passport
// router.post('/register', async (req, res) => {
//     const newUser = await usersManager.createUser(req.body);
//     if (newUser) {
//         res.redirect('/views/login')
//     } else {
//         res.redirect('/views/errorRegister')
//     }
// });

// registro con passport
router.post('/register', passport.authenticate('register', {
    failureRedirect: '/views/errorRegister',
    successRedirect: '/views/login',  
    passReqToCallback: true
}));

// login sin passport
// router.post('/login', async (req, res) => {
//     const { email } = req.body;
//     const user = await usersManager.loginUser(req.body);
//     if (user) {
//         req.session.name = user[0].firstName;
//         req.session.email = email;
//         if (user[0].admin) {
//             req.session.role = 'admin'
//         } else {
//             req.session.role = 'user'
//         }
//         res.redirect('/views/products')
//     } else {
//         res.redirect('/views/errorLogin')
//     }
// });

// login con passport
router.post('/login', passport.authenticate('login', {
    failureRedirect: '/views/errorLogin',
    successRedirect: '/views/products',  
    passReqToCallback: true
}));

// login con passport github
router.get('/authGithub', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github', passport.authenticate('github'), githubLoginPassportController);

export default router;