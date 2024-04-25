import React, { useState, useEffect } from 'react';
import { db } from "./firebase.js";
import './order.css';
import { useStateValue } from "./Stateprovider.js";

function OrderItem({ order }) {
  return (
    <div className='order'>
      {/* Display order details */}
    </div>
  );
}

function Order() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user) {
          const querySnapshot = await db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .get();

          const fetchedOrders = querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }));
          setOrders(fetchedOrders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className='orders__order'>
        {orders?.map(order => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Order;
