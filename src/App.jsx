import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <div className="flex flex-col min-h-[100dvh] font-sans text-text-primary bg-surface">
              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#1A1C23',
                    color: '#F9FAFB',
                    borderRadius: '0.75rem',
                    border: '1px solid #2D303E',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                  },
                  success: {
                    iconTheme: { primary: '#10B981', secondary: '#1A1C23' },
                  },
                  error: {
                    iconTheme: { primary: '#EF4444', secondary: '#1A1C23' },
                  },
                }}
              />
              <Header />
              <main className="flex-grow">
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;