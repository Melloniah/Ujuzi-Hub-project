import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignUpForm';

function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="login-page-container">
      <h1 className="text-2xl font-bold mb-4">Welcome to Ujuzi Hub</h1>

      {showLogin ? (
        <>
          <LoginForm />
          <p className="mt-4">
            Don’t have an account?{' '}
            <button onClick={toggleForm} className="text-blue-500 underline">
              Sign up here
            </button>
          </p>
        </>
      ) : (
        <>
          <SignupForm />
          <p className="mt-4">
            Already have an account?{' '}
            <button onClick={toggleForm} className="text-blue-500 underline">
              Log in here
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default LoginPage;
