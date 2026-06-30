import { Phone, Clock, ShieldCheck, MapPin, CalendarDays, Headphones } from 'lucide-react';

interface HeaderProps {
  onScrollToBooking: () => void;
}

export default function Header({ onScrollToBooking }: HeaderProps) {
  return (
    <>
      {/* Top Notification Bar */}
      <div id="top-bar" className="bg-slate-50 border-b border-slate-200 py-2.5 text-xs md:text-sm text-slate-600 transition-all duration-300">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <MapPin className="h-4 w-4 text-[#0070c0] shrink-0" />
            <span className="font-medium">Kỹ thuật viên trực tại 12 quận Hà Nội. Có mặt sau 15-30 phút!</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-[#0070c0]" />
              <span>Hoạt động: 24/7 (Cả lễ, CN)</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-[#0070c0]" />
              <span>Bảo hành dài hạn 6-24 tháng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header id="main-header" className="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm z-40 transition-all duration-300 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl py-3.5 flex justify-between items-center">
          {/* Logo */}
          <a href="https://suamaylocnuoc24h.vn/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 cursor-pointer">
            <img 
              alt="Sửa Máy Lọc Nước 24H" 
              className="h-10 md:h-12 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1ckz4dZrzPM3N5fAqwGDLNgw3SRxNOH1whmuwPaIpBftywvdgaNh8ld801fgO_sBP1CvrskysJHxW-Xi6dvFF_fEgU9a4XtFBmXmJTCvI5_dauF62nJpQ1cUaehC045rT3CeHKQx53MpDIkUhKdAPmOuJbj7jz8GrYBcLLB7ewxum32ckKazeoxj8-DAi_VuGP4Hc-3rrmkX9OnL1lfswlbla90Tua1667tG1bptYVSSroaUuiKmKR8hEmqtkCrxAT7fF3jIxzr8"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Contact and Call to Action */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Hotline 24/7 */}
            <div className="hidden md:flex items-center gap-2 text-right">
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Tổng đài hỗ trợ 24/7</p>
                <a href="tel:0927712222" className="font-display font-bold text-slate-900 text-base lg:text-lg hover:text-[#0070c0] transition">
                  092.771.2222
                </a>
              </div>
              <div className="p-2 bg-blue-50 rounded-full text-[#0070c0]">
                <Phone className="h-5 w-5 animate-pulse" />
              </div>
            </div>

            {/* Hotline kỹ thuật */}
            <div className="hidden lg:flex items-center gap-2 text-right border-l border-slate-200 pl-6">
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Kỹ thuật trực tận nơi</p>
                <a href="tel:0974880880" className="font-display font-bold text-[#f37021] text-base lg:text-lg hover:text-orange-600 transition">
                  0974.880.880
                </a>
              </div>
              <div className="p-2 bg-orange-50 rounded-full text-[#f37021]">
                <Headphones className="h-5 w-5" />
              </div>
            </div>

            {/* Call Action Button */}
            <a 
              id="btn-header-call"
              href="tel:0927712222"
              className="bg-[#f37021] hover:bg-[#e05e1b] text-white text-xs md:text-sm font-bold px-4 md:px-5 py-2.5 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer animate-pulse-ring"
            >
              <Phone className="h-4 w-4 shrink-0 animate-wiggle" />
              <span>GỌI THỢ NGAY</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
