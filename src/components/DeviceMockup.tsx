import React from 'react';

interface DeviceMockupProps {
  children: React.ReactNode;
  type?: 'phone' | 'tablet';
  color?: 'black' | 'white';
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  children,
  type = 'phone',
  color = 'black'
}) => {
  const baseClasses = `
    relative rounded-[3rem] ${color === 'black' ? 'bg-gray-900' : 'bg-gray-100'}
    ${type === 'phone' ? 'w-[300px]' : 'w-[512px]'}
    overflow-hidden shadow-2xl
  `;

  const notchClasses = `
    absolute top-0 left-1/2 -translate-x-1/2
    ${type === 'phone' ? 'w-32 h-7' : 'w-40 h-8'}
    ${color === 'black' ? 'bg-black' : 'bg-white'}
    rounded-b-3xl z-20
  `;

  const screenClasses = `
    relative w-full ${type === 'phone' ? 'h-[600px]' : 'h-[700px]'}
    overflow-hidden bg-white
  `;

  return (
    <div className={baseClasses}>
      <div className={notchClasses} />
      <div className={screenClasses}>
        {children}
      </div>
    </div>
  );
};