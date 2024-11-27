import React from 'react';
import { X, Smile } from 'lucide-react';
import { translations } from '../i18n/translations';

interface SettingsProps {
  t: typeof translations['en'];
  isOpen: boolean;
  onClose: () => void;
  settings: {
    text: string;
    speed: number;
    fontSize: string;
    fontFamily: string;
    textColor: string;
    direction: 'horizontal' | 'vertical';
    onHover: boolean;
    minimalMode: boolean;
  };
  onSettingsChange: (settings: Partial<typeof settings>) => void;
  language: 'en' | 'fr';
  onLanguageChange: (language: 'en' | 'fr') => void;
}

export const Settings: React.FC<SettingsProps> = ({
  t,
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  language,
  onLanguageChange,
}) => {
  if (!isOpen) return null;

  const fontFamilies = [
    'Arial',
    'Times New Roman',
    'Helvetica',
    'Georgia',
    'Verdana',
    'system-ui',
  ];

  const commonEmojis = ['😊', '👋', '🎉', '❤️', '⭐', '🌟', '✨', '🔥', '💫', '📢'];

  const insertEmoji = (emoji: string) => {
    onSettingsChange({ text: settings.text + emoji });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t.settings.title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t.settings.language}</label>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as 'en' | 'fr')}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t.settings.text}</label>
            <div className="space-y-2">
              <textarea
                value={settings.text}
                onChange={(e) => onSettingsChange({ text: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                rows={3}
              />
              <div className="flex flex-wrap gap-2">
                {commonEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => insertEmoji(emoji)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.minimalMode}
                onChange={(e) => onSettingsChange({ minimalMode: e.target.checked })}
                className="mr-2"
                id="minimal-mode"
              />
              <label htmlFor="minimal-mode" className="text-sm font-medium">
                {t.settings.minimalMode}
              </label>
            </div>
          </div>

          {!settings.minimalMode && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">{t.settings.speed}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={settings.speed}
                  onChange={(e) => onSettingsChange({ speed: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t.settings.fontSize}</label>
                <select
                  value={settings.fontSize}
                  onChange={(e) => onSettingsChange({ fontSize: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                >
                  {['24px', '32px', '48px', '64px', '96px'].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t.settings.fontFamily}</label>
                <select
                  value={settings.fontFamily}
                  onChange={(e) => onSettingsChange({ fontFamily: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                >
                  {fontFamilies.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t.settings.textColor}</label>
                <input
                  type="color"
                  value={settings.textColor}
                  onChange={(e) => onSettingsChange({ textColor: e.target.value })}
                  className="w-full p-1 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t.settings.direction}</label>
                <select
                  value={settings.direction}
                  onChange={(e) =>
                    onSettingsChange({
                      direction: e.target.value as 'horizontal' | 'vertical',
                    })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="horizontal">{t.settings.horizontal}</option>
                  <option value="vertical">{t.settings.vertical}</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.onHover}
                  onChange={(e) => onSettingsChange({ onHover: e.target.checked })}
                  className="mr-2"
                  id="hover-effect"
                />
                <label htmlFor="hover-effect" className="text-sm font-medium">
                  {t.settings.hoverEffect}
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};