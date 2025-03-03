import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./public/Register";
import InStore from "./public/inStore";
import Login from "./public/Login";
import Landingpage from "./public/Landingpage";
import Booking from "./public/Booking";
import Dashboard from "./public/Dashboard";
import AdminDashboard from "./public/AdminDashboard";
import ProductDetail from "./public/ProductDetail";
import ProtectedRoute from "./ProtectedRoute";
import EditProfile from "./public/EditProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landingpage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/store" element={<InStore />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route element={<ProtectedRoute roleRequired={"user"} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />

        </Route>

        <Route element={<ProtectedRoute roleRequired={"admin"} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="" element={<h1>Welcome to Home Page</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
