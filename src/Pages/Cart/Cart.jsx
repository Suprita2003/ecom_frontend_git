import React, { useState, useEffect } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/product/getcart/6789ffe83f4cf088e9cc8743/677faab42ae0ccd71481090e"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
      const data = await response.json();
      setCart(data.cart);
      console.log("Cart data:", data.cart);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  const handleQuantityChange = async (products,product_id, newQuantity) => {
    if (newQuantity < 1) {
      console.error("Quantity cannot be less than 1");
      return;
    }
    const updateProductQuantity = (products, productId, newQuantity) => {
      const product = products.find(
      (item) => item.product_id._id === productId
      );
  
      if (product) {
          product.quantity = newQuantity;
          console.log(`Quantity updated to ${newQuantity} for product ID: ${productId}`);
      } else {
          console.log(`Product with ID ${productId} not found.`);
      }
      };

      updateProductQuantity(products, product_id, newQuantity);
    try {
      console.log(`Updating product ID: ${product_id}, Quantity: ${newQuantity}`);
      const response = await fetch(
        `http://localhost:5000/product/updatecart/6789ffe83f4cf088e9cc8743/677faab42ae0ccd71481090e`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({products}),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }
  
      const result = await response.json();
      fetchCart();
      console.log("Quantity updated successfully:", result);
    } catch (error) {
      console.error("Error while updating quantity:", error);
    }
  };
  
  const handleRemove = async (product_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/product/deletecart/6789ffe83f4cf088e9cc8743/677faab42ae0ccd71481090e/${product_id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to remove item");
      }
      console.log("Item removed successfully");
      const updatedCart = await response.json();
      setCart(updatedCart.cart);
      console.log("Updated cart:", updatedCart.cart);
      toast.success("Item removed",toastOptions);
    } catch (error) {
      console.error("Error removing item:", error);
    } 
   window.location.reload();
  };

  const calculateTotals = () => {
    if (!cart || !cart.products) return { subtotal: 0, discount: 0, total: 0 };
    const subtotal = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const discount = cart.discount || 0;
    const total = subtotal - discount;
    return { subtotal, discount, total };
  };

  const { subtotal, discount, total } = calculateTotals();
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
    <div className="cart">
      <h1>Shopping Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.products.map((item) => (
              <tr key={item._id}>
                <td>
                   <img src={item?.product_id.image} alt={item?.product_id.name} width={50} height={50}/> 
                </td>
                <td>{item?.product_id.name}</td>
                <td>₹{item.price}</td>
                <td>
                <button className="quantity-button"
                   onClick={() => handleQuantityChange(cart.products,item?.product_id._id, item.quantity - 1)}
                    disabled={item.quantity <= 1} >
                    -
                </button>
                  {item.quantity}
                <button className="quantity-button"
                    onClick={() => handleQuantityChange(cart.products,item?.product_id._id, item.quantity + 1)}>
                    +
                </button>
                </td>
                <td>₹{item.price * item.quantity}</td>
                <td>
                  <button className="remove-button"
                  onClick={() => handleRemove(item?.product_id._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="cartitems-down">
        <div className='cartitems-total'>
            <h1>Cart Totals</h1>
            <div>
                <div className='cartitems-total-item'>
                    <p>Subtotal</p>
                    <p>${subtotal}</p>
                </div>
                <hr/>
                <div className='cartitems-total-item'>
                    <p>Discount</p>
                    <p>- ₹{discount}</p>
                    </div>
                    <hr/>
                    <div className='cartitems-total-item'>
                        <h3>Total </h3>
                        <h3> ${total}</h3>
                    </div>
                    <Link to={"/order"}>
          <button className="place-order-button">Place the Order</button>
        </Link>
            </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
