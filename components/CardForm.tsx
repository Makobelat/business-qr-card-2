import React from 'react';
import type { BusinessCardData } from '../types';

interface CardFormProps {
  data: BusinessCardData;
  setData: React.Dispatch<React.SetStateAction<BusinessCardData>>;
  onGenerateCard: () => void;
  onSave: () => void;
  error: string | null;
}

const CardForm: React.FC<CardFormProps> = ({
  data,
  setData,
  onGenerateCard,
  onSave,
  error,
}) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const canGenerateCard = !!(data.name && data.email);

  return (
    <div className="flex flex-col justify-start bg-gray-800/50 p-6 sm:p-8 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-2">Business Card Details</h2>
      <p className="text-gray-400 mb-6">Fill in the fields below to create your business card and QR code.</p>
      
      <form className="space-y-4">
        {/* Input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Full Name" name="name" value={data.name} onChange={handleChange} placeholder="e.g., Jane Doe" />
            <InputField label="Title" name="title" value={data.title} onChange={handleChange} placeholder="e.g., CEO" />
            <InputField label="Company" name="company" value={data.company} onChange={handleChange} placeholder="e.g., Acme Inc." />
            <InputField label="Phone Number" name="phone" value={data.phone} onChange={handleChange} placeholder="e.g., (123) 456-7890" />
            <InputField label="Email" name="email" type="email" value={data.email} onChange={handleChange} placeholder="e.g., jane.doe@acme.com" />
            <InputField label="Website" name="website" type="url" value={data.website} onChange={handleChange} placeholder="e.g., https://acme.com" />
        </div>
        
        {/* Summary Textarea */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-300">
            Professional Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            rows={3}
            value={data.summary}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="A brief summary about your professional background."
          />
        </div>
        
        {error && <p className="text-sm text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={onGenerateCard}
            disabled={!canGenerateCard}
            className="w-full px-4 py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-600 disabled:bg-green-800 disabled:cursor-not-allowed"
          >
            Generate QR Code
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!canGenerateCard}
            className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600 disabled:bg-blue-800 disabled:cursor-not-allowed"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

// InputField Component
interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, placeholder, type = "text", disabled }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 mt-1 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={placeholder}
            disabled={disabled}
        />
    </div>
);

export default CardForm;