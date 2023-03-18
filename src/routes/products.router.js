import { Router } from 'express';
import ProductManager from '../persistence/daos/mongoManagers/ProductsManager.js';

const router = Router();

const productManager = new ProductManager();

router.get('/', async (req, res) => {
    const results = await productManager.getProducts(req.query);
    if (results) {
        res.json({ message: 'Productos encontrados.', results })
    } else {
        res.json({ message: 'No hay productos disponibles.' })
    }
});

router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    const productFound = await productManager.getProductById(productId);
    if (productFound) {
        res.json({ message: 'Producto encontrado.', product: productFound })
    } else {
        res.json({ message: 'Producto no encontrado.' })
    }
});

router.post('/', async (req, res) => {
    const newProduct = req.body;
    const addedProduct = await productManager.addProduct(newProduct);
    if (addedProduct) {
        res.json({ message: 'Producto agregado exitosamente.', product: addedProduct })
    } else {
        res.json({ message: 'El producto no se ha podido agregar.' })
    }
});

router.put('/:productId', async (req, res) => {
    const { productId } = req.params;
    const newValuesObject = req.body;
    const updatedProduct = await productManager.updateProduct(productId, newValuesObject);
    if (updatedProduct) {
        res.json({ message: 'Se ha actualizado el producto exitosamente.', product: updatedProduct })
    } else {
        res.json({ message: 'El producto no se ha podido actualizar.' })  
    }    
});

router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;
    const deletedProduct = await productManager.deleteProduct(productId);
    if (deletedProduct) {
        res.json({ message: 'Se ha eliminado el producto exitosamente.', product: deletedProduct })
    } else {
        res.json({ message: 'El producto no se ha podido eliminar.' })
    }
});

export default router;