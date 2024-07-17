import React, { createContext, useContext } from 'react';

// Create the context
const EventsContext = createContext();

// Create a custom hook to use the context
export const useEvents = () => useContext(EventsContext);

export const EventsProvider = ({ children, value }) => (
  <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
);
