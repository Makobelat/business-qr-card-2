import React, { useState, useCallback } from 'react';
import type { BusinessCardData, User } from './types';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // In a real app, this would be fetched from a database.
  const [userCards, setUserCards] = useState<BusinessCardData[]>([]);

  const handleLogin = useCallback((email: string) => {
    // Simulate finding a user and logging them in
    setCurrentUser({ email });
    // In a real app, you would fetch user-specific cards here.
    setUserCards([]); 
  }, []);
  
  const handleSignup = useCallback((email: string) => {
    // Simulate creating a new user and logging them in
    setCurrentUser({ email });
    setUserCards([]);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setUserCards([]);
  }, []);
  
  const handleSaveCard = useCallback((cardData: BusinessCardData) => {
    // Simulate saving a card to the "database"
    setUserCards(prevCards => {
        const newCard = { ...cardData, id: Date.now().toString() };
        return [...prevCards, newCard];
    });
    alert('Business card saved!');
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-200">
      {currentUser ? (
        <Dashboard 
          user={currentUser} 
          savedCards={userCards}
          onLogout={handleLogout} 
          onSaveCard={handleSaveCard}
        />
      ) : (
        <AuthPage onLogin={handleLogin} onSignup={handleSignup} />
      )}
    </div>
  );
}

export default App;