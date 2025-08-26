// src/components/ProductCard.jsx
import React from "react";
import { useHistory } from "react-router-dom";

// Helper: string → slug
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const ProductCard = ({ id, gender, categoryName, categoryId, image, colors, name, description, price }) => {
  const history = useHistory();
  const productNameSlug = slugify(name);

  const handleClick = () => {
    history.push(`/shop/${gender}/${categoryName}/${categoryId}/${productNameSlug}/${id}`);
  };

  return (
    <div
      className="flex flex-col items-center text-center space-y-3 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      {/* Ürün Resmi */}
      <div className="w-full">
        <img src={image} alt={name} className="w-full h-auto object-cover rounded" />
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
    </div>
  );
};

export default ProductCard;
