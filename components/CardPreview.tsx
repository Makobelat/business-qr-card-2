import React from 'react';
import type { BusinessCardData } from '../types';

interface CardPreviewProps {
  data: BusinessCardData;
  qrCodeUrl: string | null;
}

const CardPreview: React.FC<CardPreviewProps> = ({ data, qrCodeUrl }) => {
  return (
    <div className="flex flex-col items-center justify-start bg-transparent p-6 sm:p-8 h-full">
      <h2 className="text-2xl font-bold text-white mb-6">Live Preview</h2>
      
      <div className="w-full max-w-sm aspect-[1.7] bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300">
        <div>
            <h3 className="text-2xl font-bold text-white truncate">{data.name || 'Your Name'}</h3>
            <p className="text-gray-300 font-medium">{data.title || 'Your Title'}</p>
            <p className="text-gray-400 text-sm">{data.company || 'Your Company'}</p>
        </div>
        <div className="border-t border-gray-700 mt-4 pt-4">
            <p className="text-gray-400 text-xs italic">
                {data.summary || 'Your professional summary will appear here...'}
            </p>
        </div>
      </div>
      
      <div className="mt-8 w-full max-w-sm aspect-square bg-white rounded-lg shadow-lg flex items-center justify-center p-4 transition-all duration-300">
        {qrCodeUrl ? (
          <img src={qrCodeUrl} alt="Generated QR Code" className="w-full h-full object-contain rounded-md" />
        ) : (
          <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547a3.374 3.374 0 00-4.774 0l-.548-.547z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16M7 17v3m10-3v3" />
            </svg>
            <p className="font-semibold">QR Code will appear here</p>
            <p className="text-sm">Fill in your details and click "Generate"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPreview;