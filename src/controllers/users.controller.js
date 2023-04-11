export const logoutController = (req, res) => { 
    try {
        req.session.destroy( error => {
            if (error) {
                console.log(error);
                res.json({ message: error })
            } else {
                // res.json({ message: 'Sesión eliminada con éxito.' });
                res.redirect('/views/login')
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const githubLoginPassportController = (req, res) => {
    try {
        req.session.email = req.user.email;
        res.redirect('/views/products');
    } catch (error) {
        console.log(error);
    }
}