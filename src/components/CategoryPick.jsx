// src/components/CategoryPick.jsx
export default function CategoryPick() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Başlık */}
        <h2 className="text-center font-bold text-xl md:text-2xl mb-2">
          EDITOR’S PICK
        </h2>
        <p className="text-center text-sm text-gray-500 mb-10 max-w-md mx-auto">
          Problems trying to resolve the conflict between
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          
          {/* MEN (2 kolon kaplıyor) */}
          <div className="relative md:col-span-2">
            <img
              src="/images/men.jpg"
              alt="Men"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white px-6 py-2 font-bold text-xs md:text-sm uppercase shadow rounded">
              MEN
            </div>
          </div>

          {/* WOMEN */}
          <div className="relative">
            <img
              src="/images/women.jpg"
              alt="Women"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white px-6 py-2 font-bold text-xs md:text-sm uppercase shadow rounded">
              WOMEN
            </div>
          </div>

          {/* Accessories + Kids */}
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <img
                src="/images/accessories.jpg"
                alt="Accessories"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white px-4 py-2 font-bold text-xs md:text-sm uppercase shadow rounded">
                ACCESSORIES
              </div>
            </div>
            <div className="relative flex-1">
              <img
                src="/images/kids.jpg"
                alt="Kids"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white px-4 py-2 font-bold text-xs md:text-sm uppercase shadow rounded">
                KIDS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
