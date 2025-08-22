import Slider from "../components/Slider";
import CategoryPick from "../components/CategoryPick";
import ProductList from "../components/ProductList";
import HeroSlider from "../components/HeroSlider";
import Container from "../components/container";
import FeaturedPosts from "../components/FeaturedPosts";

const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Kategori Seçimi */}
      <CategoryPick />

      {/* Ürün Listesi */}
      <ProductList />
      
      <Slider />

      <Container />

      <FeaturedPosts />
    </div>
  );
};

export default HomePage;
