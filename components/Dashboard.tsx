import React, { useState } from 'react';
import Sidebar from './Sidebar';
import CardForm from './CardForm';
import CardPreview from './CardPreview';
import type { User, BusinessCardData } from '../types';

const initialCardData: BusinessCardData = {
  id: 'new',
  name: '',
  title: '',
  company: '',
  phone: '',
  email: '',
  website: '',
  summary: '',
};

const Dashboard: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  const [cardData, setCardData] = useState<BusinessCardData>(initialCardData);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedCards, setSavedCards] = useState<BusinessCardData[]>([]);

  const generateVCard = (data: BusinessCardData): string => {
    return `BEGIN:VCARD
VERSION:3.0
N:${data.name}
FN:${data.name}
ORG:${data.company}
TITLE:${data.title}
TEL;TYPE=WORK,VOICE:${data.phone}
EMAIL:${data.email}
URL:${data.website}
NOTE:${data.summary}
END:VCARD`;
  };
  
  const generateQrCode = (data: BusinessCardData) => {
      const vCard = generateVCard(data);
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(vCard)}`;
      setQrCodeUrl(url);
  };

  const handleSaveCard = () => {
    if (!cardData.name || !cardData.email) {
      setError("Name and Email are required to save a card.");
      return;
    }
    const newCard = { ...cardData, id: new Date().toISOString() };
    setSavedCards([newCard, ...savedCards.filter(c => c.id !== newCard.id)]);
    alert("Profile saved!");
  }
  
  const handleSelectCard = (card: BusinessCardData) => {
    setCardData(card);
    generateQrCode(card);
  }
  
  const handleNewCard = () => {
    setCardData(initialCardData);
    setQrCodeUrl(null);
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar 
        user={user} 
        onLogout={onLogout} 
        savedCards={savedCards}
        onSelectCard={handleSelectCard}
        onNewCard={handleNewCard}
      />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-y-auto">
        <CardForm
          data={cardData}
          setData={setCardData}
          onGenerateCard={() => generateQrCode(cardData)}
          onSave={handleSaveCard}
          error={error}
        />
        <CardPreview data={cardData} qrCodeUrl={qrCodeUrl} />
      </main>
    </div>
  );
};

export default Dashboard;