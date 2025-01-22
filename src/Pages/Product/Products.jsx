import React, { useState, useEffect } from "react";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Function to add product to cart
  const addToCart = async (_id, user_id, product_id) => {
    console.log("Product ID:", product_id, "User ID:", user_id, "Cart ID:", _id);
    try {
      const url = `http://localhost:5000/product/addproducttocart/${_id}/${user_id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product_id._id,
          quantity: 1, // Assuming adding 1 quantity of each product
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const updatedCart = await response.json();
      setCart(updatedCart.cart); // Update the cart state
      console.log("Item added successfully:", updatedCart);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Fetching products
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
            <img src={product.image} alt={product.name} />
            <div className="productdetails">
              <div className="productcardleft">
                <h2>{product.name}</h2>
                <h3>₹{product.price}</h3>
              </div>
              <div className="productcardright">
                <button
                  onClick={() =>
                    addToCart(
                      "6789ffe83f4cf088e9cc8743", 
                      "677faab42ae0ccd71481090e", 
                      { _id: product._id, quantity: 1 } )}>
                  Add to Cart
                </button>
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
