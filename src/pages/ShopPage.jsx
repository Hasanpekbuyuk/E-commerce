import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/actions/productActions";
import { setCategory, setFilter, setSort } from "../redux/reducers/productReducer";
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
  const { categoryId } = useParams();
  const { productList, fetchState, total, filter, sort } = useSelector(
    (state) => state.product
  );

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 12;

  useEffect(() => {
    if (categoryId) dispatch(setCategory(categoryId));
  }, [categoryId, dispatch]);

  useEffect(() => {
    setCurrentPage(0);
    dispatch(fetchProducts({ limit: productsPerPage, offset: 0 }));
  }, [dispatch, categoryId, filter, sort]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    const offset = selectedPage * productsPerPage;
    setCurrentPage(selectedPage);
    dispatch(fetchProducts({ limit: productsPerPage, offset }));
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

      {/* Filtre ve Sıralama */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4 gap-4">
        <p className="text-gray-500">
          Showing {productList.length} of {total} results
        </p>
        <div className="flex items-center gap-2">
          <select
            className="border p-2 rounded"
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
          >
            <option value="">Default</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="rating:asc">Rating: Low to High</option>
            <option value="rating:desc">Rating: High to Low</option>
          </select>

          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Search..."
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => dispatch(fetchProducts({ limit: productsPerPage, offset: 0 }))}
          >
            Filter
          </button>
        </div>
      </div>

      {/* Ürünler */}
      {fetchState === "FETCHING" ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {productList.map((p) => (
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

      {/* React Paginate */}
      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={Math.ceil(total / productsPerPage)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"flex gap-2"}
          pageClassName={"border px-3 py-1 rounded"}
          activeClassName={"bg-blue-500 text-white"}
          previousClassName={"border px-3 py-1 rounded"}
          nextClassName={"border px-3 py-1 rounded"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
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
