// src/context/Provider.js
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

//   // Other global state placeholders
//   const [services, setServices] = useState([]);
//   const [orders, setOrders] = useState([]);

//   // Signup function
//   const signupUser = async ({ username, email, password, phone_number }) => {
//     try {
//       const res = await fetch('/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ username, email, password, phone_number }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setUser(data);
//         return { success: true, data };
//       } else {
//         setError(data.error || 'Signup failed.');
//         return { success: false, error: data.error };
//       }
//     } catch (err) {
//       console.error('Signup error:', err);
//       setError('Server error.');
//       return { success: false, error: 'Server error.' };
//     }
//   };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        // error,
        // setError,
        // signupUser,
        // services,
        // setServices,
        // orders,
        // setOrders,
        // You can keep adding shared state/methods here
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access context
export const useTheContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useTheContext must be used within a Provider');
  return context;
};
