import React from 'react';
import { AppLogo } from './AppLogo';
import { Download } from 'lucide-react';
import { downloadLogoAsJPEG } from '../utils/logoExport';

export const LogoShowcase: React.FC = () => {
  const handleDownload = (size: '192' | '512' | 'feature') => {
    downloadLogoAsJPEG(size);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            App Logo Design
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Professional logo design for Google Play Console
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Logo Grid */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center gap-4">
              <AppLogo size="small" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Small</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <AppLogo size="medium" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <AppLogo size="large" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Large</span>
            </div>
          </div>

          {/* Logo on Different Backgrounds */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Logo on Different Backgrounds
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-8 rounded-xl flex items-center justify-center">
                <AppLogo size="large" />
              </div>
              <div className="bg-blue-600 p-8 rounded-xl flex items-center justify-center">
                <AppLogo size="large" />
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Download for Google Play Console
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Download the logo in JPEG format for Google Play Console requirements
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleDownload('192')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  192x192 JPEG
                </button>
                <button
                  onClick={() => handleDownload('512')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  512x512 JPEG
                </button>
                <button
                  onClick={() => handleDownload('feature')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  1024x500 Feature Graphic
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};