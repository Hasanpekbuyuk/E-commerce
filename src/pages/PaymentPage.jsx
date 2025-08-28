import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import {
  fetchCards,
  createCard,
  editCard,
  removeCard
} from "../redux/thunks/clientThunks";
import { setPayment } from "../redux/reducers/cartReducer";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.client.user);
  const loading = useSelector((state) => state.client.loading);
  const cards = useSelector((state) => state.client.creditCards);
  const selectedCard = useSelector((state) => state.cart.payment);
  const cart = useSelector((state) => state.cart.cart);

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) dispatch(fetchCards());
  }, [dispatch, user]);

  if (loading) return <p>Loading...</p>;
  if (!loading && (!user || !user.token)) return <Redirect to="/login" />;

  const onSubmit = (data) => {
    if (editMode) {
      dispatch(
        editCard({ ...data, id: editMode }, (err) => {
          if (!err) {
            dispatch(fetchCards());
            reset();
            setShowForm(false);
            setEditMode(null);
          } else console.error(err);
        })
      );
    } else {
      dispatch(
        createCard(data, (err) => {
          if (!err) {
            dispatch(fetchCards());
            reset();
            setShowForm(false);
          } else console.error(err);
        })
      );
    }
  };

  const handleDelete = (id) => {
    dispatch(
      removeCard(id, (err) => {
        if (!err) dispatch(fetchCards());
        else console.error(err);
      })
    );
  };

  const handleEdit = (card) => {
    reset(card);
    setEditMode(card.id);
    setShowForm(true);
  };

  const handleSelect = (card) => {
    dispatch(setPayment(card));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.count,
    0
  );
  const shippingPrice = cart.length > 0 ? 20 : 0;
  const grandTotal = totalPrice + shippingPrice;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Card List & Form */}
        <div className="lg:col-span-2">
          <div className="flex justify-between mb-4">
            <button
              onClick={() => history.goBack()}
              className="bg-gray-200 text-black-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              ← Back
            </button>
          </div>
          <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Saved Cards</h2>
            {cards.length === 0 && <p>No saved cards.</p>}
            <ul className="space-y-2">
              {cards.map((card) => (
                <li
                  key={card.id}
                  className={`border rounded p-3 flex flex-col space-y-2 ${selectedCard?.id === card.id ? "bg-green-50" : "bg-white"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="selectedCard"
                        checked={selectedCard?.id === card.id}
                        onChange={() => handleSelect(card)}
                        className="form-radio text-blue-500"
                      />
                      <span className="font-semibold text-sm">
                        **** **** **** {card.card_no.slice(-4)}
                      </span>
                    </label>
                    <button
                      className="text-black-500 text-s underline"
                      onClick={() => handleEdit(card)}
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">
                    {card.name_on_card} - Exp: {card.expire_month}/{card.expire_year}
                  </p>
                  <button
                    className="self-end bg-red-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => handleDelete(card.id)}
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
            {showForm ? "Cancel" : "Add Card"}
          </button>

          {showForm && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 border p-4 rounded"
            >
              <input
                {...register("card_no")}
                placeholder="Card Number"
                className="w-full p-2 border rounded"
                required
              />
              <input
                {...register("name_on_card")}
                placeholder="Name on Card"
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex space-x-2">
                <select
                  {...register("expire_month")}
                  className="w-1/2 p-2 border rounded"
                  required
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>

                <select
                  {...register("expire_year")}
                  className="w-1/2 p-2 border rounded"
                  required
                >
                  <option value="">Year</option>
                  {Array.from({ length: 15 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="password"
                  placeholder="CVV"
                  className="w-1/3 p-2 border rounded"
                  maxLength={3}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {editMode ? "Update Card" : "Save Card"}
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
              if (!selectedCard || !selectedCard.id) {
                alert("Please select a payment method before continuing.");
                return;
              }
              history.push("/checkout");
            }}
            className={`mt-6 w-full py-3 rounded-lg transition ${selectedCard && selectedCard.id
              ? "bg-blue-600 text-white hover:bg-blue-800"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
