import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import { ToastContainer } from "react-toastify";
import AdminProducts from "./pages/admin/products";
import Customer from "./pages/customer";
import AdminUsers from "./pages/admin/users";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/customer/products" element={<Customer />} />

        {/* ------- START Admin Routes ------- */}
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        {/* ------- END Admin Routes ------- */}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
