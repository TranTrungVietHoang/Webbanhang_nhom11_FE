import { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header/Header';
import { Phone, Video, Settings, Paperclip, Image as ImageIcon, Smile, Send, MessageCirclePlus, User } from 'lucide-react';
import chatApi from '../../api/chatApi';

const CustomerSupportChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    // Initial fetch
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await chatApi.getMessages();
                setMessages(data);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };
        fetchMessages();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!inputValue.trim()) return;

        const optimisticMessage = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, optimisticMessage]);
        const textToSend = inputValue;
        setInputValue('');

        try {
            await chatApi.sendMessage({ text: textToSend, sender: 'user' });
            // Optionally, fake a bot reply for demo purposes
            setTimeout(async () => {
                const botReply = {
                    text: 'Cảm ơn bạn đã liên hệ! Tư vấn viên sẽ phản hồi bạn trong giây lát.',
                    sender: 'bot'
                };
                const newMsg = await chatApi.sendMessage(botReply);
                setMessages(prev => [...prev, newMsg]);
            }, 1000);
        } catch (error) {
            console.error("Lỗi khi gửi tin:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSuggestionClick = (text) => {
        setInputValue(text);
        // If you want it to send immediately, you can call API here.
        // For now, it just fills the input box.
    };

    const suggestions = [
        "Tôi muốn hỏi về sản phẩm",
        "Kiểm tra đơn hàng",
        "Chính sách đổi trả",
        "Phương thức thanh toán"
    ];

    return (
        <div className="h-screen flex flex-col bg-gray-50 overflow-hidden font-sans">
            <Header />

            {/* Chat Container Wrapper */}
            <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col h-full overflow-hidden">
                
                {/* Main Chat Box */}
                <div className="flex-1 bg-[#F9F9F9] rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden relative">
                    
                    {/* Chat Header */}
                    <div className="bg-[#248EEB] text-white px-6 py-4 flex justify-between items-center shrink-0">
                        <div className="flex items-center space-x-4">
                            <div className="bg-[#0B1E36] p-2 rounded-lg">
                                <User className="w-8 h-8 text-black" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h2 className="font-medium text-lg leading-tight tracking-wide">Hỗ trợ khách hàng hàng</h2>
                                <div className="flex items-center space-x-1.5 mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-green-400 border border-white"></div>
                                    <span className="text-sm text-blue-100 italic">Đang hoạt động</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-6 text-white/90">
                            <button className="hover:text-white transition-colors"><Phone className="w-6 h-6" strokeWidth={2}/></button>
                            <button className="hover:text-white transition-colors"><Video className="w-6 h-6" strokeWidth={2}/></button>
                            <button className="hover:text-white transition-colors"><Settings className="w-6 h-6" strokeWidth={2}/></button>
                        </div>
                    </div>

                    {/* Chat Body Area */}
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col space-y-4">
                        
                        {/* Start Conversation Screen (shown if few or no messages, or always as top header) */}
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center p-4">
                                <div className="mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                                   <MessageCirclePlus className="w-14 h-14 text-white" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-medium text-gray-800 mb-2">Bắt đầu cuộc trò chuyện</h3>
                                <p className="text-gray-500 mb-10 text-[15px]">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
                                    {suggestions.map((text, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => handleSuggestionClick(text)}
                                            className="px-6 py-3.5 bg-[#B8E2F2]/40 hover:bg-[#B8E2F2]/70 text-[#176288] font-medium rounded-xl text-center transition-colors text-lg tracking-wide shadow-sm"
                                        >
                                            {text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-4 justify-end min-h-full">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                                            msg.sender === 'user' ? 'bg-[#248EEB] text-white rounded-br-sm' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                                        }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Chat Input Area */}
                    <div className="bg-[#E5E5E5] px-6 py-4 border-t border-gray-300 flex flex-col shrink-0">
                        <div className="flex items-center space-x-3 mb-2">
                            <button className="text-gray-800 hover:text-black transition-colors">
                                <Paperclip className="w-7 h-7" strokeWidth={1.5} />
                            </button>
                            <button className="text-gray-800 hover:text-black transition-colors">
                                <ImageIcon className="w-7 h-7" strokeWidth={1.5} />
                            </button>

                            <div className="flex-1 relative flex items-center">
                                <textarea
                                    rows="1"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Nhập tin nhắn..."
                                    className="w-full bg-white text-gray-800 px-5 py-3.5 rounded-full outline-none focus:ring-2 focus:ring-[#248EEB] resize-none shadow-sm text-base pr-12 overflow-hidden"
                                    style={{ minHeight: '52px', maxHeight: '120px' }}
                                />
                                <button className="absolute right-4 text-gray-500 hover:text-gray-700">
                                    <Smile className="w-6 h-6" strokeWidth={1.5}/>
                                </button>
                            </div>

                            <button onClick={handleSendMessage} className="text-black hover:opacity-80 transition-opacity ml-2">
                                <div style={{ transform: 'rotate(45deg)' }}>
                                    <Send className="w-7 h-7" fill="currentColor" strokeWidth={1}/>
                                </div>
                            </button>
                        </div>
                        <div className="text-xs text-gray-600 font-medium pl-14">
                            Nhấn Enter để gửi, Shift + Enter để xuống dòng
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerSupportChatPage;
