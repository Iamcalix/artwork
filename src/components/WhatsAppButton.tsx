import React from 'react';
import { WhatsAppIcon } from './icons/Icons';
import { WHATSAPP_LINK } from '@/data/siteData';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  variant?: 'floating' | 'inline' | 'cta';
  text?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = 'Hello Doctor Pencil! I am interested in your artwork.',
  className = '',
  variant = 'floating',
  text = 'Chat on WhatsApp',
}) => {
  const encodedMessage = encodeURIComponent(message);
  const link = `${WHATSAPP_LINK}?text=${encodedMessage}`;

  if (variant === 'floating') {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${className}`}
        aria-label="Contact via WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </a>
    );
  }

  if (variant === 'cta') {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}
      >
        <WhatsAppIcon size={24} />
        <span>{text}</span>
      </a>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 ${className}`}
    >
      <WhatsAppIcon size={18} />
      <span>{text}</span>
    </a>
  );
};

export default WhatsAppButton;
