import db from '../../models/index.js'; 


export const getProductS = async (req, res) => {
    try {
        const productos = await db.Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

export const  getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await db.Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { nombre, cantidad, precio, categoria_id, proveedor_id } = req.body;

        // Validar datos
        if (!nombre || cantidad == null || precio == null || !categoria_id || !proveedor_id) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const producto = await db.Producto.create({
        nombre, cantidad, precio, categoria_id, proveedor_id

    });

        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto', error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, cantidad, precio, categoria_id, proveedor_id } = req.body;

        // Validar datos
        if (!nombre || cantidad == null || precio == null || !categoria_id || !proveedor_id) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const producto = await db.Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await producto.update({ nombre, cantidad, precio, categoria_id, proveedor_id });

        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await db.Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        await producto.destroy();
        res.status(200).json({ message: 'Producto eliminado'});
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};