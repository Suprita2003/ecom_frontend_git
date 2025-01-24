import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SingleProduct.css";

export default function SingleProduct() {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) {
      console.error("Product ID is missing");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/getproduct/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/product/addproducttocart/6789ffe83f4cf088e9cc8743/677faab42ae0ccd71481090e`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: product._id, quantity: 1 }),
        }
      );

      if (!response.ok) throw new Error("Failed to add item to cart");
      const data = await response.json();
      console.log("Item added to cart:", data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="single-product">
      <div className="single-product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="single-product-deta">
        <h2>{product.name.toUpperCase()}</h2>
        <h3>₹ {product.price}</h3>
        <p>{product.description}</p>

      <div className="single-product-offers">
        <div className="single-product-offers-list">
          <div className="single-product-offers-list-item">
            <h5>Bank Offer</h5>
            <p>Upto ₹1,000.00 discount on SBI Credit Cards</p>
          </div>
          <div className="single-product-offers-list-item">
            <h5>No Cost EMI</h5>
            <p>Upto ₹517.79 EMI interest savings on select Credit Cards</p>
          </div>
          <div className="single-product-offers-list-item">
            <h5>Partner Offers</h5>
            <p>Get GST invoice and save up to 28% on business purchases.</p>
          </div>
          <div className="single-product-offers-list-item">
            <h5>Cashback</h5>
            <p>
              Get 5% back with Amazon Pay ICICI Bank credit card for Prime
              members. 3% back for others
            </p>
          </div>
        </div>
      </div>
      </div>

      <div className="single-product-butons">
      <button onClick={addToCart}>Add to Cart</button>
      <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}
