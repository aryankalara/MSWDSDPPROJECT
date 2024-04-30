import React, { useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import SellerHomePage from "./SellerHomePage";
import SellerAddProductPage from "./SellerAddProduct";
import SellerProducts from "./SellerProducts";
import SellerProductPage from "./SellerProductPage";
import UpdateProductDetails from "./UpdateProductDetails";
import DeleteProduct from "./DeleteProduct";
import SellerProfile from "./SellerProfile";
import UpdateSellerProfile from "./UpdateSellerProfile";
import "./Navbar.css";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isSellerLoggedIn");
    localStorage.removeItem("seller");

    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch products logic here
    };
    
    fetchProducts(); // Call fetchProducts when the component mounts

    // Return a cleanup function if needed
    // return () => {
    //   cleanup logic here
    // };
  }, []); // Include fetchProducts in the dependency array

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={"/sellerhome"} className="ml-4">
              Home
            </Link>
          </li>

          <li className="dropdown">
            <Link to={"/sellerproducts"}>Products</Link>
            <div className="dropdown-content">
              <Link to={"/addproduct"} className="ml-4">
                Add Product
              </Link>
              <Link to={"/deleteproducts"}>Delete Product</Link>
            </div>
          </li>

          <li>
            <Link to={"/sellerprofile"} className="ml-4">
              Profile
            </Link>
          </li>

          <li>
            <Link to={"/logout"} className="ml-4" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>

      <div>
        <Routes>
          <Route path="/sellerhome" element={<SellerHomePage />} />
          <Route path="/addproduct" element={<SellerAddProductPage />} />
          <Route path="/sellerproducts" element={<SellerProducts />} />
          <Route path="/sellerproductpage" element={<SellerProductPage />} />
          <Route path="/deleteproducts" element={<DeleteProduct />} />
          <Route
            path="/updateproductdetails"
            element={<UpdateProductDetails />}
          />
          <Route path="/sellerprofile" element={<SellerProfile />} />
          <Route
            path="/updatesellerprofile"
            element={<UpdateSellerProfile />}
          />
          <Route path="/logout" element={<></>} />
        </Routes>
      </div>
    </div>
  );
};

export default Header;
