import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Youtube, Instagram, Mail } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="bg-[#0f0f0f] border-t border-[#272727] py-12">
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-8 mb-8">
          <a
            href="https://twitter.com/ytreactor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://youtube.com/@ytreactor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Youtube size={24} />
          </a>
          <a
            href="https://instagram.com/ytreactor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://github.com/ytreactor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="mailto:hello@ytreactor.com"
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Mail size={24} />
          </a>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Made with ❤️ for content creators everywhere
          </p>
          <nav className="flex items-center justify-center gap-6 text-sm mb-4">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </nav>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} YTReactor. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);