import { ShoppingCart, User, Instagram, Twitter, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import md5 from "md5";
import { setUser } from "../redux/reducers/clientReducer";
import { fetchCategories } from "../redux/actions/productActions";
import CartDropdown from '../components/CartDropdown';

const Header = () => {
  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

    useEffect(() => {
    setCartOpen(false);
  }, [location]);

  const logout = () => {
    dispatch(setUser({}));
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    toast.info("Logged out successfully!");
  };

  const getGravatarUrl = (email) => {
    if (!email) return "https://www.gravatar.com/avatar/?d=mp";
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
  };

  const womenCategories = categories.filter((c) => c.gender === "k");
  const menCategories = categories.filter((c) => c.gender === "e");

  return (
    <header className="w-full relative">
      {/* Topbar */}
      <div className="bg-slate-900 text-white text-sm px-4 py-2 flex justify-between items-center">
        <div className="flex gap-4">
          <span>(225) 555-0118</span>
          <span>michelle.rivera@example.com</span>
        </div>
        <div className="text-center hidden md:block">
          <span>Follow us and get a chance to win 80% off</span>
        </div>
        <div className="flex gap-2 items-center">
          <span>Follow us :</span>
          <Instagram size={16} />
          <Twitter size={16} />
        </div>
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-4 border-b">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-slate-800">
          Bandage
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-6 items-center text-slate-700 font-medium">
          <li><Link to="/">Home</Link></li>

          {/* Shop Dropdown */}
          <li className="group relative">
            <Link to="/shop" className="hover:text-blue-600">Shop</Link>
            <div className="absolute top-full left-0 hidden group-hover:flex gap-10 bg-white shadow-md p-6 z-10">
              <div>
                <h4 className="font-semibold">Kadın</h4>
                <ul className="text-sm mt-2 space-y-1">
                  {womenCategories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        to={`/shop/k/${cat.title}/${cat.id}`}
                        className="flex items-center gap-2 hover:text-blue-600"
                      >
                        <img src={cat.img} alt={cat.title} className="w-8 h-8 object-cover rounded" />
                        {cat.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Erkek</h4>
                <ul className="text-sm mt-2 space-y-1">
                  {menCategories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        to={`/shop/e/${cat.title}/${cat.id}`}
                        className="flex items-center gap-2 hover:text-blue-600"
                      >
                        <img src={cat.img} alt={cat.title} className="w-8 h-8 object-cover rounded" />
                        {cat.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          <li><Link to="/about">About</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/pages">Pages</Link></li>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4 relative">
          {!user || !user.email ? (
            <div className="flex items-center gap-2 text-sm">
              <User size={16} className="text-blue-600" />
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
              <span>/</span>
              <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <img
                src={getGravatarUrl(user.email)}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </div>
          )}

          {/* Cart Button */}
          <button
            className="relative"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          <button>
            <Heart size={20} />
          </button>

          {/* Cart Dropdown */}
          {cartOpen && <CartDropdown />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
