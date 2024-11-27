import React from 'react';

interface AppLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: () => void;
}

const sizeMap = {
  small: {
    wrapper: 'w-8 h-8',
    shadow: 'shadow-md',
  },
  medium: {
    wrapper: 'w-12 h-12',
    shadow: 'shadow-lg',
  },
  large: {
    wrapper: 'w-16 h-16',
    shadow: 'shadow-xl',
  },
};

export const AppLogo: React.FC<AppLogoProps> = ({ 
  size = 'medium', 
  className = '',
  onClick 
}) => {
  const dimensions = sizeMap[size];

  return (
    <div 
      onClick={onClick}
      className={`
        relative rounded-2xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600
        flex items-center justify-center ${dimensions.shadow}
        transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25
        ${dimensions.wrapper}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-white/20 rounded-2xl"></div>
      <div className="absolute inset-[2px] bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full blur-[1px]"></div>
      <div className="font-bold text-white text-lg tracking-wider" style={{ textShadow: '0 0 8px rgba(255,255,255,0.5)' }}>T</div>
    </div>
  );
};