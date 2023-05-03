import DAO from '../persistence/DAOs/factory.js';

const cartsManager = DAO.carts;

export const addCartController = async (req, res) => {
    try {
        const addedCart = await cartsManager.addCart();
        res.json({ message: `El carrito ha sido creado exitosamente con el ID ${addedCart._id}.` })
    } catch (error) {
        console.log(error);
    }
}

export const getCartByIdController = async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await cartsManager.getProductsFromCart(cartId);
        if (cart) {
            res.json({ message: 'Carrito encontrado.', cart: cart })
        } else {
            res.json({ message: 'Carrito no encontrado.' })
        }
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCartController = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const addedProduct = await cartsManager.addProductToCart(cartId, productId);
        if (addedProduct) {
            res.json({ message: 'El producto se ha agregado al carrito exitosamente.', product: addedProduct })
        } else {
            res.json({ message: 'El producto no ha podido ser agregado al carrito.' })
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteProductFromCartController = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const cart = await cartsManager.deleteProductInCart(cartId, productId);
        if (cart) {
            res.json({ message: 'El producto se ha eliminado del carrito exitosamente.', cart: cart })
        } else {
            res.json({ message: 'El producto no ha podido ser eliminado al carrito.' })
        }
    } catch (error) {
        console.log(error);
    }
}

export const replaceProductsInCartController = async (req, res) => {
    try {
        const { cartId } = req.params;
        const products = req.body;
        const cart = await cartsManager.replaceProductsInCart(cartId, products);
        if (cart) {
            res.json({ message: 'Se han actualizado los productos del carrito exitosamente.', cart: cart })
        } else {
            res.json({ message: 'No se han podido actualizar los productos del carrito.' })
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateProductInCartController = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;
        const cart = await cartsManager.updateProductInCart(cartId, productId, quantity);
        if (cart) {
            res.json({ message: 'Se ha actualizado la cantidad del producto en el carrito exitosamente.', cart: cart })
        } else {
            res.json({ message: 'No se ha podido actualizar la cantidad del producto en el carrito.' })
        }
    } catch (error) {
        console.log(error);
    }
}

export const emptyCartController = async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await cartsManager.emptyCart(cartId);
        if (cart) {
            res.json({ message: 'Se ha vaciado el carrito exitosamente.', cart: cart })
        } else {
            res.json({ message: 'No se ha podido vaciar el carrito.' })
        }
    } catch (error) {
        console.log(error);
    }
}