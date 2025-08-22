// src/pages/LoginPage.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { loginUser } from "../redux/thunks/clientThunks";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = (data) => {
    dispatch(
      loginUser(data.email, data.password, data.remember, (err, user) => {
        if (err) {
          toast.error(err); 
        } else {
          toast.success(`Welcome, ${user.name}!`);
          const from = location.state?.from || "/";
          history.push(from); 
        }
      })
    );
  };

  return (
    <div className="max-w-md mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            {...register("password", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.password && <p className="text-red-500">Password is required</p>}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input type="checkbox" {...register("remember")} id="remember" className="mr-2" />
          <label htmlFor="remember">Remember Me</label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
