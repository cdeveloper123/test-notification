import React, { useEffect } from 'react';
import { ui, uiConfig } from '../config/firebaseUiConfig';
import '../custom-firebase-ui.css'; 

const SignIn: React.FC = () => {
  useEffect(() => {
    ui.start('#firebaseui-auth-container', uiConfig);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <div className="p-10 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Sign In</h1>
        <div 
          id="firebaseui-auth-container" 
          className="mb-6 custom-firebase-ui rounded-md overflow-hidden"
          style={{ border: '1px solid #e2e8f0' }} 
        ></div>
        <p className="text-sm text-center text-gray-600">
          By continuing, you accept our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default SignIn;