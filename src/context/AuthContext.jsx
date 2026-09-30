import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Mock Database stored in local storage
  const [users, setUsers] = useState(() => {
    try {
      const storedUsers = localStorage.getItem('restaurantly_users');
      return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (e) {
      console.error('Failed to load users', e);
      return [];
    }
  });

  // Current active user
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedSession = localStorage.getItem('restaurantly_session');
      return storedSession ? JSON.parse(storedSession) : null;
    } catch (e) {
      console.error('Failed to load session', e);
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('restaurantly_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('restaurantly_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('restaurantly_session');
    }
  }, [currentUser]);

  const login = async (email, password) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      // Don't store password in session state
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (users.some(u => u.email === userData.email)) {
      return { success: false, error: 'Email already exists' };
    }
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    
    // Auto login
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (updatedData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...updatedData } : u));
    setCurrentUser(prev => ({ ...prev, ...updatedData }));
    return { success: true };
  };

  const requestPasswordReset = async (email) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const user = users.find(u => u.email === email);
    if (!user) {
       // Return true anyway to prevent email enumeration attacks
       return { success: true };
    }
    // Simulate sending an email and generating a code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('restaurantly_reset_code', JSON.stringify({ email, code: resetCode, expiry: Date.now() + 15 * 60 * 1000 }));
    console.log(`[MOCK EMAIL] Password reset code for ${email}: ${resetCode}`);
    return { success: true, mockCode: resetCode }; // Returning mock code for easy testing in UI
  };

  const resetPassword = async (email, code, newPassword) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const storedResetInfo = JSON.parse(localStorage.getItem('restaurantly_reset_code'));
    
    if (!storedResetInfo || storedResetInfo.email !== email || storedResetInfo.code !== code) {
      return { success: false, error: 'Invalid or expired reset code' };
    }
    if (Date.now() > storedResetInfo.expiry) {
      return { success: false, error: 'Reset code has expired' };
    }

    setUsers(prev => prev.map(u => u.email === email ? { ...u, password: newPassword } : u));
    localStorage.removeItem('restaurantly_reset_code');
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      register,
      logout,
      updateProfile,
      requestPasswordReset,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
