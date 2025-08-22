import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api from "../api";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const history = useHistory();
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedRole = watch("role_id");
  const password = watch("password");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const phoneRegex = /^(\+90|0)?5\d{9}$/;
  const taxRegex = /^T\d{4}V\d{6}$/;
  const ibanRegex = /^TR\d{24}$/;

  useEffect(() => {
    api
      .get("/roles")
      .then((res) => {
        const normalizedRoles = res.data.map((r) => ({
          ...r,
          type: r.name.toLowerCase().includes("mağaza") ? "store" : r.name.toLowerCase(),
        }));
        setRoles(normalizedRoles);

        // Customer varsayılan seçili olsun
        const customerRole = normalizedRoles.find((r) => r.type === "customer");
        if (customerRole) setValue("role_id", customerRole.id);
      })
      .catch((err) => console.error("Roles fetch error:", err));
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      let payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
      };

      const storeRole = roles.find(
        (r) => r.id === Number(data.role_id) && r.type === "store"
      );

      if (storeRole) {
        payload.store = {
          name: data.store_name,
          phone: data.store_phone,
          tax_no: data.store_tax,
          bank_account: data.store_bank,
        };
      }

      await api.post("/signup", payload);

      alert("You need to click link in email to activate your account!");
      history.push("/login");
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Signup failed, please try again."
      );
    }
  };

  const isStoreSelected =
    selectedRole &&
    roles.some((r) => r.id === Number(selectedRole) && r.type === "store");

  return (
    <div className="max-w-lg mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

      {errorMessage && (
        <p className="bg-red-100 text-red-600 p-2 mb-4 rounded">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-1">Name</label>
          <input
            {...register("name", { required: true, minLength: 3 })}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500">At least 3 chars</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className="w-full border p-2 rounded"
          />
          {errors.email && <p className="text-red-500">Invalid email</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register("password", { required: true, pattern: passwordRegex })}
            className="w-full border p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500">
              8+ chars, upper, lower, number, special char
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (val) => val === password,
            })}
            className="w-full border p-2 rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">Passwords do not match</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1">Role</label>
          <select
            {...register("role_id", { required: true })}
            className="w-full border p-2 rounded"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Store alanları */}
        {isStoreSelected && (
          <>
            <div>
              <label className="block mb-1">Store Name</label>
              <input
                {...register("store_name", { required: true, minLength: 3 })}
                className="w-full border p-2 rounded"
              />
              {errors.store_name && (
                <p className="text-red-500">At least 3 chars</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Store Phone</label>
              <input
                {...register("store_phone", { required: true, pattern: phoneRegex })}
                className="w-full border p-2 rounded"
              />
              {errors.store_phone && (
                <p className="text-red-500">Invalid Turkish phone</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Store Tax ID</label>
              <input
                {...register("store_tax", { required: true, pattern: taxRegex })}
                className="w-full border p-2 rounded"
              />
              {errors.store_tax && (
                <p className="text-red-500">Format: TXXXXVXXXXXX</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Store Bank Account (IBAN)</label>
              <input
                {...register("store_bank", { required: true, pattern: ibanRegex })}
                className="w-full border p-2 rounded"
              />
              {errors.store_bank && (
                <p className="text-red-500">Invalid IBAN (TR...)</p>
              )}
            </div>
          </>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
