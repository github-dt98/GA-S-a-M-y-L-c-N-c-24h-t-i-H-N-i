import { BRANDS } from '../data';

export default function Brands() {
  return (
    <section id="partner-logos-section" className="bg-white py-10 border-y border-slate-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Chuyên khắc phục sự cố tất cả các hãng máy lọc nước hiện nay
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 hover:opacity-90 transition-all duration-300">
          {BRANDS.map((brand) => (
            <span 
              key={brand} 
              className="text-xl md:text-2xl font-black text-slate-400 hover:text-[#0070c0] cursor-default transition-colors uppercase tracking-tight"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
