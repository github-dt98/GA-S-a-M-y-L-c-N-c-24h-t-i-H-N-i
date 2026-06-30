import { Mail, FileSignature, MapPin, ExternalLink, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const services = [
    'Sửa máy lọc nước Karofi',
    'Sửa máy lọc nước Kangaroo',
    'Sửa máy lọc nước Sunhouse',
    'Sửa máy lọc nước AO Smith',
    'Sửa máy lọc nước Mutosi',
    'Sửa máy lọc nước Hoà Phát',
    'Thay lõi lọc nước định kỳ',
    'Khắc phục rò rỉ nước, nước yếu'
  ];

  const districts = [
    'Cầu Giấy', 'Đống Đa', 'Thanh Xuân', 'Hà Đông', 
    'Ba Đình', 'Hai Bà Trưng', 'Hoàng Mai', 'Nam Từ Liêm', 
    'Tây Hồ', 'Hoàn Kiếm', 'Long Biên', 'Thanh Trì'
  ];

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-slate-900 transition-all duration-300 relative overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Column 1: Brand Info (4/12 width) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <a 
                href="https://suamaylocnuoc24h.vn/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-white p-2.5 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-sky-950/20"
              >
                <img 
                  alt="Sửa Máy Lọc Nước 24H" 
                  className="h-11 md:h-12 w-auto object-contain" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1ckz4dZrzPM3N5fAqwGDLNgw3SRxNOH1whmuwPaIpBftywvdgaNh8ld801fgO_sBP1CvrskysJHxW-Xi6dvFF_fEgU9a4XtFBmXmJTCvI5_dauF62nJpQ1cUaehC045rT3CeHKQx53MpDIkUhKdAPmOuJbj7jz8GrYBcLLB7ewxum32ckKazeoxj8-DAi_VuGP4Hc-3rrmkX9OnL1lfswlbla90Tua1667tG1bptYVSSroaUuiKmKR8hEmqtkCrxAT7fF3jIxzr8"
                  referrerPolicy="no-referrer"
                />
              </a>
            </div>

            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              Trung tâm bảo dưỡng, sửa chữa và thay lõi lọc nước chính hãng uy tín hàng đầu Hà Nội. Cam kết khắc phục triệt để mọi sự cố, phục vụ tận tâm 24/7 cả ngày lễ và chủ nhật.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <FileSignature className="h-4.5 w-4.5 text-[#0284c7] shrink-0 mt-0.5" />
                <span className="leading-normal">MST ĐKKD: 0109831891 - Đăng ký chính thức tại Sở KHĐT TP. Hà Nội.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="h-4.5 w-4.5 text-[#0284c7] shrink-0" />
                <a href="mailto:suamaylocnuoc24h.vn@gmail.com" className="hover:text-white transition duration-200">
                  suamaylocnuoc24h.vn@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                <a href="tel:0927712222" className="text-white font-extrabold hover:text-emerald-400 transition duration-200 text-base">
                  Hotline 24/7: 0927.712.222
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services (3/12 width) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#0284c7] rounded-sm"></span>
              DỊCH VỤ NỔI BẬT
            </h4>
            <ul className="space-y-3 text-sm">
              {services.map((svc, idx) => (
                <li key={idx} className="flex items-center gap-2.5 group">
                  <CheckCircle2 className="h-4 w-4 text-slate-600 group-hover:text-[#0284c7] transition-colors duration-200 shrink-0" />
                  <span className="group-hover:text-slate-200 transition-colors duration-200">{svc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Area & Guarantees (4/12 width) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#0284c7] rounded-sm"></span>
                KHU VỰC PHỤC VỤ NHANH
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Đội ngũ kỹ thuật viên túc trực liên tục tại toàn bộ các quận thuộc Hà Nội, cam kết có mặt nhanh chóng trong vòng 15-30 phút sau khi gọi:
              </p>
              <div className="flex flex-wrap gap-2">
                {districts.map((district, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg hover:border-slate-700 hover:text-white transition duration-200 flex items-center gap-1.5"
                  >
                    <MapPin className="h-3 w-3 text-red-500" />
                    {district}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-900 flex items-center gap-3.5">
              <ShieldCheck className="h-10 w-10 text-[#0284c7] shrink-0" />
              <div>
                <h5 className="text-slate-200 font-bold text-xs uppercase tracking-wider">Cam kết chất lượng vàng</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Linh kiện chính hãng 100% - Bảo hành dài hạn lên tới 24 tháng.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-900 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="text-center md:text-left space-y-1">
            <p className="text-slate-500">© 2026 Sửa Máy Lọc Nước 24H. All rights reserved.</p>
            <p className="text-[10px] text-slate-600 italic">
              * Thương hiệu Karofi, Kangaroo, Sunhouse, AO Smith... thuộc sở hữu các hãng tương ứng. Chúng tôi cung cấp dịch vụ sửa chữa, bảo dưỡng độc lập chuyên nghiệp ngoài bảo hành chính hãng.
            </p>
          </div>
          <div className="flex gap-6 shrink-0">
            <a href="#privacy" className="hover:text-white text-slate-500 transition duration-200 flex items-center gap-1">
              Chính sách bảo mật <ExternalLink className="h-3 w-3" />
            </a>
            <a href="#terms" className="hover:text-white text-slate-500 transition duration-200 flex items-center gap-1">
              Điều khoản dịch vụ <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
