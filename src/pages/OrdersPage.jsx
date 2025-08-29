import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import api from "../api";
import { Collapse } from "react-collapse";

const OrdersPage = () => {
  const user = useSelector((state) => state.client.user);
  const loading = useSelector((state) => state.client.loading);

  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setFetching(true);
      try {
        const response = await api.get("/order");
        setOrders(response.data);
      } catch (err) {
        console.error("Order could not be created:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!loading && (!user || !user.token)) return <Redirect to="/login" />;

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {fetching && <p>Loading orders...</p>}
      {orders.length === 0 && !fetching && <p>No orders found.</p>}

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded p-4 bg-white shadow">
            {/* Order Header */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(order.id)}
            >
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.order_date).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total: ${order.price.toFixed(2)}</p>
              </div>
              <div>{expandedOrderId === order.id ? "▲" : "▼"}</div>
            </div>

            {/* Collapsible Order Details */}
            <Collapse isOpened={expandedOrderId === order.id}>
              <div className="mt-4 border-t pt-2">
                <table className="w-full text-sm text-gray-700 border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-2 py-1 text-left">Product</th>
                      <th className="px-2 py-1 text-left">Quantity</th>
                      <th className="px-2 py-1 text-left">Unit Price</th>
                      <th className="px-2 py-1 text-left">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((p, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="px-2 py-1">{p.name || "Product"}</td>
                        <td className="px-2 py-1">{p.count}</td>
                        <td className="px-2 py-1">${p.price?.toFixed(2) ?? 0}</td>
                        <td className="px-2 py-1">${((p.price ?? 0) * p.count).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
