import React from 'react';
import { Play, Pause, RotateCcw, Sun, Moon, Settings, Maximize } from 'lucide-react';
import { translations } from '../i18n/translations';

interface ControlsProps {
  t: typeof translations['en'];
  isPaused: boolean;
  togglePause: () => void;
  resetText: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  openSettings: () => void;
  toggleFullscreen: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  t,
  isPaused,
  togglePause,
  resetText,
  isDarkMode,
  toggleDarkMode,
  openSettings,
  toggleFullscreen,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <button
        onClick={togglePause}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={isPaused ? t.buttons.play : t.buttons.pause}
      >
        {isPaused ? <Play size={24} /> : <Pause size={24} />}
      </button>
      <button
        onClick={resetText}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={t.buttons.reset}
      >
        <RotateCcw size={24} />
      </button>
      <button
        onClick={openSettings}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={t.buttons.settings}
      >
        <Settings size={24} />
      </button>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={isDarkMode ? t.buttons.lightMode : t.buttons.darkMode}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
      <button
        onClick={toggleFullscreen}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={t.buttons.fullscreen}
      >
        <Maximize size={24} />
      </button>
    </div>
  );
};