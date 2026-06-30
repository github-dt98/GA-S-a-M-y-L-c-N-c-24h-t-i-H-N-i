import { useState } from 'react';
import { PRICE_ITEMS } from '../data';
import { ListCheck, Search, HelpCircle, PhoneCall, Check } from 'lucide-react';

interface PriceTableProps {
  onScrollToBooking: () => void;
}

export default function PriceTable({ onScrollToBooking }: PriceTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'filter' | 'membrane' | 'functional' | 'pump' | 'power' | 'tank' | 'valve'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Categories map
  const categories = [
    { value: 'all', label: 'Tất cả' },
    { value: 'filter', label: 'Lõi lọc thô' },
    { value: 'membrane', label: 'Màng lọc RO' },
    { value: 'functional', label: 'Lõi chức năng' },
    { value: 'pump', label: 'Bơm áp lực' },
    { value: 'power', label: 'Bộ đổi nguồn' },
  ];

  const filteredItems = PRICE_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="price-table-section" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-[#0070c0] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            BẢNG GIÁ NIÊM YẾT
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Báo Giá Thay Thế Linh Kiện Chính Hãng
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Nói KHÔNG với chặt chém giá cả! Toàn bộ linh kiện đều có tem nhãn bảo hành chính hãng và mã vạch check kiểm tra từ hãng.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200/80">
          {/* Header Bar */}
          <div className="bg-slate-900 text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <ListCheck className="h-5 w-5 text-sky-400 shrink-0" />
              <span className="font-bold text-sm md:text-base tracking-tight">Bảng giá chính thức cập nhật mới nhất</span>
            </div>
            <span className="text-xs bg-emerald-500/90 text-white font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse shrink-0"></span> 
              Miễn Phí Công Sửa Tại Nhà
            </span>
          </div>

          {/* Search & Category filter */}
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'bg-[#0070c0] text-white shadow-sm'
                      : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Tìm kiếm linh kiện..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs border border-slate-200 bg-white rounded-lg pl-8 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0070c0] focus:border-transparent"
              />
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <tbody className="divide-y divide-slate-100">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => {
                    const isRO = item.category === 'membrane';
                    return (
                      <tr 
                        key={item.id} 
                        className={`hover:bg-slate-50/50 transition duration-150 ${isRO ? 'bg-sky-50/20' : ''}`}
                      >
                        <td className="p-5 md:p-6">
                          <div className="flex flex-col">
                            <span className={`font-bold ${isRO ? 'text-[#0070c0] flex items-center gap-1.5' : 'text-slate-800'}`}>
                              {item.name}
                              {isRO && (
                                <span className="bg-[#0070c0] text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase">
                                  PHỔ BIẾN
                                </span>
                              )}
                            </span>
                            <span className="text-xs text-slate-400 mt-1">{item.description}</span>
                          </div>
                        </td>
                        <td className="p-5 md:p-6 text-right shrink-0">
                          <div className="flex flex-col items-end">
                            <span className={`text-lg md:text-xl font-extrabold tracking-tight ${isRO ? 'text-[#0070c0]' : 'text-slate-900'}`}>
                              {item.price}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">{item.unit ? `/${item.unit}` : '/ chiếc'}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={2} className="p-8 text-center text-slate-400 text-xs">
                      Không tìm thấy linh kiện nào khớp với bộ lọc của bạn.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Notice */}
          <div className="bg-slate-50 p-5 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-start gap-2.5 max-w-lg">
              <HelpCircle className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed italic">
                Lưu ý: Khách hàng luôn được quyền kiểm tra nhãn mác, tem chống hàng giả trước khi kỹ thuật thay thế. Nếu không đồng ý thay, quý khách không mất bất kỳ đồng phí dịch vụ nào!
              </p>
            </div>
            <button 
              onClick={onScrollToBooking}
              className="bg-[#0070c0] hover:bg-[#005da0] text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Yêu cầu báo giá linh kiện khác</span>
              <PhoneCall className="h-4 w-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
