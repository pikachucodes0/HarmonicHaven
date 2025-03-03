  import Store from "../model/storeSchema.js";
  import Studio from "../model/studioSchema.js"
  // Admin adding a new product
  export const addProduct = async (req, res) => {
      try {
        const { name, price, description, image } = req.body;
        const product = new Store({ name, price, description, image });
        await product.save();
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
      }
    };
    
    // Admin adding a new studio
    export const addStudio = async (req, res) => {
      try {
        const { name, price, description, image } = req.body;
        const studio = new Studio({ name, price, description, image });
        await studio.save();
        res.status(201).json(studio);
      } catch (error) {
        res.status(500).json({ message: 'Error adding studio', error: error.message });
      }
    };
    
    // Admin updating a product
    export const updateProduct = async (req, res) => {
      const { id } = req.params;
      const { name, price, description, image } = req.body;
      try {
        const product = await Store.findByPk(id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        await product.save();
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
      }
    };
    
    // Admin updating a studio
    export const updateStudio = async (req, res) => {
      const { id } = req.params;
      const { name, price, description, image } = req.body;
      try {
        const studio = await Studio.findByPk(id);
        if (!studio) {
          return res.status(404).json({ message: 'Studio not found' });
        }
        studio.name = name;
        studio.price = price;
        studio.description = description;
        studio.image = image;
        await studio.save();
        res.status(200).json(studio);
      } catch (error) {
        res.status(500).json({ message: 'Error updating studio', error: error.message });
      }
    };
    
    // Admin deleting a product
    export const deleteProduct = async (req, res) => {
      const { id } = req.params;
      try {
        const product = await Store.findByPk(id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
      }
    };
    
    // Admin deleting a studio
    export const deleteStudio = async (req, res) => {
      const { id } = req.params;
      try {
        const studio = await Studio.findByPk(id);
        if (!studio) {
          return res.status(404).json({ message: 'Studio not found' });
        }
        await studio.destroy();
        res.status(200).json({ message: 'Studio deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting studio', error: error.message });
      }
    };