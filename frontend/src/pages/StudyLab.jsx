import { useState } from "react";
import { Send, Sparkles, BookOpen, ChevronLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { sendChatMessage } from "../services/api";

export default function StudyLab() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello Aniket! I've analyzed your Data Structures notes. Which concept should we master today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    // 1. Instantly show your message
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setIsTyping(true); // Show "AI is thinking..."

    try {
      // 2. Send it to the backend
      const response = await sendChatMessage(userText);

      // 3. Show the AI's response
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: response.data.text },
      ]);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, my brain is disconnected right now. Check your terminal!",
        },
      ]);
    } finally {
      setIsTyping(false); // Hide the loading animation
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">
            Study Lab:{" "}
            <span className="text-brand-accent">Data Structures</span>
          </h1>
        </div>
        <button className="flex items-center gap-2 bg-brand-accent/10 text-brand-accent px-4 py-2 rounded-lg border border-brand-accent/20 hover:bg-brand-accent/20 transition text-sm">
          <Sparkles size={16} />
          Generate Quiz
        </button>
      </div>

      {/* Main Split View */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left Side: Content Viewer */}
        <div className="hidden lg:flex flex-1 bg-slate-800/30 border border-slate-800 rounded-2xl flex-col items-center justify-center text-slate-500">
          <BookOpen size={48} className="mb-4 opacity-20" />
          <p>Document Viewer / Concept Summary</p>
          <p className="text-xs mt-2 italic">PDF Preview will appear here</p>
        </div>

        {/* Right Side: AI Coach Chat */}
        <div className="w-full lg:w-[450px] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-slate-800 bg-slate-800/50 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-slate-300">
              AI Concept Coach
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-brand-accent text-white rounded-tr-none"
                      : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-400 p-3 rounded-2xl rounded-tl-none border border-slate-700 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-800/50 border-t border-slate-800">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask for a hint or explanation..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-brand-accent transition"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={isTyping}
                className="absolute right-2 top-1.5 p-1.5 bg-brand-accent text-white rounded-lg hover:bg-blue-600 disabled:bg-slate-700 transition"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
