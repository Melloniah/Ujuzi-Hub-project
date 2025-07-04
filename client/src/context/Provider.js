import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AppContext = createContext();

// Context Provider Component
export const Provider = ({ children }) => {
  // Initialize user from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [error, setError] = useState(null); // optional for error tracking
  const [fundi, setFundi] = useState();
  const [services, setServices] = useState([]);

  // Sync user state changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const retrieve_services = async () => {
    try {
      const res = await fetch("/services");
      const data = await res.json();

      if (res.ok) {
        setServices(data);
      } else {
        setError(data.error || "Failed to retrieve services.");
      }
    } catch (err) {
      console.error("Service-retrieval error:", err);
      setError("Server error.");
    }
  };

  // Fetch fundi details
  const fetchFundi = async (id) => {
    if (!id) {
      alert('Provider called without valid fundi id');
      return;
    }
    try {
      const res = await fetch(`/fundis/${id}`);
      const data = await res.json();

      if (res.ok) {
        setFundi(data);
      } else {
        setError(data.error || "Failed to fetch fundi");
        console.error("Failed to fetch fundi:", data);
      }
    } catch (err) {
      console.log('error fetching fundi');
      setError("Server error while fetching fundi");
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        fetchFundi,
        retrieve_services,
        services,
        fundi,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context safely
export const useTheContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useTheContext must be used within a Provider');
  }
  return context;
};

export { AppContext };
