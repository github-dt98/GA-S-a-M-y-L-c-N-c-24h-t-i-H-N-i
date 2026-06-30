import { MapPin, Phone } from 'lucide-react';
import { BRANCHES } from '../data';

export default function BranchesSection() {
  return (
    <section id="branches-section" className="py-16 bg-slate-50/60 border-t border-b border-slate-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-[#0070c0] tracking-wider uppercase bg-[#0070c0]/10 px-3.5 py-1.5 rounded-full inline-block mb-3.5">
            Mạng lưới phục vụ nhanh
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            19 Cơ Sở Trực Chiến 24/7 Tại Toàn Bộ Hà Nội
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3">
            Đội ngũ kỹ thuật viên túc trực tại các quận nội - ngoại thành Hà Nội, cam kết có mặt chỉ sau 15 - 30 phút gọi. Không ngại xa, không ngại khó!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANCHES.map((branch) => (
            <div 
              key={branch.id} 
              className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div>
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider bg-red-600 text-white px-2.5 py-1 rounded">
                    TRỰC CHIẾN 24/7
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-extrabold text-slate-800 text-lg mb-3">
                  {branch.name}
                </h3>

                {/* Address */}
                <div className="flex items-start gap-2 text-slate-500 text-sm mb-6 leading-relaxed">
                  <MapPin className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </div>
              </div>

              {/* Call Button */}
              <a 
                href="tel:0927712222" 
                className="w-full bg-[#1e6091] hover:bg-[#1a4f7a] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-sm hover:shadow active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" />
                <span>Gọi Thợ: 0927 712 222</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
