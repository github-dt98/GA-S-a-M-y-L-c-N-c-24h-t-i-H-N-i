import { MapPin, Check, Building2, Info, Landmark } from 'lucide-react';
import { DISTRICTS, CONDOS } from '../data';

export default function Coverage() {
  return (
    <section id="coverage-section" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Side: District List */}
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-amber-500 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                PHỤC VỤ KHẮP PHỐ PHƯỜNG HÀ NỘI
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Có Mặt Ngay Sau 15 Phút Tại Toàn Bộ Quận Huyện Hà Nội
            </h2>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Với đội ngũ hơn 30 kỹ thuật viên có tay nghề cao túc trực tại mọi trục đường chính, chúng tôi cam kết phục vụ nhanh nhất tại tất cả các khu tập thể, chung cư, ngõ ngách sâu nhất tại các quận:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 pt-4 border-t border-slate-800">
              {DISTRICTS.map((dist) => (
                <div key={dist} className="flex items-center gap-2.5 text-slate-200 text-xs md:text-sm font-medium">
                  <Check className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>{dist}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Condos Detail Card */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-slate-800/40 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-start gap-3.5 pb-4 border-b border-slate-800">
                <div className="p-2.5 bg-slate-800 rounded-xl text-amber-500 shrink-0">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base md:text-lg">
                    ĐẶC BIỆT: CHUYÊN PHỤC VỤ CÁC CHUNG CƯ LỚN
                  </h4>
                  <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                    Hỗ trợ xử lý cực nhanh tại các cụm căn hộ chung cư cao tầng, nắm vững cấu trúc đi dây cấp thoát nước &amp; áp lực nước đặc thù:
                  </p>
                </div>
              </div>

              {/* Condo Grids */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {CONDOS.map((condo) => (
                  <div 
                    key={condo} 
                    className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/50 flex items-center gap-3 text-xs md:text-sm text-slate-200"
                  >
                    <Landmark className="h-4 w-4 text-slate-500 shrink-0" />
                    <span className="font-semibold">{condo}</span>
                  </div>
                ))}
              </div>

              {/* Notice */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3.5">
                <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-100 leading-relaxed">
                  Chúng tôi nhận sửa chữa, bảo dưỡng và cung cấp màng lọc chuyên dụng cho các dòng máy nội địa, máy ion kiềm, máy điện giải Nhật Bản cao cấp lắp đặt tại các chung cư.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
