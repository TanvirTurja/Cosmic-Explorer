import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                CosmicExplorer
              </span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Explore the wonders of our universe through real NASA data and imagery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/explorer" className="text-gray-400 hover:text-white transition-colors">Explorer</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">NASA API</a></li>
              <li><a href="#data" className="text-gray-400 hover:text-white transition-colors">Data Sources</a></li>
              <li><a href="https://science.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">NASA Science</a></li>
              <li><a href="https://github.com/nasa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">NASA on GitHub</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Data Usage</a></li>
              <li><a href="https://www.nasa.gov/about/highlights/HP_Copyright.html" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Attribution</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 CosmicExplorer. All rights reserved. This project uses NASA data and imagery, which are in the public domain.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            This is an unofficial project and is not affiliated with NASA.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
