import React, { useState, useEffect, useRef } from 'react';
import { Send, User, MessageCircle, Clock, Sparkles, CheckCheck, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import chatApi from '../../api/chatApi';
import toast from 'react-hot-toast';

const CustomerSupportChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await chatApi.getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    const textToSend = input;
    setInput('');
    
    try {
      await chatApi.sendMessage({ text: textToSend, sender: 'user' });
      
      // Bot reply
      setTimeout(async () => {
         const botReply = {
           text: 'Cảm ơn bạn đã liên hệ! Tư vấn viên sẽ phản hồi bạn trong giây lát.',
           sender: 'bot',
           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
         };
         try {
           const newMsg = await chatApi.sendMessage(botReply);
           setMessages(prev => [...prev, { ...newMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
         } catch (e) {
           console.error("Bot reply error:", e);
         }
      }, 1000);
    } catch (error) {
      toast.error("Không thể gửi tin nhắn");
      console.error("Lỗi khi gửi tin:", error);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-20 overflow-hidden h-screen flex flex-col">
      <div className="container mx-auto px-4 flex-1 flex flex-col max-w-5xl">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 flex-1 flex flex-col overflow-hidden relative">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 border-4 border-blue-50 relative group">
                   <MessageCircle className="w-8 h-8" />
                   <span className="absolute bottom-[-2px] right-[-2px] w-4 h-4 bg-emerald-500 rounded-full border-2 border-white ring-2 ring-emerald-100"></span>
                </div>
                <div>
                   <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic">Trung tâm hỗ trợ</h2>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Trực tuyến 24/7
                   </p>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <button onClick={fetchMessages} className="p-3 hover:bg-slate-50 text-slate-400 rounded-xl transition-all"><Clock size={20} /></button>
                <button className="p-3 hover:bg-slate-50 text-slate-400 rounded-xl transition-all"><MoreVertical size={20} /></button>
             </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-slate-50/30">
             {loading ? (
                <div className="flex items-center justify-center h-full">
                   <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
             ) : messages.length === 0 ? (
                <div className="text-center py-20">
                   <p className="text-slate-400 font-bold uppercase tracking-widest">Bắt đầu cuộc trò chuyện mới</p>
                </div>
             ) : (
                <>
                  <div className="text-center pb-4 text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Hôm nay, {new Date().toLocaleDateString('vi-VN')}</div>
                  {messages.map((m, idx) => (
                    <motion.div 
                      key={m.id || idx}
                      initial={{ opacity: 0, x: (m.sender === 'user' || m.sender === 'customer') ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex flex-col ${ (m.sender === 'user' || m.sender === 'customer') ? 'items-end' : 'items-start'} space-y-2`}
                    >
                       <div className={`max-w-[70%] p-5 rounded-[1.75rem] shadow-sm relative group ${
                         (m.sender === 'user' || m.sender === 'customer') 
                           ? 'bg-blue-600 text-white rounded-br-none' 
                           : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
                       }`}>
                          <p className="font-medium text-sm md:text-base">{m.text || m.messageContent}</p>
                          {(m.sender === 'user' || m.sender === 'customer') && <CheckCheck size={14} className="absolute bottom-2 right-2 text-white/50" />}
                       </div>
                       <div className="flex items-center gap-2 px-2">
                          {m.sender !== 'user' && m.sender !== 'customer' && <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest leading-none">SUPPORT</span>}
                          <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">{m.time || new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                       </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
             )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-100">
             <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-[2rem] border border-slate-200 focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-600 transition-all group">
                <button className="hidden md:block p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-full transition-all shadow-sm"><Smile size={24} /></button>
                <button className="hidden md:block p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-full transition-all shadow-sm"><Paperclip size={24} /></button>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Viết nội dung tin nhắn..."
                  className="flex-1 bg-transparent border-none outline-none font-medium text-slate-700 placeholder:text-slate-400 px-4"
                />
                <button 
                  onClick={handleSend}
                  className="p-4 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-90 transition-all"
                >
                   <Send size={22} className="mr-0.5" />
                </button>
             </div>
          </div>
        </div>

        {/* Quick Help Items */}
        <div className="hidden md:grid grid-cols-4 gap-6 mt-8">
           {[
             { label: 'Giao hàng', icon: Send, color: 'text-blue-600 bg-blue-50' },
             { label: 'Hoàn tiền', icon: Clock, color: 'text-rose-600 bg-rose-50' },
             { label: 'Dịch vụ VIP', icon: Sparkles, color: 'text-amber-600 bg-amber-50' },
             { label: 'Đổi quà', icon: MessageCircle, color: 'text-emerald-600 bg-emerald-50' }
           ].map((item, i) => (
             <button key={i} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-all active:scale-95 text-left group">
                <div className={`p-2.5 rounded-xl group-hover:scale-110 transition-transform ${item.color}`}>
                   <item.icon size={20} />
                </div>
                <span className="font-bold text-slate-700 text-xs uppercase tracking-widest">{item.label}</span>
             </button>
           ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportChatPage;
