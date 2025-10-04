import React from 'react';
import type { User, BusinessCardData } from '../types';

interface SidebarProps {
  user: User;
  onLogout: () => void;
  savedCards: BusinessCardData[];
  onSelectCard: (card: BusinessCardData) => void;
  onNewCard: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, savedCards, onSelectCard, onNewCard }) => {
  return (
    <aside className="w-64 bg-gray-800 p-4 flex-col h-full border-r border-gray-700 hidden md:flex">
      <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
              {user.email.charAt(0).toUpperCase()}
          </div>
          <div>
              <p className="font-semibold text-white truncate">{user.email}</p>
              <button onClick={onLogout} className="text-sm text-indigo-400 hover:underline">
                  Log Out
              </button>
          </div>
      </div>

      <button 
        onClick={onNewCard}
        className="w-full mb-4 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-600 flex items-center justify-center gap-2"
      >
        <PlusIcon /> New Card
      </button>

      <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2">Saved Cards</h3>
      <div className="flex-1 overflow-y-auto -mr-2 pr-2">
        {savedCards.length > 0 ? (
          <ul className="space-y-2">
            {savedCards.map((card) => (
              <li key={card.id}>
                <button 
                  onClick={() => onSelectCard(card)}
                  className="w-full text-left p-2 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
                >
                  <p className="font-semibold text-sm text-white truncate">{card.name}</p>
                  <p className="text-xs text-gray-400 truncate">{card.title} at {card.company}</p>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-sm text-gray-500 mt-4 border border-dashed border-gray-600 rounded-md p-4">
            <p>Your saved cards will appear here.</p>
          </div>
        )}
      </div>
    </aside>
  );
};

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
)

export default Sidebar;