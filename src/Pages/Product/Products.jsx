import React, { useState, useEffect } from "react";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = async (product_id) => {
    try {
      console.log("Adding product with ID:", product_id); 
  
      const response = await fetch(
        `http://localhost:5000/product/updatecart/6788bd4658d6319f74d4ff5c/677faab42ae0ccd71481090e/${product_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        // Log the error details for debugging
        console.error("Failed to update cart. Status:", response.status, response.statusText);
        const errorDetails = await response.json(); // Optional: Get the error message from the server
        console.error("Error details from server:", errorDetails);
        throw new Error("Failed to update cart");
      }
  
      const data = await response.json();
      console.log("Cart updated:", data);
    } catch (error) {
      // Catch and log any errors that occur
      console.error("Error in addToCart function:", error.message);
      alert("An error occurred while adding the item to the cart. Please try again.");
    }
  };
  
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/product/getallProduct");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

 
  return (
    <div className="products">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="productcard">
         <img src={product.image} alt="" />
         <div className="productdetails">
           <div className="productcardleft">
             <h2>{product.name}</h2>
             <h3>₹{product.price}</h3>
           </div>
           <div className="productcardright">
             <button onClick={() => addToCart(product._id)}>Add to Cart</button>
           </div>
         </div>
      </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
    
  );
}

