import { useState, useEffect, FormEvent } from 'react';
import { 
  Shield, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Send, 
  Award, 
  Sparkles, 
  UserCheck,
  FileSpreadsheet,
  Mail,
  Loader2,
  X 
} from 'lucide-react';
import { DISTRICTS, SYMPTOMS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onAddBooking: (phone: string, fullName: string, district: string, symptomId: string) => void;
  prefilledSymptomId?: string;
  onClearPrefilledSymptom?: () => void;
  syncStatus?: {
    sheets: 'idle' | 'syncing' | 'success' | 'error';
    gmail: 'idle' | 'syncing' | 'success' | 'error';
  };
}

export default function Hero({ 
  onAddBooking, 
  prefilledSymptomId, 
  onClearPrefilledSymptom,
  syncStatus = { sheets: 'idle', gmail: 'idle' }
}: HeroProps) {
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [district, setDistrict] = useState('Chọn quận gần bạn nhất');
  const [symptomId, setSymptomId] = useState('Chưa rõ nguyên nhân');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Countdown timer state: starts at 24 minutes and 14 seconds
  const [timeLeft, setTimeLeft] = useState(24 * 60 + 14);

  // Check if there is a prefilled symptom selected from the diagnostic tool
  useEffect(() => {
    if (prefilledSymptomId) {
      setSymptomId(prefilledSymptomId);
      if (onClearPrefilledSymptom) {
        onClearPrefilledSymptom();
      }
    }
  }, [prefilledSymptomId, onClearPrefilledSymptom]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 30 * 60; // reset to 30 minutes if hits zero
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const h = Math.floor(timeInSeconds / 3600);
    const m = Math.floor((timeInSeconds % 3600) / 60);
    const s = timeInSeconds % 60;
    return {
      hours: h.toString().padStart(2, '0'),
      minutes: m.toString().padStart(2, '0'),
      seconds: s.toString().padStart(2, '0'),
    };
  };

  const { minutes, seconds } = formatTime(timeLeft);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError('Vui lòng nhập số điện thoại liên hệ!');
      return;
    }
    // simple phone pattern validation
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 11) {
      setError('Số điện thoại không hợp lệ (phải từ 9-11 chữ số)!');
      return;
    }

    setError('');
    onAddBooking(phone, fullName || 'Khách hàng', district, symptomId);
    setSuccess(true);
    
    // reset form
    setPhone('');
    setFullName('');
    setDistrict('Chọn quận gần bạn nhất');
    setSymptomId('Chưa rõ nguyên nhân');

    setTimeout(() => {
      setSuccess(false);
    }, 6000);
  };

  return (
    <section 
      id="hero-section" 
      className="relative py-12 lg:py-20 bg-cover bg-center transition-all duration-300"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.93), rgba(255, 255, 255, 0.93)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvmJ-yB5k5iEedMVduqsXjh9ObJWjoFSEXpsRy0xxat3X-gV3ydv5BvOPVmOa5-t_e79BuooXbyAuuvI0QAs1cpy9YS82xRN2y0stZy5UoewnznBKVUDc09E9XDH_4WYvU5BsJTIRg0c_1Xtx6S5kTHyLLAJ0izWf7ViGK-CdH2KFwT9UfebcLHnynb5Yn7hoh1f2eJkNZrOnEORiYq-rQWLN3SCUoWtyNm1HJumHRGiDIWVvX8e5Zk0cF5IK78YNm7D1p-UmX4BE")'
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6 text-slate-800">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0070c0] px-3.5 py-1.5 rounded-full text-xs font-bold border border-blue-100 tracking-wide uppercase">
            <Award className="h-4 w-4" /> 
            TRUNG TÂM SỬA CHỮA UY TÍN SỐ 1 HÀ NỘI
          </span>
          
          <h1 className="text-3.5xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Sửa Máy Lọc Nước <br />
            <span className="text-[#0070c0] relative inline-block">
              Tại Hà Nội
              <span className="absolute left-0 bottom-1 w-full h-1 bg-amber-400 rounded-full"></span>
            </span> - Cam Kết Linh Kiện Chính Hãng
          </h1>

          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Hỗ trợ nhanh tất cả các hãng <strong className="text-slate-900">Kangaroo, Karofi, Sunhouse, AO Smith, Mutosi, Geyser...</strong> Khắc phục triệt để lỗi nguồn điện, rò rỉ nước, nước yếu, máy chạy không ngắt, nước có mùi vị lạ.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl pt-2">
            <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-slate-100/80 flex items-start gap-3">
              <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Có mặt sau 15 - 30 phút</h4>
                <p className="text-xs text-slate-500 mt-0.5">Kỹ thuật túc trực quận huyện, hỗ trợ nhanh nhất</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-slate-100/80 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#0070c0] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Kiểm tra miễn phí 100%</h4>
                <p className="text-xs text-slate-500 mt-0.5">Không sửa không sao, không thu phí kiểm tra</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-slate-100/80 flex items-start gap-3">
              <Shield className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Bảo hành 6 - 24 tháng</h4>
                <p className="text-xs text-slate-500 mt-0.5">Tem phiếu dán dập hãng, linh kiện uy tín chính hãng</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-slate-100/80 flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-[#0070c0] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Báo giá minh bạch trước khi làm</h4>
                <p className="text-xs text-slate-500 mt-0.5">Nói KHÔNG với chặt chém, báo giá chuẩn hãng</p>
              </div>
            </div>
          </div>

          {/* Customer avatars validation */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              <img 
                alt="Khách hàng sửa máy lọc nước" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6F3QuhMpLxZsyX7pllPfg52H9o_okDffhWdhcSh7CTZ-8NMkcFC4Cs2_OEW-b-0-BF8_bJ0PKWnGdZ3km3X9K1Oe5pXeOPw55nWCE0RFV9Zev9tJtjCwqsyHS4RFLy-F1dKzM-d3wsuurQy9DzB-7jdq97CpgwZaQckBKDpCuuS0zTaCJowgt2pYbPmShX9FUooRvm1zWR8xGo6Y61D5QKIpyggJpkqRa23DPpmogbVRIx0-QUJKx5fGCErtHWIoYkrYt2WpbLhY"
                referrerPolicy="no-referrer"
              />
              <img 
                alt="Khách hàng sửa máy lọc nước" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhyJIe6fM9CFG3Mkp5FqRVJQc1R81SHVnURwi9skao3PeQHz7z5U42_zIa1G1frpDcg5N6U3EJTn7_F9b4-hPKN6dXsXw0JDtSJZlDqhDu5vxpoi11bhXUJSo8nG5eETnKB6RatUc96a03hstd4Tr_t2_zp_YV4jlNzRXjIxN-nA900Gf4Q3F8m41X5uXW2Jd-XD_KBqia25ht8Tn2Pi2jF2P0lR9CcPvIdTt-EpgJ56UpcIjde8Jc3bOkqYz7He71lTksB17oF5A"
                referrerPolicy="no-referrer"
              />
              <img 
                alt="Khách hàng sửa máy lọc nước" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEFpFn9Uir7YP9pB8kfTAkuD2FTHUAP59lo2XMf6dV27N97qOva2k7SI9p6if9CldC6YzGBACAdR0v235yHDz1bbvwpWgwhOc_WgNdSHvy1YH35IwkfnZTdXUCCwWw-Ty4iGNYcI_DIAmIMr6MOVkpJu9IwKFA1E_utYCtOYp2frbUI_3gssDGqbFTLTW6OZ3goi2RU-hTfQXAyMuJ0n1mfifkAb4XhVqTQPsu-LhhTInmDVbcEhxvF5scXp3-6z_NMzamNPqHPAg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-sm">
              <p className="text-slate-800 font-bold">Hơn <span className="text-[#0070c0]">2.450+ khách hàng</span></p>
              <p className="text-slate-500 text-xs">Tại Hà Nội đã tin dùng dịch vụ sửa chữa hàng tháng.</p>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-100 relative overflow-hidden">
            {/* Top Badge Discount */}
            <div className="absolute top-0 right-0 bg-[#f37021] text-white px-4 py-1.5 text-xs font-black rounded-bl-2xl uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>GIẢM 20% CÔNG BẢO DƯỠNG</span>
            </div>

            <div className="text-center mt-3 mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Yêu Cầu Sửa Chữa Tận Nhà</h3>
              <p className="text-slate-500 text-xs md:text-sm mt-1">Đăng ký kiểm tra & nhận ước tính chi phí tức thì</p>
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center py-10 space-y-4"
                >
                  <div className="inline-flex p-3 bg-emerald-100 text-emerald-600 rounded-full">
                    <UserCheck className="h-10 w-10" />
                  </div>
                  <h4 className="font-display font-bold text-emerald-800 text-lg">Gửi Yêu Cầu Thành Công!</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Cảm ơn quý khách! Tổng đài của <span className="font-bold text-[#0070c0]">Sửa Máy Lọc Nước 24H</span> đã tiếp nhận lịch hẹn của bạn. Kỹ thuật viên sẽ liên hệ lại ngay trong vòng 15 phút.
                  </p>

                  {/* Google Workspace Sync Feedback */}
                  {(syncStatus.sheets !== 'idle' || syncStatus.gmail !== 'idle') && (
                    <div className="mt-4 pt-4 border-t border-emerald-100 space-y-2 text-left bg-white/50 p-3 rounded-xl border border-emerald-100/50">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Đồng bộ hệ thống Google</p>
                      
                      <div className="space-y-1.5">
                        {/* Sheets Sync */}
                        {syncStatus.sheets !== 'idle' && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 text-slate-500 font-semibold">
                              <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                              <span>Lưu Google Sheets:</span>
                            </span>
                            {syncStatus.sheets === 'syncing' && (
                              <span className="flex items-center gap-1 text-slate-400 font-bold animate-pulse">
                                <Loader2 className="h-3 w-3 animate-spin text-[#0070c0]" />
                                <span>Đang lưu...</span>
                              </span>
                            )}
                            {syncStatus.sheets === 'success' && (
                              <span className="text-emerald-600 font-bold flex items-center gap-1">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>Đã lưu</span>
                              </span>
                            )}
                            {syncStatus.sheets === 'error' && (
                              <span className="text-rose-500 font-bold flex items-center gap-1">
                                <X className="h-3.5 w-3.5" />
                                <span>Lỗi</span>
                              </span>
                            )}
                          </div>
                        )}

                        {/* Gmail Sync */}
                        {syncStatus.gmail !== 'idle' && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 text-slate-500 font-semibold">
                              <Mail className="h-4 w-4 text-[#0070c0]" />
                              <span>Gửi Email thông báo:</span>
                            </span>
                            {syncStatus.gmail === 'syncing' && (
                              <span className="flex items-center gap-1 text-slate-400 font-bold animate-pulse">
                                <Loader2 className="h-3 w-3 animate-spin text-[#0070c0]" />
                                <span>Đang gửi...</span>
                              </span>
                            )}
                            {syncStatus.gmail === 'success' && (
                              <span className="text-emerald-600 font-bold flex items-center gap-1">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>Đã gửi</span>
                              </span>
                            )}
                            {syncStatus.gmail === 'error' && (
                              <span className="text-rose-500 font-bold flex items-center gap-1">
                                <X className="h-3.5 w-3.5" />
                                <span>Lỗi</span>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button 
                      onClick={() => setSuccess(false)}
                      className="text-xs text-[#0070c0] hover:underline font-bold"
                    >
                      Đăng ký yêu cầu mới
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-100">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Số điện thoại liên hệ *
                    </label>
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Nhập SĐT của bạn (ví dụ: 092771xxxx)..."
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0070c0] focus:border-transparent transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Họ và tên của bạn
                    </label>
                    <input 
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Anh Tuấn, Chị Hoa..."
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0070c0] focus:border-transparent transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Khu vực Quận tại HN
                    </label>
                    <select 
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0070c0] focus:border-transparent transition text-sm bg-white"
                    >
                      <option disabled value="Chọn quận gần bạn nhất">Chọn quận...</option>
                      {DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Tình trạng hỏng hóc
                    </label>
                    <select 
                      value={symptomId}
                      onChange={(e) => setSymptomId(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0070c0] focus:border-transparent transition text-sm bg-white"
                    >
                      <option value="Chưa rõ nguyên nhân">Chưa rõ nguyên nhân</option>
                      {SYMPTOMS.map((sym) => (
                        <option key={sym.id} value={sym.id}>{sym.title}</option>
                      ))}
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#f37021] hover:bg-[#e05f13] text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>GỬI YÊU CẦU - THỢ GỌI LẠI NGAY</span>
                  </button>
                </form>
              )}
            </AnimatePresence>

            {/* Urgency Promo Countdown Timer */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400 mb-2.5 italic">Ưu đãi giảm giá 20% còn hiệu lực trong:</p>
              <div className="flex justify-center items-center gap-2">
                <div className="bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 min-w-[50px]">
                  <span className="block font-display font-extrabold text-slate-800 text-base leading-none">00</span>
                  <span className="text-[9px] text-slate-400 font-bold block mt-1 tracking-wider">GIỜ</span>
                </div>
                <div className="font-extrabold text-slate-300 text-lg mb-4">:</div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 min-w-[50px]">
                  <span className="block font-display font-extrabold text-[#f37021] text-base leading-none">{minutes}</span>
                  <span className="text-[9px] text-slate-400 font-bold block mt-1 tracking-wider">PHÚT</span>
                </div>
                <div className="font-extrabold text-slate-300 text-lg mb-4">:</div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 min-w-[50px]">
                  <span className="block font-display font-extrabold text-[#f37021] text-base leading-none">{seconds}</span>
                  <span className="text-[9px] text-slate-400 font-bold block mt-1 tracking-wider">GIÂY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
