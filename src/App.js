import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AdminPanel } from './components/AdminPanel/AdminPanel';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AdminPanel/>
      </BrowserRouter>
    </div>
  );
}

export default App;
