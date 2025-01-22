import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ordersummary.css'; // Import the CSS file

const Ordersummary = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/getorders/${userId}`);
        console.log("Ordered products:", response.data);
        setOrders(response.data.orders); // Access the 'orders' array from the response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <p className="loading-message">Loading orders...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="ordersummary-container">
      <h2>Order Summary</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>User:</strong> {order.user_id.name} ({order.user_id.email})</p>
              <p><strong>Subtotal:</strong> ${order.cart_id.subtotal}</p>
              <p><strong>Total (After Discount):</strong> ${order.cart_id.total}</p>
              <p><strong>Products:</strong></p>
              <ul className="product-list">
                {order.cart_id.products.map((product) => (
                  <li key={product._id}>
                    <p><strong>Product ID:</strong> {product.product_id || "Not available"}</p>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Ordersummary;
