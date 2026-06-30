import { useState } from 'react';
import { FAQ_ITEMS } from '../data';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <section id="faq-section" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-[#0070c0] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            HỎI &amp; ĐÁP
          </span>
          <h2 className="text-2.5xl md:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Câu Hỏi Thường Gặp Của Khách Hàng
          </h2>
        </div>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id} 
                className="border border-slate-100 rounded-2xl bg-slate-50/60 overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-800 hover:text-[#0070c0] transition-colors focus:outline-none cursor-pointer text-xs md:text-sm"
                >
                  <span className="flex items-center gap-2.5 pr-4">
                    <HelpCircle className="h-4 w-4 text-[#0070c0] shrink-0" />
                    {item.question}
                  </span>
                  <ChevronDown 
                    className={`h-4.5 w-4.5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0070c0]' : ''}`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100 pt-4 bg-white">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
