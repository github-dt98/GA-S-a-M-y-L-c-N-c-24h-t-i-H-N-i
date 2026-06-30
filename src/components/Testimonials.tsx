import { REVIEWS } from '../data';
import { Star, MessageSquare } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials-section" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-[#0070c0] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            PHẢN HỒI THỰC TẾ
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Khách Hàng Nói Gì Về Dịch Vụ Của Chúng Tôi
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Nhận được sự tin yêu và đánh giá trung bình 4.9/5 sao từ hơn 10.000+ hộ gia đình đã tin chọn và sử dụng dịch vụ định kỳ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-transparent transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex text-amber-400 gap-1 mb-4">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                {/* Feedback Text */}
                <p className="text-slate-600 text-xs md:text-sm italic leading-relaxed mb-8">
                  {review.text}
                </p>
              </div>

              {/* Author Information */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100/80">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm ${review.bgColor} shrink-0`}>
                  {review.initials}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{review.author}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
