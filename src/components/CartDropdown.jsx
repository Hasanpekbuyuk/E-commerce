import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, decreaseFromCart } from "../redux/actions/cartActions";
import { X } from "lucide-react";

export default function CartDropdown() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const handleIncrease = (product) => dispatch(addToCart(product));
  const handleDecrease = (productId) => dispatch(decreaseFromCart(productId));

  if (cart.length === 0) {
    return (
      <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-xl rounded-xl p-6 flex flex-col items-center justify-center z-50">
        <p className="text-gray-400 text-center font-medium mb-2">Sepetiniz boş</p>
        <span className="text-3xl animate-bounce">🛒</span>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-xl shadow-xl p-5 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Sepetim</h3>
      </div>

      <ul className="space-y-4 max-h-64 overflow-y-auto">
        {cart.map((item) => (
          <li key={item.product.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={item.product.images?.[0]?.url}
                alt={item.product.name}
                className="w-14 h-14 object-cover rounded-lg border"
              />
              <div className="flex flex-col">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
                onClick={() => handleDecrease(item.product.id)}
              >
                -
              </button>
              <span className="font-semibold">{item.count}</span>
              <button
                className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition"
                onClick={() => handleIncrease(item.product)}
              >
                +
              </button>
            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.product.id))}
              className="text-gray-400 hover:text-red-500 ml-2 transition-colors"
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t pt-3 flex justify-between font-semibold text-gray-800">
        <span>Toplam:</span>
        <span>
          $
          {cart
            .reduce((total, item) => total + item.product.price * item.count, 0)
            .toFixed(2)}
        </span>
      </div>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Sepeti Onayla
      </button>
    </div>
  );
}
