import { Router } from 'express';
import UsersManager from '../persistence/daos/mongoManagers/UsersManager.js';
import passport from 'passport';

const router = Router();
const usersManager = new UsersManager();

router.get('/logout', (req, res) => {
    req.session.destroy( error => {
        if (error) {
            console.log(error);
            res.json({ message: error })
        } else {
            // res.json({ message: 'Sesión eliminada con éxito.' });
            res.redirect('/views/login')
        }
    })
});

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

router.get('/github', passport.authenticate('github'), (req, res) => {
    req.session.email = req.user.email;
    res.redirect('/views/products');
});

export default router;