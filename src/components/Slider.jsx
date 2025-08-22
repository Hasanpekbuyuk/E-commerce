import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    bgColor: "#23856D",
    image: "/images/slider.png", 
    subtitle: "SUMMER 2020",
    title: "Vita Classic Product",
    text: "We know how large objects will act. We know how are objects will act. We know",
    price: "$16.48",
    button: "ADD TO CART",
  },
  {
     bgColor: "#23856D",
    image: "/images/slider.png", 
    subtitle: "SUMMER 2020",
    title: "Vita Classic Product",
    text: "We know how large objects will act. We know how are objects will act. We know",
    price: "$16.48",
    button: "ADD TO CART",
  },
];

export default function SliderAlt() {
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
            className="min-w-full h-[450px] md:h-[600px] flex items-center justify-center"
            style={{ backgroundColor: slide.bgColor }}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between w-full">
              {/* Left Text */}
              <div className="text-white max-w-md space-y-4">
                <p className="uppercase tracking-wide text-sm">{slide.subtitle}</p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base">{slide.text}</p>
                <div className="flex items-center gap-4 pt-4">
                  <span className="text-lg font-bold">{slide.price}</span>
                  <button className="bg-[#2DC071] hover:bg-[#26a763] text-white px-6 py-3 rounded">
                    {slide.button}
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="mt-8 md:mt-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-[300px] md:w-[400px] object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 text-white rounded-full p-2 hover:bg-white/50"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 text-white rounded-full p-2 hover:bg-white/50"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              current === i ? "w-8 bg-white" : "w-4 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
