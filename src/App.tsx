import React, { useState, useEffect } from 'react';
import { MarqueeText } from './components/MarqueeText';
import { Controls } from './components/Controls';
import { Settings } from './components/Settings';
import { translations } from './i18n/translations';

type Language = 'en' | 'fr';

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [settings, setSettings] = useState({
    text: 'Welcome to TextFlow! 👋 Create dynamic scrolling text displays with ease ✨',
    speed: 2,
    fontSize: '48px',
    fontFamily: 'Arial',
    textColor: isDarkMode ? '#FFFFFF' : '#000000',
    direction: 'horizontal' as const,
    onHover: true,
    minimalMode: false,
    fullscreen: false,
  });

  const [isPaused, setIsPaused] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setSettings(prev => ({ ...prev, fullscreen: false }));
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleSettingsChange = (newSettings: Partial<typeof settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetText = () => {
    setSettings((prev) => ({
      ...prev,
      text: language === 'fr' 
        ? 'Bienvenue sur TextFlow! 👋 Créez des affichages de texte défilant facilement ✨'
        : 'Welcome to TextFlow! 👋 Create dynamic scrolling text displays with ease ✨',
    }));
  };

  if (settings.fullscreen) {
    return (
      <div 
        className={`fixed inset-0 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}
        onClick={() => document.exitFullscreen()}
      >
        <div className="w-full h-full flex items-center justify-center">
          <MarqueeText
            text={settings.text}
            speed={settings.speed}
            fontSize={settings.fontSize}
            fontFamily={settings.fontFamily}
            textColor={settings.textColor}
            direction={settings.direction}
            isPaused={isPaused}
            onHover={settings.onHover}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          {!settings.minimalMode && (
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">{t.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t.subtitle}
              </p>
            </header>
          )}

          <div className={`${settings.minimalMode ? '' : 'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8'}`}>
            <div
              className={`${settings.minimalMode ? 'h-screen' : 'h-[200px]'} flex items-center justify-center overflow-hidden ${
                settings.direction === 'vertical' ? 'flex-col' : ''
              }`}
            >
              <MarqueeText
                text={settings.text}
                speed={settings.speed}
                fontSize={settings.fontSize}
                fontFamily={settings.fontFamily}
                textColor={settings.textColor}
                direction={settings.direction}
                isPaused={isPaused}
                onHover={settings.onHover}
              />
            </div>
          </div>

          <Controls
            t={t}
            isPaused={isPaused}
            togglePause={() => setIsPaused(!isPaused)}
            resetText={resetText}
            isDarkMode={isDarkMode}
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            openSettings={() => setIsSettingsOpen(true)}
            toggleFullscreen={async () => {
              try {
                await document.documentElement.requestFullscreen();
                setSettings(prev => ({ ...prev, fullscreen: true }));
              } catch (err) {
                console.error('Error attempting to enable fullscreen:', err);
              }
            }}
          />

          <Settings
            t={t}
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            settings={settings}
            onSettingsChange={handleSettingsChange}
            language={language}
            onLanguageChange={setLanguage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;