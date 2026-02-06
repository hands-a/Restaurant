import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50">
        <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;