import React from 'react';
import type { BusinessCardData, User } from '../types';

interface CardFormProps {
  data: BusinessCardData;
  isQrGenerated: boolean;
  user: User | null;
  onDataChange: (field: keyof BusinessCardData, value: string) => void;
  onGenerateQrCode: () => void;
  onDownload: () => void;
  onReset: () => void;
  onSaveCard: () => void;
}

const InputField: React.FC<{ id: keyof BusinessCardData, label: string, value: string, placeholder: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, icon?: React.ReactNode }> = ({ id, label, value, placeholder, onChange, type = 'text', icon }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <div className="relative">
            {icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>}
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${icon ? 'pl-10' : ''}`}
            />
        </div>
    </div>
);

const CardForm: React.FC<CardFormProps> = ({
  data,
  isQrGenerated,
  user,
  onDataChange,
  onGenerateQrCode,
  onDownload,
  onReset,
  onSaveCard
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onDataChange(e.target.name as keyof BusinessCardData, e.target.value);
  };
  
  const canGenerateQr = data.name && data.email;

  return (
    <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-white mb-6">Enter Your Details</h2>
      <form className="space-y-6">
        <InputField id="name" label="Full Name" value={data.name} onChange={handleChange} placeholder="e.g., Jane Doe" icon={<IconUser />} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField id="title" label="Title / Position" value={data.title} onChange={handleChange} placeholder="e.g., Product Manager" icon={<IconBriefcase />} />
          <InputField id="company" label="Company" value={data.company} onChange={handleChange} placeholder="e.g., Innovate Corp." icon={<IconBuilding />} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField id="phone" label="Phone" value={data.phone} onChange={handleChange} placeholder="(123) 456-7890" type="tel" icon={<IconPhone />} />
            <InputField id="email" label="Email Address" value={data.email} onChange={handleChange} placeholder="jane.doe@example.com" type="email" icon={<IconEmail />} />
        </div>
        <InputField id="website" label="Website / LinkedIn" value={data.website} onChange={handleChange} placeholder="https://example.com" type="url" icon={<IconLink />} />
        
        <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-300 mb-1">Professional Summary</label>
            <textarea
                id="summary"
                name="summary"
                rows={3}
                value={data.summary}
                onChange={handleChange}
                placeholder="A brief summary about your professional role..."
                className="block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>
        
        <div className="border-t border-gray-700 pt-6 space-y-3">
             <button
                type="button"
                onClick={onGenerateQrCode}
                disabled={!canGenerateQr}
                className="w-full flex justify-center items-center gap-2 rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                {isQrGenerated ? <IconCheck /> : <IconQr />}
                {isQrGenerated ? 'Regenerate QR Code' : 'Generate QR Code'}
            </button>
            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={onDownload}
                    disabled={!isQrGenerated}
                    className="w-full flex justify-center items-center gap-2 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    <IconDownload /> Download
                </button>
                 <button
                    type="button"
                    onClick={onSaveCard}
                    disabled={!user || !canGenerateQr}
                    title={!user ? "Log in to save your card" : ""}
                    className="w-full flex justify-center items-center gap-2 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    <IconSave /> Save Card
                </button>
            </div>
             <button
                type="button"
                onClick={onReset}
                className="w-full flex justify-center items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-300 shadow-sm hover:bg-gray-600"
            >
                <IconReset /> Start Over
            </button>
        </div>
      </form>
    </div>
  );
};

const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const IconBriefcase = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 0h12v2H4V5zm10 6a2 2 0 012 2v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3a2 2 0 012-2h10z" clipRule="evenodd" /></svg>;
const IconBuilding = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2H5a1 1 0 110-2V4zm3 1h2v1H7V5zm0 3h2v1H7V8zm0 3h2v1H7v-1zm4-3h2v1h-2V8zm0 3h2v1h-2v-1z" clipRule="evenodd" /></svg>;
const IconPhone = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>;
const IconEmail = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>;
const IconLink = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0m-4.242 6.828a2 2 0 01-2.828 0l-3-3a2 2 0 112.828-2.828l3 3a2 2 0 010 2.828zM3 8.293l3 3V13a1 1 0 102 0V9.293l-3-3a1 1 0 00-1.414 1.414zM11.707 11l-3-3a1 1 0 00-1.414 1.414l3 3V13a1 1 0 102 0V11z" clipRule="evenodd" /></svg>;
const IconQr = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 012-2h2v2h-2a2 2 0 01-2-2zM11 13a2 2 0 002 2h2v-2h-2a2 2 0 00-2 2z"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const IconDownload = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const IconReset = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm1 14a1 1 0 011-1h5a1 1 0 110 2H5a1 1 0 01-1-1zm11.899-8.899a7.003 7.003 0 01-2.566 11.601 1 1 0 11-.666-1.885A5.003 5.003 0 0013 10.001H9a1 1 0 110-2h5a1 1 0 011 1v5.001a1 1 0 11-2 0v-2.101z" clipRule="evenodd" /></svg>;
const IconSave = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7.5 2.5a.5.5 0 00-1 0V5a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V2.5a.5.5 0 00-1 0V4h-2V2.5a.5.5 0 00-1 0V4h-2V2.5a.5.5 0 00-1 0V4h-2V2.5a.5.5 0 00-1 0V4H8v-.5a.5.5 0 00-.5-.5zM3 6a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2H3zm2 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" /></svg>;

export default CardForm;