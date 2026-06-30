import { Phone, MessageCircle } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section id="final-cta-section" className="py-16 bg-[#0070c0] text-white text-center transition-colors">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">
        <h2 className="text-2.5xl md:text-4xl font-extrabold leading-tight tracking-tight">
          Gặp Sự Cố Với Nguồn Nước Ăn Uống? <br className="hidden sm:inline" /> 
          Đừng Trì Hoãn, Hãy Để Chuyên Gia Giúp Bạn!
        </h2>
        
        <p className="text-blue-50 opacity-90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Ưu đãi giảm giá 20% công bảo dưỡng vệ sinh &amp; sục rửa cốc lọc nước khi đặt lịch sửa chữa hoặc bảo dưỡng máy lọc nước bất kỳ ngay hôm nay.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <a 
            href="tel:0927712222" 
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5"
          >
            <Phone className="h-5 w-5 animate-bounce" />
            <span>092.771.2222 (Tổng Đài)</span>
          </a>
          
          <a 
            href="https://zalo.me/0927712222" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Zalo Chat Kỹ Thuật</span>
          </a>
        </div>
      </div>
    </section>
  );
}
