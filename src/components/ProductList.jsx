// src/components/ProductList.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../redux/actions/productActions";

const ProductList = () => {
  const dispatch = useDispatch();
  const { productList, fetchState } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-center font-bold text-xl mb-1">Featured Products</h2>
      <h3 className="text-center font-bold text-2xl mb-1">BESTSELLER PRODUCTS</h3>
      <p className="text-center text-gray-500 mb-8">
        Problems trying to resolve the conflict between
      </p>

      {fetchState === "FETCHING" ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {productList.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.images[0]?.url}
              colors={product.colors || []}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
