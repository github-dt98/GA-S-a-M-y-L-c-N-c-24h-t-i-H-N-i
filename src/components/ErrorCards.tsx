import { SYMPTOMS } from '../data';
import { Droplets, Volume2, Wrench, Trash2, ZapOff, Activity, ArrowRight } from 'lucide-react';

interface ErrorCardsProps {
  onSelectSymptomAndScroll: (symptomId: string) => void;
}

export default function ErrorCards({ onSelectSymptomAndScroll }: ErrorCardsProps) {
  
  // Icon mapper function
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets':
        return <Droplets className="h-6 w-6" />;
      case 'Volume2':
        return <Volume2 className="h-6 w-6" />;
      case 'Trash2':
        return <Trash2 className="h-6 w-6" />;
      case 'ZapOff':
        return <ZapOff className="h-6 w-6" />;
      case 'Activity':
        return <Activity className="h-6 w-6" />;
      default:
        return <Wrench className="h-6 w-6" />;
    }
  };

  // Color mapper based on severity/icon
  const getColorStyles = (id: string) => {
    switch (id) {
      case 'ro-nuoc':
        return {
          bg: 'bg-sky-50 text-[#0070c0] hover:bg-[#0070c0] hover:text-white',
          badge: 'text-[#0070c0] bg-sky-50'
        };
      case 'keu-tach-tach':
        return {
          bg: 'bg-orange-50 text-[#f37021] hover:bg-[#f37021] hover:text-white',
          badge: 'text-[#f37021] bg-orange-50'
        };
      case 'nuoc-yeu':
        return {
          bg: 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white',
          badge: 'text-red-500 bg-red-50'
        };
      case 'thai-nhieu':
        return {
          bg: 'bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white',
          badge: 'text-blue-500 bg-blue-50'
        };
      case 'mat-nguon':
        return {
          bg: 'bg-slate-100 text-slate-700 hover:bg-slate-700 hover:text-white',
          badge: 'text-slate-600 bg-slate-100'
        };
      case 'vi-la':
        return {
          bg: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white',
          badge: 'text-indigo-600 bg-indigo-50'
        };
      default:
        return {
          bg: 'bg-sky-50 text-[#0070c0] hover:bg-[#0070c0] hover:text-white',
          badge: 'text-[#0070c0] bg-sky-50'
        };
    }
  };

  return (
    <section id="common-errors-section" className="py-20 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-[#0070c0] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            HIỆN TƯỢNG THƯỜNG GẶP
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Hãy Gọi Ngay Cho Chúng Tôi Nếu Máy Lọc Nước Của Bạn Có Lỗi
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            Tuyệt đối không tự ý sờ mảng mạch điện hoặc cắt ống nước nếu không có chuyên môn kỹ thuật để tránh rò rỉ điện hoặc làm máy hỏng nặng thêm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SYMPTOMS.map((symptom) => {
            const colors = getColorStyles(symptom.id);
            return (
              <div 
                key={symptom.id}
                className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl transition-all duration-300 shrink-0 ${colors.bg}`}>
                    {renderIcon(symptom.icon)}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0070c0] transition-colors duration-200">
                    {symptom.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
                    {symptom.shortDescription}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-5 border-t border-slate-100">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-lg ${colors.badge}`}>
                    {symptom.badgeText}
                  </span>
                  <button 
                    onClick={() => onSelectSymptomAndScroll(symptom.id)}
                    className="text-[#0070c0] font-extrabold text-xs md:text-sm flex items-center gap-1 hover:gap-2.5 transition-all cursor-pointer"
                  >
                    <span>{symptom.actionText === 'Sửa ngay' ? 'Sửa ngay' : 'Thay lõi'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
