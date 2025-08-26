import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ContactPage from "../pages/ContactPage"; 
import TeamPage from "../pages/TeamPage"; 
import AboutPage from "../pages/AboutPage";
import SignupPage from "../pages/SignupPage"
import LoginPage from "../pages/LoginPage";


const PageContent = () => {
  return (
    <main className="flex-1">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          component={ProductDetailPage}
        />
        <Route path="/contact" component={ContactPage} />
        <Route path="/team" component={TeamPage} /> 
        <Route path="/about" component={AboutPage} />
        <Route path="/register" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </main>
  );
};

export default PageContent;
