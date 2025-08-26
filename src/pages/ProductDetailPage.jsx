import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Star, Heart, ShoppingCart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { fetchProduct, fetchCategories } from "../redux/actions/productActions";
import { addToCart } from "../redux/reducers/cartReducer"; // ✅ cartReducer’dan import

const sponsors = [
  { icon: "fa-hooli" },
  { icon: "fa-lyft" },
  { icon: "fa-pied-piper-hat" },
  { icon: "fa-stripe" },
  { icon: "fa-aws" },
  { icon: "fa-reddit" }
];

const ProductDetailPage = () => {
  const { gender, categoryName, categoryId, productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { product, loading, error, productList, categories } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );

  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product) return null;

  const getGenderText = (g) =>
    g === "k" ? "kadın" : g === "e" ? "erkek" : "unisex";

  // ✅ Sepete ekleme fonksiyonu
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* Back Button */}
      <button
        className="mb-4 text-blue-500 font-medium hover:text-blue-700 transition-colors duration-150"
        onClick={() => history.goBack()}
      >
        ← Back
      </button>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        Home &gt; Shop &gt; {product.name}
      </div>

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
                className={
                  i < Math.round(product.rating)
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="text-gray-500">
              ({product.sell_count} Reviews)
            </span>
          </div>

          {/* Price & Stock */}
          <div className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </div>
          <div className="text-gray-600">
            Availability:{" "}
            {product.stock > 0 ? (
              <span className="text-green-500">In Stock</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
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
              Buy Now
            </button>
            <button className="border p-2 rounded">
              <Heart size={18} />
            </button>
            {/* ✅ Sepete ekleme */}
            <button
              onClick={handleAddToCart}
              className="border p-2 rounded hover:bg-gray-100"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bestseller / Related Products */}
      <div>
        <h3 className="text-lg font-bold mb-6">BESTSELLER PRODUCTS</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {productList.slice(0, 8).map((p) => {
            const cat = categories.find((c) => c.id === p.category_id);
            return (
              <ProductCard
                key={p.id}
                id={p.id}
                gender={getGenderText(cat?.gender)}
                categoryName={cat?.title}
                categoryId={cat?.id}
                image={p.images[0]?.url}
                colors={p.colors || []}
                name={p.name}
                description={p.description}
                price={p.price}
              />
            );
          })}
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
