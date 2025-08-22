// src/pages/ProductDetailPage.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Star, Heart, Eye } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/actions/productActions";

const sponsors = [
  { icon: "fa-hooli" },
  { icon: "fa-lyft" },
  { icon: "fa-pied-piper-hat" },
  { icon: "fa-stripe" },
  { icon: "fa-aws" },
  { icon: "fa-reddit" }
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productList, fetchState } = useSelector((state) => state.product);

  useEffect(() => {
    if (productList.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, productList.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (fetchState === "FETCHING") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  const product = productList.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">Home &gt; Shop &gt; {product.name}</div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Image */}
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="w-full h-full object-contain rounded"
          />
        </div>

        {/* Right Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={i < Math.round(product.rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}
              />
            ))}
            <span className="text-gray-500">({product.sell_count} Reviews)</span>
          </div>

          {/* Price & Stock */}
          <div className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</div>
          <div className="text-gray-600">
            Availability: {product.stock > 0 ? <span className="text-green-500">In Stock</span> : <span className="text-red-500">Out of Stock</span>}
          </div>

          {/* Description */}
          <p className="text-gray-500">{product.description}</p>

          {/* Colors */}
          <div className="flex gap-2">
            {product.colors?.map((color, i) => (
              <span
                key={i}
                className="w-6 h-6 rounded-full border cursor-pointer"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Select Options
            </button>
            <button className="border p-2 rounded">
              <Heart size={18} />
            </button>
            <button className="border p-2 rounded">
              <Eye size={18} />
            </button>
          </div>
        </div>
      </div>

     {/* Tabs */}
      <div className="border-b flex gap-8 overflow-x-auto">
        <button className="pb-2 border-b-2 border-blue-500">Description</button>
        <button className="pb-2 text-gray-500">Additional Information</button>
        <button className="pb-2 text-gray-500">Reviews ({product.sell_count})</button>
      </div>

      {/* Tab Content */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">{product.name}</h3>
          <p className="text-gray-500">{product.description}</p>
        </div>
        <div>
          <ul className="list-disc list-inside text-gray-500">
            <li>Category: {product.category_id}</li>
            <li>Store: {product.store_id}</li>
            <li>Stock: {product.stock}</li>
          </ul>
        </div>
      </div>

      {/* Bestseller */}
      <div>
        <h3 className="text-lg font-bold mb-6">BESTSELLER PRODUCTS</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {productList.slice(0, 8).map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              image={p.images[0]?.url}
              colors={p.colors || []}
              name={p.name}
              description={p.description}
              price={p.price}
            />
          ))}
        </div>
      </div>

      {/* Sponsors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center text-gray-500">
        {sponsors.map((s, i) => (
          <i key={i} className={`fab ${s.icon} fa-3x mx-auto`}></i>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
