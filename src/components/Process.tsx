import { PhoneCall, MapPin, ClipboardList, ShieldCheck } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      step: '01',
      title: 'Tiếp Nhận Thông Tin',
      description: 'Khách hàng gọi điện hoặc gửi yêu cầu trực tuyến. Tư vấn viên đặt lịch hẹn khung giờ nhanh nhất và thuận tiện nhất cho gia đình.',
      icon: <PhoneCall className="h-7 w-7 text-[#0070c0]" />,
      borderColor: 'border-slate-100',
      badgeColor: 'bg-slate-800'
    },
    {
      step: '02',
      title: 'Kiểm Tra Tại Nhà',
      description: 'Kỹ thuật viên đến kiểm tra nguồn nước, đo chỉ số TDS và chuẩn đoán chính xác nguyên nhân lỗi hỏng hoàn toàn miễn phí.',
      icon: <MapPin className="h-7 w-7 text-[#f37021]" />,
      borderColor: 'border-orange-100',
      badgeColor: 'bg-[#f37021]'
    },
    {
      step: '03',
      title: 'Báo Giá & Sửa Chữa',
      description: 'Thông báo lỗi chi tiết, phương án khắc phục và báo giá linh kiện chính hãng. Chỉ tiến hành sửa chữa khi khách hàng đồng ý.',
      icon: <ClipboardList className="h-7 w-7 text-indigo-500" />,
      borderColor: 'border-indigo-100',
      badgeColor: 'bg-indigo-500'
    },
    {
      step: '04',
      title: 'Nghiệm Thu - Bảo Hành',
      description: 'Vận hành thử máy, đo lại nước sạch, bàn giao phiếu bảo hành chính hãng từ 6 - 24 tháng và tiến hành thanh toán.',
      icon: <ShieldCheck className="h-7 w-7 text-emerald-500" />,
      borderColor: 'border-emerald-100',
      badgeColor: 'bg-emerald-500'
    }
  ];

  return (
    <section id="process-section" className="py-20 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-[#0070c0] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            QUY TRÌNH CHUYÊN NGHIỆP
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Quy Trình Sửa Máy Tại Nhà Tiêu Chuẩn 5 Sao
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            Nhanh chóng - Minh bạch - Chuyên nghiệp là cam kết hàng đầu của đội ngũ Sửa Máy Lọc Nước 24H dành cho bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Only visible on desktop screens) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[3px] bg-slate-50 -z-10"></div>

          {steps.map((item) => (
            <div key={item.step} className="text-center group">
              <div className={`w-20 h-20 bg-white border-[5px] ${item.borderColor} rounded-full flex items-center justify-center mx-auto mb-6 shadow-md relative group-hover:scale-105 transition-all duration-300`}>
                <span className={`absolute -top-1.5 -right-1.5 text-white text-[10px] font-extrabold w-6 h-6 rounded-full flex items-center justify-center shadow-sm ${item.badgeColor}`}>
                  {item.step}
                </span>
                {item.icon}
              </div>
              <h4 className="font-display font-extrabold text-slate-900 text-base md:text-lg mb-2.5 group-hover:text-[#0070c0] transition-colors duration-200">
                {item.title}
              </h4>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed px-4">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
