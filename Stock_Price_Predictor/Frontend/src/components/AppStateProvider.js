import React, { createContext, useContext, useState } from 'react';

// Create a context
const AppStateContext = createContext();

// Create a provider component
export const AppStateProvider = ({ children }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [resultData, setResultData] = useState(null);

  return (
    <AppStateContext.Provider value={{ input1, setInput1, input2, setInput2, resultData, setResultData }}>
      {children}
    </AppStateContext.Provider>
  );
};

// Create a custom hook to access the context
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
