// src/App.tsx
import React from 'react';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import NotificationComponent from './components/NotificationComponent';
import SignIn from './components/SignIn';
import { auth, firestore } from './config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';

const App: React.FC = () => {
  const { addNotification } = useNotification();
  const [user] = useAuthState(auth);

  const handleNotification = async (message: string) => {
    if (user) {
      const newNotification = {
        message,
        read: false,
        timestamp: new Date(),
        uid: user.uid
      };
      await addDoc(collection(firestore, 'notifications'), newNotification);
      addNotification(message);
    }
  };

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Notification System</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => handleNotification('Notification 1')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Button 1
        </button>
        <button
          onClick={() => handleNotification('Notification 2')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Button 2
        </button>
        <button
          onClick={() => handleNotification('Notification 3')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Button 3
        </button>
      </div>
      <NotificationComponent />
    </div>
  );
};

const Root: React.FC = () => (
  <NotificationProvider>
    <App />
  </NotificationProvider>
);

export default Root;
