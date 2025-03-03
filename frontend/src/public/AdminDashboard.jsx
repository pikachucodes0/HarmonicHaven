import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaPlus, FaList, FaSignOutAlt } from "react-icons/fa"; // Add icon imports


export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [studios, setStudios] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [newStudio, setNewStudio] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [activeSection, setActiveSection] = useState("welcome");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingStudio, setEditingStudio] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
    fetchStudios();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/store/list");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchStudios = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/studio/list");
      setStudios(response.data.studios);
    } catch (error) {
      console.error("Error fetching studios:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      let imageUrl = "";
      if (newProduct.image) {
        const data = new FormData();
        data.append("file", newProduct.image);

        const uploadResponse = await axios.post(
          "http://localhost:5000/api/file/upload",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        imageUrl = "http://localhost:5000/" + uploadResponse.data.file.path;
      }

      const productData = { ...newProduct, image: imageUrl || newProduct.image };

      await axios.post("http://localhost:5000/api/store/add", productData);
      alert("Product added successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleAddStudio = async () => {
    try {
      let imageUrl = "";
      if (newStudio.image) {
        const data = new FormData();
        data.append("file", newStudio.image);

        const uploadResponse = await axios.post(
          "http://localhost:5000/api/file/upload",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        imageUrl = "http://localhost:5000/" + uploadResponse.data.file.path;
      }

      const studioData = { ...newStudio, image: imageUrl || newStudio.image };

      await axios.post("http://localhost:5000/api/studio/add", studioData);
      alert("Studio added successfully!");
      fetchStudios();
    } catch (error) {
      console.error("Error adding studio:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteStudio = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/studios/${id}`);
      fetchStudios();
    } catch (error) {
      console.error("Error deleting studio:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setActiveSection("edit-product");
  };

  const handleEditStudio = (studio) => {
    setEditingStudio(studio);
    setActiveSection("edit-studio");
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/products/${editingProduct.id}`, editingProduct);
      alert("Product updated successfully!");
      fetchProducts(); // Fetch updated product list
      setActiveSection("list-products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleUpdateStudio = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/studios/${editingStudio.id}`, editingStudio);
      alert("Studio updated successfully!");
      fetchStudios(); // Fetch updated studio list
      setActiveSection("list-studios");
    } catch (error) {
      console.error("Error updating studio:", error);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to the home page
  };
  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className="admin-dashboard-sidebar">
        <img src={logo} alt="Logo" className="admin-logo" />
        <a onClick={() => setActiveSection("add-studio")} className={activeSection === "add-studio" ? "active" : ""}>
          <FaPlus /> Add Studio
        </a>
        <a onClick={() => setActiveSection("add-product")} className={activeSection === "add-product" ? "active" : ""}>
          <FaPlus /> Add Product
        </a>
        <a onClick={() => setActiveSection("list-studios")} className={activeSection === "list-studios" ? "active" : ""}>
          <FaList /> List Studios
        </a>
        <a onClick={() => setActiveSection("list-products")} className={activeSection === "list-products" ? "active" : ""}>
          <FaList /> List Products
        </a>
        <button onClick={handleLogout} className="logoutBtn">
          <FaSignOutAlt /> Logout
        </button>
    </div>
      {/* Main Content */}
      <div className="admin-dashboard-main">
      <header className="admin-dashboard-header">
          <h1>Admin Dashboard</h1>
        </header>

        {activeSection === "welcome" && (
          <div className="admin-dashboard-welcome">
            <h2>Welcome to the Admin Dashboard</h2>
            <p>Manage studios and products efficiently.</p>
          </div>
        )}

        {/* Add Product Form */}
        {activeSection === "add-product" && (
          <div className="admin-dashboard-form-section">
            <h3>Add New Product</h3>
            <input type="text" placeholder="Product Name" onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <input type="number" placeholder="Price" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            <input type="text" placeholder="Description" onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
            <input type="file" onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })} />
            <button onClick={handleAddProduct}>Add</button>
          </div>
        )}

        {/* Add Studio Form */}
        {activeSection === "add-studio" && (
          <div className="admin-dashboard-form-section">
            <h3>Add New Studio</h3>
            <input type="text" placeholder="Studio Name" onChange={(e) => setNewStudio({ ...newStudio, name: e.target.value })} />
            <input type="number" placeholder="Price" onChange={(e) => setNewStudio({ ...newStudio, price: e.target.value })} />
            <input type="text" placeholder="Description" onChange={(e) => setNewStudio({ ...newStudio, description: e.target.value })} />
            <input type="file" onChange={(e) => setNewStudio({ ...newStudio, image: e.target.files[0] })} />
            <button onClick={handleAddStudio}>Add</button>
          </div>
        )}
        {/* Product List */}
        {activeSection === "list-products" && (
          <div className="admin-dashboard-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div className="admin-dashboard-card" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>${product.price}</p>
                  <button className="edit-btn" onClick={() => handleEditProduct(product)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )}

        {/* Studio List */}
        {activeSection === "list-studios" && (
          <div className="admin-dashboard-grid">
            {studios.length > 0 ? (
              studios.map((studio) => (
                <div className="admin-dashboard-card" key={studio.id}>
                  <img src={studio.image} alt={studio.name} />
                  <h4>{studio.name}</h4>
                  <p>${studio.price}</p>
                  <button className="edit-btn" onClick={() => handleEditStudio(studio)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteStudio(studio.id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No studios found.</p>
            )}
          </div>
        )}

{activeSection === "edit-product" && editingProduct && (
        <div className="admin-dashboard-form-section">
          <h3>Edit Product</h3>
          <input
            type="text"
            placeholder="Product Name"
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editingProduct.description}
            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
          />
          <button onClick={handleUpdateProduct}>Update Product</button>
        </div>
      )}

      {activeSection === "edit-studio" && editingStudio && (
        <div className="admin-dashboard-form-section">
          <h3>Edit Studio</h3>
          <input
            type="text"
            placeholder="Studio Name"
            value={editingStudio.name}
            onChange={(e) => setEditingStudio({ ...editingStudio, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={editingStudio.price}
            onChange={(e) => setEditingStudio({ ...editingStudio, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editingStudio.description}
            onChange={(e) => setEditingStudio({ ...editingStudio, description: e.target.value })}
          />
          <button onClick={handleUpdateStudio}>Update Studio</button>
        </div>
      )}

      </div>
    </div>
  );
}
