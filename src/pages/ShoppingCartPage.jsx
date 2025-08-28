import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseFromCart, removeFromCart } from "../redux/actions/cartActions";
import { X } from "lucide-react";
import { useHistory } from "react-router-dom";

export default function ShoppingCartPage() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const cartIds = cart.map((i) => i.product.id);
    setSelectedItems((prev) => {
      const merged = new Set(prev.length === 0 ? cartIds : prev);
      cartIds.forEach((id) => merged.add(id));
      return Array.from(merged).filter((id) => cartIds.includes(id));
    });
  }, [cart]);

  const toggleSelect = (productId) => {
    setSelectedItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const selectedCart = cart.filter((item) => selectedItems.includes(item.product.id));

  const totalPrice = selectedCart.reduce(
    (sum, item) => sum + item.product.price * item.count,
    0
  );
  const shippingPrice = totalPrice > 0 ? 20 : 0;
  const discount = 0;
  const grandTotal = totalPrice + shippingPrice - discount;

  return (
    <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Ürün Listesi */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty 🛒</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-3"></th>
                <th className="py-3">Product</th>
                <th className="py-3">Price</th>
                <th className="py-3">Quantity</th>
                <th className="py-3">Total</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product.id} className="border-b">
                  {/* Checkbox */}
                  <td className="py-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedItems.includes(item.product.id)}
                      onChange={() => toggleSelect(item.product.id)}
                    />
                  </td>

                  <td className="flex items-center gap-3 py-4">
                    <img
                      src={item.product.images?.[0]?.url}
                      alt={item.product.name}
                      className="w-16 h-16 rounded border object-cover"
                    />
                    <span className="font-medium">{item.product.name}</span>
                  </td>
                  <td className="py-4">${item.product.price.toFixed(2)}</td>
                  <td className="py-4 flex items-center gap-2">
                    <button
                      onClick={() => dispatch(decreaseFromCart(item.product.id))}
                      className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span>{item.count}</span>
                    <button
                      onClick={() => dispatch(addToCart(item.product))}
                      className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      +
                    </button>
                  </td>
                  <td className="py-4 font-semibold">
                    ${(item.product.price * item.count).toFixed(2)}
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-xl shadow h-fit">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

        <div className="flex justify-between py-2 text-gray-700">
          <span>Products Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 text-gray-700">
          <span>Shipping</span>
          <span>${shippingPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 text-gray-700">
          <span>Discount</span>
          <span>- ${discount.toFixed(2)}</span>
        </div>

        <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
          <span>Grand Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>

        <button onClick={() => history.push("/create-order")}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 transition"
        >
          Create Order
        </button>
      </div>
    </div>
  );
}
