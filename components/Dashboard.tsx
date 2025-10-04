import React, { useState, useCallback } from 'react';
import type { BusinessCardData, User } from '../types';
import CardForm from './CardForm';
import CardPreview from './CardPreview';

declare var QRious: any;

interface DashboardProps {
  user: User;
  savedCards: BusinessCardData[];
  onLogout: () => void;
  onSaveCard: (cardData: BusinessCardData) => void;
}

const initialData: BusinessCardData = {
  name: '',
  title: '',
  company: '',
  phone: '',
  email: '',
  website: '',
  summary: '',
};

const Dashboard: React.FC<DashboardProps> = ({ user, savedCards, onLogout, onSaveCard }) => {
  const [data, setData] = useState<BusinessCardData>(initialData);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const handleDataChange = useCallback((field: keyof BusinessCardData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleGenerateQrCode = useCallback(() => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
N:${data.name.split(' ').slice(-1)[0]};${data.name.split(' ').slice(0, -1).join(' ')}
FN:${data.name}
ORG:${data.company}
TITLE:${data.title}
TEL;TYPE=WORK,VOICE:${data.phone}
EMAIL:${data.email}
URL:${data.website}
NOTE:${data.summary}
END:VCARD`;

    if (typeof QRious !== 'undefined') {
        const qr = new QRious({
            value: vCard,
            size: 512,
        });
        setQrCodeUrl(qr.toDataURL());
    } else {
        alert('QR code library is not loaded.');
    }
  }, [data]);
  
  const handleDownload = useCallback(() => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `${data.name.replace(/\s+/g, '_')}_QR_Card.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [qrCodeUrl, data.name]);

  const handleReset = useCallback(() => {
    setData(initialData);
    setQrCodeUrl(null);
  }, []);
  
  const handleSave = useCallback(() => {
      onSaveCard(data);
      handleReset();
  }, [data, onSaveCard, handleReset]);
  
  const loadCard = (card: BusinessCardData) => {
      setData(card);
      setQrCodeUrl(null);
  }

  return (
    <>
      <header className="bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.25 2a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-5zM9.25 2a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-.5zM6.25 2a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-.5zM3.5 4.75a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v2.5a.25.25 0 01-.25.25h-2.5a.25.25 0 01-.25-.25v-2.5a.25.25 0 01.25-.25h1.5v-1a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25v1h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25-.25h-2.5a.25.25 0 01-.25-.25v-.5zM3.5 8.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25v10a.25.25 0 01-.25.25h-2.5a.25.25 0 01-.25-.25v-10zM7.25 6.5a.25.25 0 00-.25.25v12a.25.25 0 00.25.25h2.5a.25.25 0 00.25-.25v-12a.25.25 0 00-.25-.25h-2.5zM11 6.75a.25.25 0 01.25-.25h5a.25.25 0 01.25.25v12a.25.25 0 01-.25.25h-5a.25.25 0 01-.25-.25v-12z" clipRule="evenodd" />
            </svg>
             <h1 className="text-2xl font-bold tracking-tight text-white">QR Business Card Generator</h1>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 hidden sm:block">Welcome, {user.email}</span>
              <button onClick={onLogout} className="text-sm font-semibold text-gray-300 hover:text-white">Logout</button>
           </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8">
                <CardForm 
                    data={data}
                    onDataChange={handleDataChange} 
                    onGenerateQrCode={handleGenerateQrCode}
                    onDownload={handleDownload}
                    onReset={handleReset}
                    isQrGenerated={!!qrCodeUrl}
                    user={user}
                    onSaveCard={handleSave}
                />
                {savedCards.length > 0 && (
                    <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold text-white mb-4">My Cards</h2>
                        <ul className="space-y-3">
                            {savedCards.map(card => (
                                <li key={card.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-white">{card.name}</p>
                                        <p className="text-sm text-gray-400">{card.title} at {card.company}</p>
                                    </div>
                                    <button onClick={() => loadCard(card)} className="px-3 py-1 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500">
                                        Load
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
          <CardPreview data={data} qrCodeUrl={qrCodeUrl} />
        </div>
      </main>
    </>
  );
};

export default Dashboard;