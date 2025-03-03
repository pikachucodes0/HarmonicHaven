import Studio from "../model/studioSchema.js";

// Function to add a new studio
const addStudio = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    const studioData = await Studio.create({
      name,
      price,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Studio added successfully!",
      studio: studioData,
    });
  } catch (error) {
    console.error("Error adding Studio:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add studio.",
      error: error.message,
    });
  }
};

// Function to list all studios
const listStudios = async (req, res) => {
  try {
    const studios = await Studio.findAll();
    res.status(200).json({
      message: "Studios retrieved successfully!",
      studios: studios,
    });
  } catch (error) {
    console.error("Error retrieving studios:", error);
    res.status(500).json({
      message: "Failed to retrieve studios.",
      error: error.message,
    });
  }
};

// Function to delete a studio by ID
const deleteStudio = async (req, res) => {
  try {
    const { id } = req.params; // Get id from request params
    if (!id) {
      return res.status(400).json({ message: "Studio ID is required" });
    }

    const studio = await Studio.findByPk(id);
    if (!studio) {
      return res.status(404).json({ message: "Studio not found" });
    }

    await studio.destroy();
    res
      .status(200)
      .json({ success: true, message: "Studio deleted successfully!" });
  } catch (error) {
    console.error("Error deleting studio:", error);
    res.status(500).json({
      message: "Failed to delete studio.",
      error: error.message,
    });
  }
};

export { addStudio, listStudios, deleteStudio };
