import Slider from "../components/Slider";
import CategoryPick from "../components/CategoryPick";
import ProductList from "../components/ProductList";
import HeroSlider from "../components/HeroSlider";
import Container from "../components/Container";
import FeaturedPosts from "../components/FeaturedPosts";

const HomePage = () => {
  return (
    <div className="space-y-8">
      <HeroSlider />

      <CategoryPick />

      <ProductList />
      
      <Slider />

      <Container />

      <FeaturedPosts />
    </div>
  );
};

export default HomePage;
