import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ContactPage from "../pages/ContactPage"; 
import TeamPage from "../pages/TeamPage"; 
import AboutPage from "../pages/AboutPage";
import SignupPage from "../pages/SignupPage"
import LoginPage from "../pages/LoginPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import CreateOrderPage from "../pages/CreateOrderPage";
import PaymentPage from "../pages/PaymentPage";
import OrdersPage from "../pages/OrdersPage";


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
        <Route path="/cart" component={ShoppingCartPage} />
        <Route path="/create-order" component={CreateOrderPage} />
        <Route path="/payment" component={PaymentPage} />
        <Route path="/orders" component={OrdersPage} />

      </Switch>
    </main>
  );
};

export default PageContent;
