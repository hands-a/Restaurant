import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

const UserMenu = ({ isScrolled, isMobile = false, onClick }) => {
  const { currentUser } = useAuth();

  if (isMobile) {
    return (
      <div className="flex flex-col w-full gap-2">
        {currentUser ? (
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-elevated hover:bg-primary/10 transition-colors font-bold text-text-primary"
            onClick={onClick}
          >
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 flex-shrink-0">
              <span className="text-sm font-bold text-primary">
                {currentUser.fullName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary leading-tight">{currentUser.fullName}</p>
              <p className="text-xs text-text-muted">View Profile</p>
            </div>
          </Link>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/login"
              className="flex justify-center items-center py-2.5 rounded-xl border-2 border-border-strong text-text-primary font-bold text-sm hover:border-primary hover:text-primary transition-colors"
              onClick={onClick}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="flex justify-center items-center py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors shadow-button"
              onClick={onClick}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    );
  }

  return currentUser ? (
    <Link 
      to="/profile" 
      className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
        isScrolled
          ? "text-text-primary hover:bg-surface-sunken"
          : "text-white/90 hover:text-white hover:bg-white/10"
      }`}
      aria-label="View Profile"
    >
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 hover:border-primary transition-colors">
        <span className={`text-sm font-bold ${isScrolled ? "text-primary" : "text-primary-light"}`}>
          {currentUser.fullName?.charAt(0).toUpperCase()}
        </span>
      </div>
    </Link>
  ) : (
    <div className="flex items-center gap-4 mr-2">
      <Link 
        to="/login" 
        className={`text-sm font-bold transition-colors ${
          isScrolled ? "text-text-secondary hover:text-text-primary" : "text-white/80 hover:text-white"
        }`}
      >
        Sign In
      </Link>
      <Link 
        to="/register" 
        className="text-sm font-bold bg-primary text-white px-5 py-2 rounded-full shadow-button hover:bg-primary-light transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default UserMenu;
