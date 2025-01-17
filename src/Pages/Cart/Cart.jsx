import React, { useState, useEffect } from "react";
import "./Cart.css";

export default function Cart({ product }) {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:5000/product/getcart/6789dfe0279e8e32bbd35ce6/677faab42ae0ccd71481090e");
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }

        
        const data = await response.json();
        setCart(data.cart);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCart();
  }, []);

  const handleRemove = async (product_id) => {
    // try {
      const response = await fetch(
        `http://localhost:5000/product/deletecart/6788bd4658d6319f74d4ff5c/677faab42ae0ccd71481090e/` + product_id,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to remove item");
      }
      console.log("Item removed successfully");
    // } 
    // catch (error) {
    //   console.error("Error removing item:", error);
    // }
    // console.log("deleted", product_id);
  };  

  const calculateTotals = () => {
    if (!cart || !cart.products) return { subtotal: 0, discount: 0, total: 0 };
    const subtotal = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = cart.discount || 0;
    const total = subtotal - discount;
    return { subtotal, discount, total};
  };

  const { subtotal, discount, total } = calculateTotals();

  const placeOrder = async () => {
     try {
      const response = await fetch("http://localhost:5000/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_id: "6788bd4658d6319f74d4ff5c", 
          user_id: "677faab42ae0ccd71481090e", 
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to place order");
      }
  
      const data = await response.json();
      console.log("Order placed successfully:", data);
  
      setCart(null);
  
      alert("Order placed successfully!");
    } 
    catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  

  return (
    <div className="cart">
      <div className="cartheadings">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove..</p>
      </div>
      <hr style={{ width: "100%" }} />

      {cart &&  (
        cart.products.map((item) => (
          <div key={item._id} className="cartItem">
            <img
              src={item?.product_id.image[0] } alt={item?.product_id.name} width={50} height={50}/>
            <p>{item?.product_id.name}</p>
            <p>₹{item.price}</p>
            <p>{item.quantity}</p>
            <p>₹{item.price * item.quantity}</p>
            <button onClick={() => handleRemove(item?.product_id._id)}>Remove</button>
            </div>
        ))
      ) 
      }
      <hr style={{ width: "100%" }} />

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Discount</p>
              <p>₹{discount}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{total}</h3>
            </div>
            <button onClick={placeOrder}>Place the Order</button>
            </div>
        </div>
      </div>
    </div>
  );
}
