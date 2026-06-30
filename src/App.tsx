/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Brands from './components/Brands';
import DiagnosticTool from './components/DiagnosticTool';
import ErrorCards from './components/ErrorCards';
import PriceTable from './components/PriceTable';
import Process from './components/Process';
import Coverage from './components/Coverage';
import BranchesSection from './components/BranchesSection';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { Booking } from './types';
import { Phone, Calendar, MessageSquare, ClipboardList, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import WorkspacePanel from './components/WorkspacePanel';
import { getAccessToken, appendRowToSheet, sendBookingEmail } from './lib/workspace';
import { SYMPTOMS } from './data';

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [prefilledSymptomId, setPrefilledSymptomId] = useState<string | undefined>(undefined);
  const [showActiveBookings, setShowActiveBookings] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    sheets: 'idle' | 'syncing' | 'success' | 'error';
    gmail: 'idle' | 'syncing' | 'success' | 'error';
  }>({ sheets: 'idle', gmail: 'idle' });

  // Load bookings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('water_purifier_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved bookings:', e);
      }
    }
  }, []);

  const handleAddBooking = async (phone: string, fullName: string, district: string, symptomId: string) => {
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      phone,
      fullName,
      district,
      symptomId,
      status: 'pending',
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('vi-VN')
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('water_purifier_bookings', JSON.stringify(updated));

    // Try Google Workspace Sync
    const token = await getAccessToken();
    const sheetId = localStorage.getItem('ws_spreadsheet_id');
    const emailToNotify = localStorage.getItem('ws_recipient_email');

    if (token) {
      setSyncStatus({ sheets: 'syncing', gmail: 'syncing' });
      
      const symptomObj = SYMPTOMS.find(s => s.id === symptomId);
      const symptomName = symptomObj ? symptomObj.title : symptomId;

      let sheetsStatus: 'success' | 'error' = 'success';
      let gmailStatus: 'success' | 'error' = 'success';

      // 1. Google Sheets Sync
      if (sheetId) {
        try {
          await appendRowToSheet(token, sheetId, [
            newBooking.id,
            newBooking.fullName,
            newBooking.phone,
            newBooking.district,
            symptomName,
            newBooking.createdAt
          ]);
        } catch (err) {
          console.error('Error syncing booking to sheet:', err);
          sheetsStatus = 'error';
        }
      } else {
        sheetsStatus = 'error';
      }

      // 2. Gmail Sync
      if (emailToNotify) {
        try {
          await sendBookingEmail(token, emailToNotify, newBooking, symptomName);
        } catch (err) {
          console.error('Error sending booking email:', err);
          gmailStatus = 'error';
        }
      } else {
        gmailStatus = 'error';
      }

      setSyncStatus({ sheets: sheetsStatus, gmail: gmailStatus });
    }
  };

  const handleSelectSymptomAndScroll = (symptomId: string) => {
    setPrefilledSymptomId(symptomId);
    
    // Smooth scroll to hero section where the form resides
    const element = document.getElementById('hero-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToBooking = () => {
    const element = document.getElementById('hero-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('water_purifier_bookings', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-800">
      {/* Header component */}
      <Header onScrollToBooking={handleScrollToBooking} />

      {/* Main Body */}
      <main>
        {/* Hero Section containing title & booking form */}
        <Hero 
          onAddBooking={handleAddBooking} 
          prefilledSymptomId={prefilledSymptomId}
          onClearPrefilledSymptom={() => setPrefilledSymptomId(undefined)}
          syncStatus={syncStatus}
        />

        {/* Partner / Brand logos */}
        <Brands />

        {/* Dynamic self diagnosis & estimation tool */}
        <DiagnosticTool onSelectSymptomAndScroll={handleSelectSymptomAndScroll} />

        {/* Lists of common errors */}
        <ErrorCards onSelectSymptomAndScroll={handleSelectSymptomAndScroll} />

        {/* Printable/Searchable Replacement Parts Price Table */}
        <PriceTable onScrollToBooking={handleScrollToBooking} />

        {/* Standard 5-star process */}
        <Process />

        {/* Coverage details */}
        <Coverage />

        {/* 19 Hanoi branches as shown in image */}
        <BranchesSection />

        {/* Real reviews testimonials */}
        <Testimonials />

        {/* Collapsible FAQ Accordions */}
        <FAQ />

        {/* Call-to-action banner */}
        <FinalCTA />
      </main>

      {/* Footer copyright & company branches */}
      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Bookings Tracker Button - only visible if user has submitted bookings */}
        {bookings.length > 0 && (
          <button
            onClick={() => setShowActiveBookings(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center relative cursor-pointer group"
            title="Theo dõi yêu cầu của bạn"
          >
            <ClipboardList className="h-5.5 w-5.5" />
            <span className="absolute -top-1 -right-1 bg-[#f37021] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
              {bookings.length}
            </span>
          </button>
        )}

        {/* Zalo Button */}
        <a
          href="https://zalo.me/0927712222"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0068ff] hover:bg-[#0056d6] text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group relative"
          title="Chat Zalo ngay"
        >
          <svg className="h-5.5 w-5.5 fill-current" viewBox="0 0 24 24">
            <path d="M12.001 2c-5.523 0-10 4.03-10 9 0 2.846 1.472 5.373 3.774 7.001L4.5 21.5l3.873-1.936a10.985 10.985 0 0 0 3.628.601c5.523 0 10-4.03 10-9s-4.477-9-10-9zm2.443 11.5h-3.886l3.886-4.5H10.56v-1h5v1l-3.886 4.5h3.886v1z" />
          </svg>
          <span className="absolute right-14 bg-[#0068ff] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
            Zalo: 092.771.2222
          </span>
        </a>

        {/* Main Phone Call Button */}
        <a
          href="tel:0927712222"
          className="bg-red-500 hover:bg-red-600 text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group relative"
          title="Gọi Thợ Ngay"
        >
          <Phone className="h-5.5 w-5.5 animate-pulse" />
          <span className="absolute right-14 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
            092.771.2222 (24/7)
          </span>
        </a>
      </div>

      {/* Bookings Tracker Drawer Overlay */}
      <AnimatePresence>
        {showActiveBookings && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowActiveBookings(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-slate-100"
              >
                {/* Drawer Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-[#0070c0]" />
                    <h4 className="font-display font-extrabold text-slate-900 text-base">Yêu Cầu Sửa Chữa Của Bạn</h4>
                  </div>
                  <button 
                    onClick={() => setShowActiveBookings(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    Danh sách các yêu cầu sửa chữa máy lọc nước bạn đã gửi. Kỹ thuật viên từ các cơ sở gần nhất sẽ liên lạc qua SĐT này trong 15 phút để hẹn giờ.
                  </p>

                  <div className="space-y-3 pt-2">
                    {bookings.map((booking) => (
                      <div 
                        key={booking.id}
                        className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-3 relative group"
                      >
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="absolute top-3 right-3 p-1 rounded text-slate-300 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                          title="Xóa lịch hẹn này"
                        >
                          <X className="h-4 w-4" />
                        </button>

                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wide">
                            Đang xử lý nhanh
                          </span>
                        </div>

                        <div className="space-y-1 text-xs md:text-sm text-slate-600">
                          <p><strong className="text-slate-800">Khách hàng:</strong> {booking.fullName}</p>
                          <p><strong className="text-slate-800">Số điện thoại:</strong> {booking.phone}</p>
                          <p><strong className="text-slate-800">Khu vực:</strong> {booking.district}</p>
                          <p><strong className="text-slate-800">Lỗi máy:</strong> {booking.symptomId === 'Chưa rõ nguyên nhân' ? 'Chưa rõ nguyên nhân' : 'Bị sự cố máy lọc'}</p>
                        </div>

                        <div className="border-t border-slate-100/80 pt-2.5 flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                          <span>Mã: #{booking.id}</span>
                          <span>Đăng ký lúc: {booking.createdAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/60 space-y-3 text-center">
                  <p className="text-[11px] text-slate-400">Cần thay đổi lịch hoặc hủy yêu cầu gấp?</p>
                  <a 
                    href="tel:0927712222"
                    className="w-full bg-[#0070c0] hover:bg-[#005da0] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-xs md:text-sm transition shadow-sm cursor-pointer"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>Gọi Tổng Đài: 092.771.2222</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Google Workspace Integration Panel */}
      <WorkspacePanel />
    </div>
  );
}
