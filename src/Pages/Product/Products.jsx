import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import LoadingPage from "../../Components/Loading/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/product/getallProduct");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (_id, user_id, product_id) => {
    try {
      const response = await fetch(`http://localhost:5000/product/addproducttocart/${_id}/${user_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: product_id._id, quantity: 1 }),
      });
      if (!response.ok) throw new Error("Failed to add item to cart");
      const data = await response.json();
      console.log("Item added successfully:", data);
      toast.success("Item added to cart",toastOptions); 
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme:"dark"
  };

  return (
    <div className="products">
      {products.length > 0 ? (
        products.map((product) => (
          <div  key={product._id} className="productcard"
            onClick={() => navigate(`/product/${product._id}`)} // Navigate to single product
          >
            <img src={product.image} alt={product.name} />
            <div className="productdetails">
              <div className="productcardleft">
                <h2>{product.name.toUpperCase()}</h2>
                <h3>₹ {product.price}</h3>
              </div>
              <div className="productcardright">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    addToCart("6789ffe83f4cf088e9cc8743", "677faab42ae0ccd71481090e", {_id: product._id,quantity: 1,
                    });
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <LoadingPage />
      )}
      <ToastContainer/>
    </div>
  );
}
