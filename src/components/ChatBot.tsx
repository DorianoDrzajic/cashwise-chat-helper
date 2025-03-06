
import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import { suggestedQuestions, getResponse } from '@/data/chatResponses';
import { scrollToBottom } from '@/lib/animations';

interface Message {
  content: string;
  isUser: boolean;
  id: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi there! I'm your financial assistant. How can I help you today?",
      isUser: false,
      id: 'intro',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSendMessage = () => {
    if (input.trim() === '' || isTyping) return;

    const userMessage = {
      content: input,
      isUser: true,
      id: `user-${Date.now()}`,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulated delay for a more natural conversation flow
    setTimeout(() => {
      const botResponse = {
        content: getResponse(input),
        isUser: false,
        id: `bot-${Date.now()}`,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800); // Random delay between 1.2-2s
  };

  const handleSuggestedQuestion = (question: string) => {
    if (isTyping) return;
    
    const userMessage = {
      content: question,
      isUser: true,
      id: `user-${Date.now()}`,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        content: getResponse(question),
        isUser: false,
        id: `bot-${Date.now()}`,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when messages change or typing state changes
  useEffect(() => {
    scrollToBottom(messagesContainerRef.current);
  }, [messages, isTyping]);

  // Focus the input field when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`
          w-14 h-14 rounded-full flex items-center justify-center 
          transition-all duration-300 shadow-chat-button
          ${isOpen ? 'bg-white text-finance-primary scale-90' : 'bg-finance-primary text-white scale-100 hover:scale-105'}
        `}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <div
        className={`
          absolute bottom-16 right-0 w-80 sm:w-96 h-[500px] max-h-[80vh]
          bg-white rounded-lg shadow-chat overflow-hidden flex flex-col
          transform origin-bottom-right transition-all duration-300
          ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'}
        `}
      >
        {/* Chat Header */}
        <div className="bg-finance-primary text-white p-4 flex items-center justify-between">
          <h3 className="font-medium">Financial Assistant</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleChat}
            className="text-white hover:bg-finance-accent hover:text-white h-8 w-8"
          >
            <X size={18} />
          </Button>
        </div>

        {/* Messages Container */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 bg-finance-muted/50"
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
            />
          ))}
          {isTyping && (
            <ChatMessage
              content=""
              isUser={false}
              isTyping={true}
            />
          )}
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && !isTyping && (
          <div className="p-3 bg-white border-t border-finance-border">
            <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.slice(0, 3).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-xs bg-finance-secondary text-finance-primary px-3 py-1.5 rounded-full hover:bg-finance-primary hover:text-white transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-finance-border flex items-center">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-finance-muted border-finance-border"
          />
          <Button
            onClick={handleSendMessage}
            disabled={input.trim() === '' || isTyping}
            className="ml-2 bg-finance-primary hover:bg-finance-accent text-white h-10 w-10 p-0 flex items-center justify-center"
            size="icon"
            aria-label="Send message"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
