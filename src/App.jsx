import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import PageContent from "./layout/PageContent";
import { Toaster } from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { verifyToken } from "./redux/thunks/clientThunks"; 

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(verifyToken(token)); 
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <PageContent />
      <Footer />
    </div>
  );
};

export default App;
