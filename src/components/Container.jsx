export default function Container() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Sol taraf: Görsel */}
      <div>
        <img
          src="/images/couple.png" 
          alt="Part of the Neural Universe"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Sağ taraf: Yazılar */}
      <div className="space-y-5">
        <p className="uppercase text-sm text-gray-500 tracking-wide">
          Summer 2020
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Part of the Neural Universe
        </h2>
        <p className="text-gray-600 max-w-md">
          We know how large objects will act, but things on a small scale.
        </p>
        <div className="flex gap-4">
          <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
            Buy Now
          </button>
          <button className="border border-green-500 text-green-500 px-6 py-3 rounded hover:bg-green-500 hover:text-white transition">
            Read More
          </button>
        </div>
      </div>
    </section>
  );
}
