// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, image, colors, name, description, price }) => {
  return (
    <Link to={`/product/${id}`} className="flex flex-col items-center text-center space-y-3">
      {/* Ürün Resmi */}
      <div className="w-full">
        <img
          src={image}
          alt={name}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Başlık ve Açıklama */}
      <div>
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-500">{description}</p>
      </div>

      {/* Fiyat */}
      <div className="space-x-2">
        <span className="text-teal-600 font-semibold">${price.toFixed(2)}</span>
      </div>

      {/* Renk Seçenekleri */}
      <div className="flex space-x-2">
        {colors.map((color, index) => (
          <span
            key={index}
            className="w-3 h-3 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
          ></span>
        ))}
      </div>
    </Link>
  );
};

export default ProductCard;
