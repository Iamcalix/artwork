import React from 'react';
import {
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  MapPinIcon,
  PhoneIcon,
} from './icons/Icons';
import { WHATSAPP_LINK, WHATSAPP_NUMBER, SHIPPING_INFO, FOOTER_LINKS } from '@/data/siteData';

interface FooterProps {
  onNavigate: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: WhatsAppIcon, href: WHATSAPP_LINK, label: 'WhatsApp' },
    { icon: InstagramIcon, href: '#', label: 'Instagram' },
    { icon: FacebookIcon, href: '#', label: 'Facebook' },
    { icon: TwitterIcon, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-xl font-bold">DP</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">Doctor Pencil</h3>
                <p className="text-gray-400 text-sm">Contemporary Art</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming spaces with original acrylic paintings that capture the 
              vibrant spirit of African artistry.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Gallery Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Gallery</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.gallery.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate('gallery')}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate('commissions')}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Shipping */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Contact & Shipping</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="text-amber-500 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-gray-400 text-sm">Tanzania, East Africa</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PhoneIcon className="text-amber-500 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-white font-medium">WhatsApp</p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 text-sm"
                  >
                    {WHATSAPP_NUMBER}
                  </a>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-800">
                <p className="text-white font-medium mb-2">Shipping</p>
                <p className="text-gray-400 text-sm mb-2">{SHIPPING_INFO.local}</p>
                <p className="text-gray-400 text-sm">{SHIPPING_INFO.international}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Doctor Pencil. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
