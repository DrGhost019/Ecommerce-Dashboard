import React from 'react';

const IncreaseSalesBanner = () => {
  return (
    <div 
      className="w-full h-[200px] md:h-[219px] rounded-3xl overflow-hidden relative flex flex-col justify-between p-4 md:p-6 animate-gradient-flow"
      style={{
        background: 'linear-gradient(135deg, #1A71F6 0%, #6B46C1 25%, #9333EA 50%, #1A71F6 75%, #6B46C1 100%)',
        backgroundSize: '300% 300%',
      }}
    >
      <div className="absolute inset-0 opacity-30 animate-pulse-slow">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 animate-shimmer"></div>
      </div>

      <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 opacity-20 animate-float">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 0L0 100H100V0Z" fill="white" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-20 md:w-24 h-20 md:h-24 opacity-10 animate-float-reverse">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100L100 0H0V100Z" fill="white" />
        </svg>
      </div>

      <div className="absolute left-0 top-1/4 w-1 h-12 md:h-16 bg-white/30 rounded-full animate-pulse"></div>

      <div className="relative z-10 flex flex-col" style={{ gap: '8px' }}>
        <h2 className="font-jakarta font-bold text-[20px] md:text-[24px] text-white">
          Increase your sales
        </h2>
        <p className="font-jakarta text-[11px] md:text-[13px] text-white/90 leading-relaxed line-clamp-3">
          Discover the Proven Methods to Skyrocket Your Sales! Unleash the Potential of Your Business and Achieve Remarkable Growth. Whether you're a seasoned entrepreneur or just starting out
        </p>
      </div>

      <button 
        className="relative z-10 w-[120px] md:w-[127px] h-[38px] md:h-[40px] rounded-xl font-jakarta font-bold text-[12px] md:text-[13px] leading-[150%] text-center transition hover:bg-gray-50 hover:scale-105"
        style={{
          padding: '10px 20px',
          background: '#FFFFFF',
          border: '2px solid #1A71F6',
          color: '#1A71F6',
        }}
      >
        Learn More
      </button>

      <div className="absolute bottom-4 right-4 md:right-6 opacity-30 animate-bounce-slow">
        <svg width="60" height="50" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50L20 35L35 40L55 20L75 5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="75" cy="5" r="4" fill="white" />
        </svg>
      </div>
    </div>
  );
};

export default IncreaseSalesBanner;