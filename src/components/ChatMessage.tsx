
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface ChatMessageProps {
  content: string;
  isUser: boolean;
  isTyping?: boolean;
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  isUser,
  isTyping = false,
  className,
}) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.classList.add('animate-fade-in');
    }
  }, []);

  return (
    <div
      ref={messageRef}
      className={cn(
        'flex w-full mb-4 opacity-0',
        isUser ? 'justify-end' : 'justify-start',
        className
      )}
    >
      <div
        className={cn(
          'max-w-[80%] px-4 py-3 rounded-2xl',
          isUser
            ? 'bg-finance-primary text-white rounded-br-sm'
            : 'bg-finance-secondary text-gray-800 rounded-bl-sm',
          'shadow-sm'
        )}
      >
        {isTyping ? (
          <div className="typing-indicator px-2">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
