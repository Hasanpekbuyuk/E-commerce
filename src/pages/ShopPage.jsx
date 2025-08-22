import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/actions/productActions";
import "@fortawesome/fontawesome-free/css/all.min.css";

const categories = [
  { id: 1, image: "/images/cloths1.png", title: "CLOTHS", count: "5 Items" },
  { id: 2, image: "/images/cloths2.png", title: "CLOTHS", count: "5 Items" },
  { id: 3, image: "/images/cloths3.png", title: "CLOTHS", count: "5 Items" },
  { id: 4, image: "/images/cloths4.png", title: "CLOTHS", count: "5 Items" },
  { id: 5, image: "/images/cloths5.png", title: "CLOTHS", count: "5 Items" }
];

const sponsors = [
  { icon: "fa-hooli" },
  { icon: "fa-lyft" },
  { icon: "fa-pied-piper-hat" },
  { icon: "fa-stripe" },
  { icon: "fa-aws" },
  { icon: "fa-reddit" }
];

const ShopPage = () => {
  const dispatch = useDispatch();
  const { productList, fetchState, total } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Pagination hesaplamaları
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productList.length / productsPerPage);

  const handlePageChange = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* Başlık + Breadcrumb */}
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Shop</h2>
        <p className="text-gray-500">Home &gt; Shop</p>
      </div>

      {/* Kategori Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="relative group cursor-pointer overflow-hidden">
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
              <h3 className="text-lg font-bold">{cat.title}</h3>
              <p className="text-sm">{cat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filtre Alanı */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4">
        <p className="text-gray-500">
          Showing {currentProducts.length} of {total} results
        </p>
        <div className="flex items-center gap-4">
          <button className="border p-2 rounded"><i className="fas fa-th"></i></button>
          <button className="border p-2 rounded"><i className="fas fa-list"></i></button>
          <select className="border p-2 rounded">
            <option>Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Filter</button>
        </div>
      </div>

      {/* Ürünler */}
      {fetchState === "FETCHING" ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentProducts.map((p) => (
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
      )}

      {/* Sayfalama */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() => handlePageChange(1)}
          className="border px-4 py-2 rounded"
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="border px-4 py-2 rounded"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => page >= currentPage - 2 && page <= currentPage + 2)
          .map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`border px-4 py-2 rounded ${
                currentPage === page ? "bg-blue-500 text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="border px-4 py-2 rounded"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="border px-4 py-2 rounded"
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>

      {/* Sponsor Logoları */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center text-gray-500">
        {sponsors.map((s, i) => (
          <i key={i} className={`fab ${s.icon} fa-3x mx-auto`}></i>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
