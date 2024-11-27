export const generateLogoSVG = (size: number, height?: number) => {
  const actualHeight = height || size;
  
  return `
    <svg width="${size}" height="${actualHeight}" viewBox="0 0 ${size} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#60A5FA" />
          <stop offset="50%" style="stop-color:#3B82F6" />
          <stop offset="100%" style="stop-color:#2563EB" />
        </linearGradient>
        
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="${size * 0.02}" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="over" />
        </filter>

        <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="${size * 0.01}" />
          <feOffset dx="0" dy="${size * 0.005}" />
          <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0" />
        </filter>
      </defs>

      <!-- Background -->
      <rect 
        width="${size}" 
        height="${actualHeight}" 
        rx="${Math.min(size, actualHeight) * 0.1}"
        fill="url(#bgGradient)"
      />

      <!-- Overlay gradient -->
      <rect 
        width="${size}" 
        height="${actualHeight}" 
        rx="${Math.min(size, actualHeight) * 0.1}"
        fill="url(#bgGradient)"
        opacity="0.1"
        filter="url(#innerShadow)"
      />

      <!-- Letter T -->
      <text
        x="50%"
        y="50%"
        dy="${size * 0.05}"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="white"
        font-family="system-ui, -apple-system, sans-serif"
        font-weight="700"
        font-size="${size * 0.5}"
        filter="url(#glow)"
        style="text-shadow: 0 0 ${size * 0.02}px rgba(255,255,255,0.8)"
      >T</text>

      <!-- Highlight -->
      <circle 
        cx="${size * 0.3}"
        cy="${actualHeight * 0.3}"
        r="${size * 0.05}"
        fill="white"
        opacity="0.2"
        filter="url(#glow)"
      />
    </svg>
  `;
};