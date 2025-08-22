import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/images/hero-slide.jpg",
    subtitle: "Summer 2020",
    title: "New Collection",
    text: "We know how large objects will act, but things on a small scale.",
    button: "Shop Now",
  },
  {
    image: "/images/hero-slide.jpg",
    subtitle: "Summer 2020",
    title: "Exclusive Deals",
    text: "Get ready for the best offers of the season.",
    button: "Shop Now",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-screen relative"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Text Section */}
            <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-4 md:px-8">
              <div className="max-w-md space-y-4">
                <p className="uppercase tracking-wide text-sm md:text-lg">
                  {slide.subtitle}
                </p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base text-gray-100">{slide.text}</p>
                <button className="bg-[#2DC071] hover:bg-[#26a763] text-white px-6 py-3 rounded">
                  {slide.button}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
