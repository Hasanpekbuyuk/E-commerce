import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddresses, createAddress, removeAddress } from "../redux/thunks/clientThunks";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";

const CreateOrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.client.user);
  const loading = useSelector((state) => state.client.loading);
  const addressList = useSelector((state) => state.client.addressList);
  const cart = useSelector((state) => state.cart.cart);

  const [showForm, setShowForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      dispatch(fetchAddresses());
    }
  }, [dispatch, user]);

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
  const totalPrice = selectedCart.reduce((sum, item) => sum + item.product.price * item.count, 0);
  const shippingPrice = totalPrice > 0 ? 20 : 0;
  const discount = 0;
  const grandTotal = totalPrice + shippingPrice - discount;

  const onSubmit = (data) => {
    dispatch(createAddress(data, (err) => {
      if (!err) {
        reset();
        setShowForm(false);
      } else console.error(err);
    }));
  };

  const handleDelete = (id) => {
    dispatch(removeAddress(id, (err) => {
      if (err) console.error(err);
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (!loading && (!user || !user.token)) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Stepper (yalnızca görsel) */}
      <div className="grid grid-cols-2 mb-6 text-center">
        <div className="border-b-4 border-blue-500 text-black-600 font-bold pb-2">
          1. Address Information
        </div>
        <div className="border-b-4 border-gray-300 text-gray-400 pb-2">
          2. Payment Options
        </div>
      </div>

      {/* Orijinal içerik: sola adresler, sağa sipariş özeti */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Address List & Form */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Create Order - Address</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Saved Addresses</h2>
            {addressList.length === 0 && <p>No saved addresses.</p>}
            <ul className="space-y-2">
              {addressList.map((addr) => (
                <li key={addr.id} className="border p-3 rounded flex justify-between items-center">
                  <div>
                    <p><strong>{addr.title}</strong></p>
                    <p>{addr.name} {addr.surname}</p>
                    <p>{addr.phone}</p>
                    <p>{addr.city}, {addr.district}, {addr.neighborhood}</p>
                  </div>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(addr.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add Address"}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 border p-4 rounded">
              <input {...register("title")} placeholder="Address Title" className="w-full p-2 border rounded" required />
              <input {...register("name")} placeholder="Name" className="w-full p-2 border rounded" required />
              <input {...register("surname")} placeholder="Surname" className="w-full p-2 border rounded" required />
              <input {...register("phone")} placeholder="Phone" className="w-full p-2 border rounded" required />
              <input {...register("city")} placeholder="City" className="w-full p-2 border rounded" required />
              <input {...register("district")} placeholder="District" className="w-full p-2 border rounded" required />
              <input {...register("neighborhood")} placeholder="Neighborhood" className="w-full p-2 border rounded" required />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save Address
              </button>
            </form>
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

          <button
            onClick={() => history.push("/credit")}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Save and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
