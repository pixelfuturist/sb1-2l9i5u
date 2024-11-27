import React, { useRef } from 'react';
import { DeviceMockup } from './DeviceMockup';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';

export const ScreenshotGenerator: React.FC = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const tabletRef = useRef<HTMLDivElement>(null);

  const captureScreenshot = async (ref: React.RefObject<HTMLDivElement>, deviceType: string) => {
    if (!ref.current) return;

    try {
      const canvas = await html2canvas(ref.current, {
        scale: 2,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `textflow-${deviceType}-screenshot.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            App Screenshots
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate screenshots for Google Play Console
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Phone Screenshot */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Phone Screenshot
            </h2>
            <div className="flex justify-center" ref={phoneRef}>
              <DeviceMockup type="phone">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                  {/* Your app content here */}
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="mb-8">
                      <AppLogo size="large" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">TextFlow</h3>
                    <p className="text-gray-600 text-center">
                      Create dynamic scrolling text displays with ease
                    </p>
                  </div>
                </div>
              </DeviceMockup>
            </div>
            <button
              onClick={() => captureScreenshot(phoneRef, 'phone')}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Phone Screenshot
            </button>
          </div>

          {/* Tablet Screenshot */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Tablet Screenshot
            </h2>
            <div className="flex justify-center" ref={tabletRef}>
              <DeviceMockup type="tablet">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
                  {/* Your app content here */}
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="mb-8">
                      <AppLogo size="large" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">TextFlow</h3>
                    <p className="text-xl text-gray-600 text-center max-w-md">
                      Create beautiful, dynamic scrolling text displays for your digital signage needs
                    </p>
                  </div>
                </div>
              </DeviceMockup>
            </div>
            <button
              onClick={() => captureScreenshot(tabletRef, 'tablet')}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Tablet Screenshot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};