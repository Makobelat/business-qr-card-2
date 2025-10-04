import React, { useState } from 'react';

interface AuthPageProps {
  onLogin: (email: string) => void;
  onSignup: (email:string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email);
    } else {
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      onSignup(email);
    }
  };

  const handleGoogleSignup = () => {
    // In a real app, this would trigger the Google OAuth flow.
    // Here, we'll simulate a successful signup.
    onSignup('user@google.com');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.25 2a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-5zM9.25 2a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-.5zM6.25 2a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-.5zM3.5 4.75a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v2.5a.25.25 0 01-.25.25h-2.5a.25.25 0 01-.25-.25v-2.5a.25.25 0 01.25-.25h1.5v-1a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25v1h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25-.25h-2.5a.25.25 0 01-.25-.25v-.5zM3.5 8.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25v10a.25.25 0 01-.25.25h-2.5a.25.25 0 01-.25-.25v-10zM7.25 6.5a.25.25 0 00-.25.25v12a.25.25 0 00.25.25h2.5a.25.25 0 00.25-.25v-12a.25.25 0 00-.25-.25h-2.5zM11 6.75a.25.25 0 01.25-.25h5a.25.25 0 01.25.25v12a.25.25 0 01-.25.25h-5a.25.25 0 01-.25-.25v-12z" clipRule="evenodd" />
            </svg>
          <h1 className="text-2xl font-bold text-white mt-2">{isLogin ? 'Welcome Back!' : 'Create an Account'}</h1>
          <p className="text-sm text-gray-400">
            {isLogin ? 'Log in to access your saved cards.' : 'Sign up to start creating and saving.'}
          </p>
        </div>
        
        {!isLogin && (
            <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full flex justify-center items-center gap-2 px-4 py-2 font-semibold text-gray-800 bg-white rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
                <GoogleIcon />
                Sign up with Google
            </button>
        )}
        
        {!isLogin && (
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-800 text-gray-400">OR</span>
                </div>
            </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-600"
            >
              {isLogin ? 'Log In' : 'Sign Up with Email'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-indigo-400 hover:underline">
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};

const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 6.04C34.553 2.372 29.604 0 24 0C10.745 0 0 10.745 0 24s10.745 24 24 24s24-10.745 24-24c0-1.341-.128-2.64-.359-3.917z" />
        <path fill="#FF3D00" d="M6.306 14.691c-1.229 2.224-1.956 4.74-1.956 7.309c0 2.569.727 5.085 1.956 7.309L.39 34.69C-.471 31.55 0 27.9 0 24c0-3.9.471-7.55.39-10.69L6.306 14.691z" />
        <path fill="#4CAF50" d="M24 48c5.604 0 10.553-1.628 14.802-4.39l-5.51-4.8c-2.932 1.7-6.52 2.6-10.292 2.6c-4.404 0-8.528-1.5-11.84-4.13L1.19 36.897C5.443 44.372 13.7 48 24 48z" />
        <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-5.392 0-10.03-3.1-12.324-7.58l-5.736 4.699C10.702 42.857 16.89 48 24 48c5.604 0 10.553-1.628 14.802-4.39L44.912 29.8C43.38 27.24 42.34 23.84 42.06 20H43.611z" />
    </svg>
);

export default AuthPage;