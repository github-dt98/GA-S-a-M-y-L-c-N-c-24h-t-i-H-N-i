import { useState, useEffect } from 'react';
import { 
  googleSignIn, 
  logout, 
  initAuth, 
  createNewSheet, 
  sendBookingEmail,
  appendRowToSheet,
  getCachedUser,
  getAccessToken
} from '../lib/workspace';
import { 
  Database, 
  Mail, 
  FileSpreadsheet, 
  ExternalLink, 
  CheckCircle2, 
  X, 
  Settings, 
  LogOut, 
  AlertCircle, 
  Send, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from 'firebase/auth';

interface WorkspacePanelProps {
  onSyncStatusChange?: (status: { sheets: 'idle' | 'syncing' | 'success' | 'error'; gmail: 'idle' | 'syncing' | 'success' | 'error' }) => void;
}

export default function WorkspacePanel({ onSyncStatusChange }: WorkspacePanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(
    localStorage.getItem('ws_spreadsheet_id')
  );
  const [spreadsheetName, setSpreadsheetName] = useState<string | null>(
    localStorage.getItem('ws_spreadsheet_name') || 'Danh sách Yêu Cầu Sửa Máy Lọc Nước 24H'
  );
  const [recipientEmail, setRecipientEmail] = useState<string>(
    localStorage.getItem('ws_recipient_email') || ''
  );
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        setNeedsAuth(false);
        // Default recipient email if empty
        if (!recipientEmail && currentUser.email) {
          const email = currentUser.email;
          setRecipientEmail(email);
          localStorage.setItem('ws_recipient_email', email);
        }
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  // Update localStorage recipient email
  useEffect(() => {
    if (recipientEmail) {
      localStorage.setItem('ws_recipient_email', recipientEmail);
    }
  }, [recipientEmail]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
        
        // Auto-create spreadsheet if not present
        if (!spreadsheetId) {
          await handleCreateSpreadsheet(result.accessToken);
        }
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      alert('Đăng nhập thất bại: ' + (err.message || 'Lỗi không xác định'));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Bạn có chắc chắn muốn ngắt kết nối Google Workspace không?');
    if (!confirmLogout) return;
    try {
      await logout();
      setUser(null);
      setToken(null);
      setNeedsAuth(true);
      setSpreadsheetId(null);
      localStorage.removeItem('ws_spreadsheet_id');
      localStorage.removeItem('ws_spreadsheet_name');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleCreateSpreadsheet = async (accessTokenToUse?: string) => {
    const tokenToUse = accessTokenToUse || token;
    if (!tokenToUse) return;
    
    setIsCreatingSheet(true);
    try {
      const newId = await createNewSheet(tokenToUse);
      setSpreadsheetId(newId);
      setSpreadsheetName('Danh sách Yêu Cầu Sửa Máy Lọc Nước 24H');
      localStorage.setItem('ws_spreadsheet_id', newId);
      localStorage.setItem('ws_spreadsheet_name', 'Danh sách Yêu Cầu Sửa Máy Lọc Nước 24H');
    } catch (err: any) {
      console.error('Create sheet failed:', err);
      alert('Không thể tạo Google Sheet: ' + (err.message || 'Lỗi kết nối'));
    } finally {
      setIsCreatingSheet(false);
    }
  };

  const handleSendTestEmail = async () => {
    if (!token) return;
    if (!recipientEmail) {
      alert('Vui lòng nhập email nhận thông báo!');
      return;
    }
    setIsSendingTest(true);
    setTestResult(null);
    try {
      const mockBooking = {
        id: 'TEST88',
        phone: '0927712222',
        fullName: 'Nguyễn Văn Thử Nghiệm',
        district: 'Cầu Giấy',
        symptomId: 'ro-nuoc',
        status: 'pending' as const,
        createdAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN')
      };
      await sendBookingEmail(token, recipientEmail, mockBooking, 'Rò rỉ nước ra sàn nhà (TEST)');
      setTestResult({
        success: true,
        message: `Đã gửi thành công email thử nghiệm tới ${recipientEmail}!`
      });
    } catch (err: any) {
      console.error('Test email failed:', err);
      setTestResult({
        success: false,
        message: 'Gửi thất bại: ' + (err.message || 'Lỗi API Google')
      });
    } finally {
      setIsSendingTest(false);
    }
  };

  const spreadsheetUrl = spreadsheetId 
    ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
    : '#';

  return (
    <>
      {/* Floating administrative setup trigger button (Bottom Left) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 p-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
        title="Đồng bộ Google Workspace"
      >
        <div className="relative">
          <Settings className="h-5.5 w-5.5 text-[#0070c0] group-hover:rotate-45 transition-transform duration-300" />
          {!needsAuth && spreadsheetId && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 w-2.5 h-2.5 rounded-full border border-white" />
          )}
        </div>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold text-xs whitespace-nowrap text-[#0070c0]">
          {!needsAuth && spreadsheetId ? 'Google: Đã đồng bộ' : 'Cấu hình Google'}
        </span>
      </button>

      {/* Configuration Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg border border-slate-100 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-100 text-[#0070c0] rounded-xl">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Đồng bộ Google Workspace</h3>
                    <p className="text-[11px] text-slate-400 font-medium">Lưu tự động vào Google Sheets & Email</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Connection Step */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Bước 1: Kết nối tài khoản Google</h4>
                  {needsAuth ? (
                    <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl flex flex-col items-center text-center space-y-4">
                      <div className="p-2.5 bg-blue-50/50 rounded-full text-[#0070c0]">
                        <Mail className="h-8 w-8" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-800">Kết nối Gmail và Google Sheets</p>
                        <p className="text-xs text-slate-400 max-w-sm">
                          Hệ thống cần quyền gửi email và chỉnh sửa bảng tính để tự động hóa quy trình quản lý thông tin khách hàng của bạn.
                        </p>
                      </div>
                      
                      <button
                        onClick={handleLogin}
                        disabled={isLoggingIn}
                        className="gsi-material-button w-full sm:w-auto bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-3 shadow-sm hover:shadow transition duration-200 cursor-pointer text-sm"
                      >
                        {isLoggingIn ? (
                          <Loader2 className="h-4 w-4 animate-spin text-[#0070c0]" />
                        ) : (
                          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                          </svg>
                        )}
                        <span>Đăng nhập bằng Google</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                            {user?.email?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-medium">Tài khoản liên kết</p>
                            <p className="text-sm font-bold text-slate-800">{user?.email}</p>
                          </div>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="text-xs text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1.5 p-2 rounded-xl hover:bg-rose-50 transition cursor-pointer"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Hủy</span>
                        </button>
                      </div>
                      
                      <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs text-amber-850 flex items-start gap-2.5 leading-relaxed">
                        <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-900 block mb-0.5">⚠️ YÊU CẦU CẤP QUYỀN TRUY CẬP:</strong>
                          Hệ thống vừa cập nhật chức năng kết nối Google Workspace. Để tránh lỗi thiếu quyền (Insufficient Permission), vui lòng bấm nút <strong className="text-rose-600">"Hủy"</strong> ở trên, sau đó <strong className="text-emerald-700">đăng nhập lại</strong> và tích chọn đồng ý cho cả hai quyền <strong className="font-bold">Xem/Sửa Bảng tính (Google Sheets)</strong> và <strong className="font-bold">Gửi Email (Gmail)</strong> khi Google hỏi nhé!
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Google Sheet Sync Step */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Bước 2: Cấu hình bảng tính Google Sheets</h4>
                  {needsAuth ? (
                    <p className="text-xs text-slate-400 italic">Vui lòng kết nối tài khoản Google ở Bước 1.</p>
                  ) : (
                    <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 text-slate-700">
                          <FileSpreadsheet className="h-5 w-5 text-emerald-500 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-slate-800">{spreadsheetName}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {spreadsheetId ? `ID: ${spreadsheetId.substring(0, 16)}...` : 'Chưa được tạo'}
                            </p>
                          </div>
                        </div>
                        {spreadsheetId && (
                          <a
                            href={spreadsheetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#0070c0] hover:underline font-bold flex items-center gap-1 shrink-0"
                          >
                            <span>Mở bảng</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>

                      {!spreadsheetId ? (
                        <button
                          onClick={() => handleCreateSpreadsheet()}
                          disabled={isCreatingSheet}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          {isCreatingSheet ? (
                            <Loader2 className="h-4 w-4 animate-spin text-white" />
                          ) : (
                            <FileSpreadsheet className="h-4 w-4" />
                          )}
                          <span>Tự động tạo Google Sheet lưu đơn</span>
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCreateSpreadsheet()}
                            disabled={isCreatingSheet}
                            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 rounded-xl text-xs transition cursor-pointer"
                          >
                            Tạo lại bảng khác
                          </button>
                          <div className="bg-emerald-100 text-emerald-700 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Đã kích hoạt lưu</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Gmail Sync Step */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Bước 3: Email nhận thông báo</h4>
                  {needsAuth ? (
                    <p className="text-xs text-slate-400 italic">Vui lòng kết nối tài khoản Google ở Bước 1.</p>
                  ) : (
                    <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Gửi thông báo tới hòm thư:</label>
                        <input
                          type="email"
                          placeholder="Ví dụ: suamaylocnuoc24h.vn@gmail.com"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-[#0070c0]"
                        />
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <button
                          onClick={handleSendTestEmail}
                          disabled={isSendingTest || !recipientEmail}
                          className="w-full sm:w-auto bg-[#0070c0] hover:bg-[#005da0] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50 shadow-sm"
                        >
                          {isSendingTest ? (
                            <Loader2 className="h-4 w-4 animate-spin text-white" />
                          ) : (
                            <Send className="h-3.5 w-3.5" />
                          )}
                          <span>Gửi mail thử nghiệm</span>
                        </button>
                        
                        <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                          <span>Hệ thống tự động sử dụng Gmail để gửi</span>
                        </div>
                      </div>

                      {testResult && (
                        <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                          testResult.success 
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                            : 'bg-rose-50 border-rose-100 text-rose-800'
                        }`}>
                          {testResult.success ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                          )}
                          <span>{testResult.message}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2 rounded-xl text-xs transition cursor-pointer shadow-sm"
                >
                  Xong
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
