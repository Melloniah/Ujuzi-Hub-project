
import React, { createContext, useState, useContext } from 'react';

// Create the context
const AppContext = createContext();

// Context Provider Component
export const Provider = ({ children }) => {
    const [user, setUser] = useState(null); // holds the current logged-in user
    const [error, setError] = useState(null); // optional for error tracking
    const [fundi, setFundi] = useState()
    const [services, setServices] = useState([]);

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
        // console.error("Error fetching fundi:", err);
        console.log('error fetching fundi')
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

