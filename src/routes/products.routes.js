import { Router } from 'express';
import { 
    deleteProduct, 
    updateProduct, 
    createProduct, 
    getProduct, 
    getProductS} 
    from '../controllers/products.controllers.js';

const router = Router();

// Obtener todos los productos
router.get('/inventarios', getProductS);

// Obtener un producto por IDs
router.get('/inventarios/:id', getProduct);

// Agregar un nuevo producto
router.post('/inventarios', createProduct);

// Actualizar un producto
router.put('/inventarios/:id', updateProduct);

// Eliminar un producto
router.delete('/inventarios/:id', deleteProduct);

export default router;