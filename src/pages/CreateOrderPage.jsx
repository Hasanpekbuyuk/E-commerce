import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAddresses,
  createAddress,
  editAddress,
  removeAddress,
} from "../redux/thunks/clientThunks";
import { setAddress, clearAddress } from "../redux/reducers/cartReducer";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";

const cities = ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"];

const CreateOrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.client.user);
  const loading = useSelector((state) => state.client.loading);
  const addressList = useSelector((state) => state.client.addressList);
  const cart = useSelector((state) => state.cart.cart);
  const selectedAddress = useSelector((state) => state.cart.address);

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) dispatch(fetchAddresses());
  }, [dispatch, user]);

  const onSubmit = (data) => {
    if (editMode) {
      dispatch(
        editAddress({ ...data, id: editMode }, (err) => {
          if (!err) {
            dispatch(fetchAddresses());
            reset();
            setShowForm(false);
            setEditMode(null);
          } else console.error(err);
        })
      );
    } else {
      dispatch(
        createAddress(data, (err) => {
          if (!err) {
            dispatch(fetchAddresses());
            reset();
            setShowForm(false);
          } else console.error(err);
        })
      );
    }
  };

  const handleDelete = (id) => {
    dispatch(
      removeAddress(id, (err) => {
        if (!err) {
          dispatch(fetchAddresses());
          if (selectedAddress?.id === id) {
            dispatch(clearAddress()); 
          }
        } else console.error(err);
      })
    );
  };

  const handleEdit = (addr) => {
    reset(addr);
    setEditMode(addr.id);
    setShowForm(true);
  };

  const handleSelect = (addr) => {
    dispatch(setAddress(addr));
  };

  if (loading) return <p>Loading...</p>;
  if (!loading && (!user || !user.token)) return <Redirect to="/login" />;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.count,
    0
  );
  const shippingPrice = cart.length > 0 ? 20 : 0;
  const grandTotal = totalPrice + shippingPrice;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-2 mb-6 text-center">
        <div className="border-b-4 border-blue-500 text-black-600 font-bold pb-2">
          1. Address Information
        </div>
        <div className="border-b-4 border-gray-300 text-gray-400 pb-2">
          2. Payment Options
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Address List & Form */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Create Order - Address</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Saved Addresses</h2>
            {addressList.length === 0 && <p>No saved addresses.</p>}
            <ul className="space-y-2">
              {addressList.map((addr) => (
                <li
                  key={addr.id}
                  className={`border rounded p-3 flex flex-col space-y-2 ${
                    selectedAddress?.id === addr.id ? "bg-green-50" : "bg-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    {/* Radio Button */}
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="selectedAddress"
                        checked={selectedAddress?.id === addr.id}
                        onChange={() => handleSelect(addr)}
                        className="form-radio text-blue-500"
                      />
                      <span className="font-semibold text-sm">{addr.title}</span>
                    </label>

                    {/* Edit Button */}
                    <button
                      className="text-black-500 text-s underline"
                      onClick={() => handleEdit(addr)}
                    >
                      Edit
                    </button>
                  </div>

                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      {addr.name} {addr.surname}
                    </p>
                    <p>{addr.phone}</p>
                    <p>
                      {addr.city}, {addr.district}, {addr.neighborhood}
                    </p>
                    <p>{addr.address}</p>
                  </div>

                  {/* Delete Button */}
                  <button
                    className="self-end bg-red-500 text-white px-2 py-1 rounded text-xs"
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
            onClick={() => {
              setShowForm(!showForm);
              setEditMode(null);
              reset({});
            }}
          >
            {showForm ? "Cancel" : "Add Address"}
          </button>

          {showForm && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 border p-4 rounded"
            >
              <input
                {...register("title")}
                placeholder="Address Title"
                className="w-full p-2 border rounded"
                required
              />
              <input
                {...register("name")}
                placeholder="Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                {...register("surname")}
                placeholder="Surname"
                className="w-full p-2 border rounded"
                required
              />
              <input
                {...register("phone")}
                placeholder="Phone"
                className="w-full p-2 border rounded"
                required
              />
              <select
                {...register("city")}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                {...register("district")}
                placeholder="District"
                className="w-full p-2 border rounded"
                required
              />
              <input
                {...register("neighborhood")}
                placeholder="Neighborhood"
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                {...register("address")}
                placeholder="Street, building, door no"
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {editMode ? "Update Address" : "Save Address"}
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
            <span>- $0.00</span>
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Grand Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => {
              if (!selectedAddress?.id) {
                alert("Please select an address before continuing.");
                return;
              }
              history.push("/payment");
            }}
            className={`mt-6 w-full py-3 rounded-lg transition ${
              selectedAddress?.id
                ? "bg-blue-600 text-white hover:bg-blue-800"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Save and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
