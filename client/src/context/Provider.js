import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  return (
    <AppContext.Provider value={{ user, setUser, bookings, setBookings }}>
      {children}
    </AppContext.Provider>
  );
}

export function useTheContext() {
  return useContext(AppContext);
}
