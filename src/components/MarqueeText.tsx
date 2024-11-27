import React, { useEffect, useRef } from 'react';

interface MarqueeTextProps {
  text: string;
  speed: number;
  fontSize: string;
  fontFamily: string;
  textColor: string;
  direction: 'horizontal' | 'vertical';
  isPaused: boolean;
  onHover: boolean;
}

export const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  speed,
  fontSize,
  fontFamily,
  textColor,
  direction,
  isPaused,
  onHover,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || isPaused) return;

    const container = containerRef.current;
    const content = contentRef.current;
    let position = direction === 'horizontal' ? container.clientWidth : container.clientHeight;
    let animationFrameId: number;

    const animate = () => {
      position -= speed;
      
      if (direction === 'horizontal') {
        if (position <= -content.clientWidth) {
          position = container.clientWidth;
        }
        content.style.transform = `translateX(${position}px)`;
      } else {
        if (position <= -content.clientHeight) {
          position = container.clientHeight;
        }
        content.style.transform = `translateY(${position}px)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, direction, isPaused]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${direction === 'vertical' ? 'h-full' : 'w-full'}`}
    >
      <div
        ref={contentRef}
        className={`inline-block whitespace-nowrap transition-transform ${
          onHover ? 'hover:scale-105' : ''
        }`}
        style={{
          fontSize,
          fontFamily,
          color: textColor,
        }}
      >
        {text}
      </div>
    </div>
  );
};