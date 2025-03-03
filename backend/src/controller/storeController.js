import Store from "../model/storeSchema.js";

// Function to add a new product
const addProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });
    }

    const productData = await Store.create({
      name,
      price,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      product: productData,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product.",
      error: error.message,
    });
  }
};

// Function to list all products
const listProducts = async (req, res) => {
  try {
    const products = await Store.findAll();
    res.status(200).json({
      message: "Products retrieved successfully!",
      products: products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({
      message: "Failed to retrieve products.",
      error: error.message,
    });
  }
};

// Function to delete a product by ID
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body; // Get id from request body
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Store.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Failed to delete product.",
      error: error.message,
    });
  }
};
 //get product by id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching product with ID:", id); // Debugging log

    const product = await Store.findByPk(id); // For PostgreSQL Sequelize
    // const product = await Store.findOne({ where: { id } }); // Alternative method

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully!",
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      message: "Failed to retrieve product.",
      error: error.message,
    });
  }
};

export { addProduct, listProducts, removeProduct,getProductById };
