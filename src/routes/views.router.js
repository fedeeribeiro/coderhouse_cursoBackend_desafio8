import { Router } from 'express';
import CartManager from '../persistence/daos/mongoManagers/CartsManager.js';
import ProductManager from '../persistence/daos/mongoManagers/ProductsManager.js';

const router = Router();

const productManager = new ProductManager();
const cartManager = new CartManager();

router.get('/', async (req, res) => {
    const results = await productManager.getProducts(req.query);
    const products = (results.payload).map(product => {
        return {
            id: product._id,
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            category: product.category,
            status: product.status
        }
    });
    res.render('home', { products })
});

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts')
});

router.get('/products', async (req, res) => {
    const results = await productManager.getProducts(req.query);
    const user = { email: req.user.email, name: req.user.firstName, role: req.user.admin ? 'admin' : 'user' };
    if (results.prevLink) {
        results.prevLink = (results.prevLink).replace('api', 'views')
    }
    if (results.nextLink) {
        results.nextLink = (results.nextLink).replace('api', 'views')
    }
    const products = (results.payload).map(product => {
        return {
            id: product._id.toString(),
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            category: product.category,
            status: product.status
        }
    });
    res.render('products', { products, results, user })
});

router.get('/carts/:cartId', async (req, res) => {
    const { cartId } = req.params;
    const cart = await cartManager.getProductsFromCart(cartId);
    const products = (cart[0].products).map(product => {
        return {
            id: product._id._id.toString(),
            title: product._id.title,
            price: product._id.price,
            thumbnail: product._id.thumbnail,
            code: product._id.code,
            quantity: product.quantity,
            sum: product.quantity * product._id.price
        }
    });
    const sumCart = products.reduce((accumulator, currentValue) => accumulator + currentValue.sum, 0);
    res.render('cart',{ products, cartId, sumCart })
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/register', (req, res) => {
    res.render('register')
});

router.get('/errorRegister', (req, res) => {
    res.render('errorRegister')
});

router.get('/errorLogin', (req, res) => {
    res.render('errorLogin')
});

export default router;