import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const VideoPlaceholder: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow pulse effect
  const pulse = Math.sin(frame / 20) * 0.5 + 0.5; // 0 to 1
  const opacity = interpolate(pulse, [0, 1], [0.4, 0.8]);
  const scale = interpolate(pulse, [0, 1], [0.98, 1.02]);

  return (
    <AbsoluteFill 
      style={{ 
        backgroundColor: '#0a101d', // Slightly lighter than the page bg for contrast
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid rgba(136,153,180,0.15)',
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: 'inherit' // Inherits from Next.js global layout
      }}
    >
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at center, rgba(240,180,41,0.1) 0%, transparent 70%)`,
          opacity,
        }} 
      />
      
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          zIndex: 1
        }}
      >
        <div 
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(240,180,41,0.15)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(240,180,41,0.4)',
            transform: `scale(${scale})`
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#f0b429" style={{ marginLeft: '4px' }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div 
            style={{
              color: '#e8edf5',
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '0.02em',
              marginBottom: '4px'
            }}
          >
            System Overview
          </div>
          <div 
            style={{
              color: '#f0b429',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}
          >
            Video Under Construction
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
