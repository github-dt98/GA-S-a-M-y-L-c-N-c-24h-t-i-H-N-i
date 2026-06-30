import { useState } from 'react';
import { BRANDS, SYMPTOMS } from '../data';
import { Cpu, ChevronRight, Calendar, AlertTriangle, Droplets, Volume2, CircleSlash, Plug, Filter, Droplet } from 'lucide-react';

interface DiagnosticToolProps {
  onSelectSymptomAndScroll: (symptomId: string) => void;
}

const getSymptomIcon = (id: string, isSelected: boolean) => {
  const iconClass = `h-5 w-5 shrink-0 ${isSelected ? 'text-[#0284c7]' : 'text-slate-400'}`;
  switch (id) {
    case 'ro-nuoc':
      return <Droplets className={iconClass} />;
    case 'keu-tach-tach':
      return <Volume2 className={iconClass} />;
    case 'nuoc-yeu':
      return <CircleSlash className={iconClass} />;
    case 'thai-nhieu':
      return <Droplets className={iconClass} />;
    case 'mat-nguon':
      return <Plug className={iconClass} />;
    case 'vi-la':
      return <Filter className={iconClass} />;
    default:
      return <Droplet className={iconClass} />;
  }
};

export default function DiagnosticTool({ onSelectSymptomAndScroll }: DiagnosticToolProps) {
  const [selectedBrand, setSelectedBrand] = useState('Karofi');
  const [selectedSymptomId, setSelectedSymptomId] = useState('nuoc-yeu');

  const currentSymptom = SYMPTOMS.find((s) => s.id === selectedSymptomId) || SYMPTOMS[0];

  return (
    <section id="diagnostic-section" className="py-16 bg-slate-50 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-[#0070c0] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            TÍNH NĂNG ĐỘC QUYỀN
          </span>
          <h2 className="text-2.5xl md:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Công Cụ Tự Chuẩn Đoán & Ước Tính Báo Giá
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Chọn nhanh các vấn đề máy lọc nước đang gặp phải để xem phân tích ban đầu & ước tính chi phí linh kiện thay thế tức thì trước khi thợ tới!
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
          {/* Diagnostic Selector Panel */}
          <div className="p-6 md:p-8 flex-1 space-y-8">
            {/* Step 1 */}
            <div>
              <p className="text-sm font-extrabold text-[#0070c0] tracking-wide mb-4 uppercase">
                BƯỚC 1: CHỌN HÃNG MÁY LỌC NƯỚC NHÀ BẠN
              </p>
              <div className="grid grid-cols-3 gap-3">
                {BRANDS.concat(['Hãng khác']).map((brand) => {
                  const isSelected = selectedBrand === brand;
                  return (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`py-3 px-2 text-center rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                        isSelected
                          ? 'border-[#0284c7] border-2 bg-white text-slate-800 font-bold shadow-[0_4px_12px_rgba(2,132,199,0.08)]'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50/50 hover:border-slate-300'
                      }`}
                    >
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <p className="text-sm font-extrabold text-[#0070c0] tracking-wide mb-4 uppercase">
                BƯỚC 2: MÁY LỌC NƯỚC NHÀ BẠN ĐANG BỊ LÀM SAO?
              </p>
              <div className="space-y-3">
                {SYMPTOMS.map((symptom) => {
                  const isSelected = selectedSymptomId === symptom.id;
                  return (
                    <button
                      key={symptom.id}
                      onClick={() => setSelectedSymptomId(symptom.id)}
                      className={`w-full flex justify-between items-center px-4.5 py-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-[#0284c7] border-2 bg-white shadow-[0_4px_12px_rgba(2,132,199,0.08)]'
                          : 'border-slate-200 bg-white hover:bg-slate-50/50 hover:border-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-3.5 text-xs sm:text-sm md:text-[15px] font-semibold text-slate-700">
                        {getSymptomIcon(symptom.id, isSelected)}
                        {symptom.title}
                      </span>
                      <ChevronRight className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isSelected ? 'text-[#0284c7] translate-x-0.5' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Diagnostic Output Panel (Dark theme) */}
          <div className="bg-slate-900 p-6 md:p-8 text-white md:w-80 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800">
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
                <Cpu className="h-5 w-5 text-sky-400 shrink-0" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                  PHÂN TÍCH BAN ĐẦU
                </span>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider">HÃNG ĐÃ CHỌN</p>
                <p className="font-display font-bold text-white text-base md:text-lg tracking-tight mt-0.5">
                  {selectedBrand.toUpperCase()}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider">PHÂN ĐOÁN LỖI &amp; XỬ LÝ</p>
                <p className="text-xs md:text-sm leading-relaxed text-slate-300">
                  {currentSymptom.detailedAnalysis}
                </p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 space-y-1">
                <p className="text-[9px] text-slate-400 uppercase font-extrabold tracking-wider">ƯỚC TÍNH GIÁ TỐI ƯU</p>
                <p className="text-xl font-extrabold text-[#f37021]">{currentSymptom.estimatedPrice}</p>
                <p className="text-[9px] text-sky-500 font-semibold italic mt-0.5">* Miễn phí công kiểm tra tại nhà</p>
              </div>
            </div>

            <button
              onClick={() => onSelectSymptomAndScroll(selectedSymptomId)}
              className="w-full bg-[#0070c0] hover:bg-[#005da0] text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 mt-6 cursor-pointer"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>ĐẶT LỊCH NGAY</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
