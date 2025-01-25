import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SingleProduct.css";
import star from "../../assets/star.png";
import stardull from "../../assets/starDull.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SingleProduct() {
  const { productId } = useParams(); // Extract the product ID from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Track the quantity locally
  const navigate = useNavigate();
  const offersListRef = useRef(null);

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  // Fetch product details
  useEffect(() => {
    if (!productId) {
      console.error("Product ID is missing");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/product/getproduct/${productId}`
        );
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
      if (!product) {
        console.error("Product not loaded yet.");
        return;
      }
      const response = await fetch(
        `http://localhost:5000/product/addproducttocart/6789ffe83f4cf088e9cc8743/677faab42ae0ccd71481090e`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: product._id, quantity }),
        }
      );

      if (!response.ok) throw new Error("Failed to add item to cart");
      const data = await response.json();
      toast.success("Item added to cart", toastOptions);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart", toastOptions);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1", toastOptions);
      return;
    }
    setQuantity(newQuantity);
  };

  const scrollLeft = () => {
    if (offersListRef.current) {
      offersListRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (offersListRef.current) {
      offersListRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-product">
      <div className="single-product-image">
        <img src={product.image} alt={product.name} width="350px" height="350px" />
        <div className="single-product-buttons">
          <div className="single-product-buttons-addbuy">
            <button onClick={addToCart}>Add to Cart</button>
          </div>
          <div className="single-product-buttons-back">
            <button onClick={() => navigate("/order")}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="single-product-deta">
        <h2 className="single-product-deta-h2">{product.name.toUpperCase()}</h2>
        <h3 className="single-product-deta-h3">₹ {product.price}</h3>
        <div className="productdisplay-right-star">
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={stardull} alt="" />
        </div>
        <p className="single-product-deta-desc">*{product.description}*</p>

        <div className="quantity-controls">
          <button
            className="quantity-button" onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>
            -
          </button>
          {quantity}
          <button
            className="quantity-button" onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>

        <div className="single-product-offers-container">
          <button className="scroll-arrow left" onClick={scrollLeft}>
            &#8249;
          </button>
          <div className="single-product-offers-list" ref={offersListRef}>
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
          <button className="scroll-arrow right" onClick={scrollRight}>
            &#8250;
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
