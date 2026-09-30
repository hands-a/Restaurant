import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../components/ui/Button";
import PageLoader from "../components/motion/PageLoader";
import FloatingElement from "../components/interactive/FloatingElement";
import ScrollToTop from "../components/layout/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import { Link } from "react-router-dom";

// Lazy-loaded pages
const Home           = lazy(() => import("../pages/Home"));
const Menu           = lazy(() => import("../pages/Menu"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Cart           = lazy(() => import("../pages/Cart"));
const Delivery       = lazy(() => import("../pages/Delivery"));
const Contact        = lazy(() => import("../pages/Contact"));
const About          = lazy(() => import("../pages/About"));
const Checkout       = lazy(() => import("../pages/Checkout"));
const Favorites      = lazy(() => import("../pages/Favorites"));
const Profile        = lazy(() => import("../pages/Profile"));
const Login          = lazy(() => import("../pages/auth/Login"));
const Register       = lazy(() => import("../pages/auth/Register"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword  = lazy(() => import("../pages/auth/ResetPassword"));

// 404 — defined inline so it doesn't need a separate lazy boundary
const NotFound = () => (
  <div className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 bg-bg-deep relative overflow-hidden noise-overlay">
    <FloatingElement speed="slow" className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
    <FloatingElement speed="medium" delay={2} className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
      <span className="text-[30vw] font-display font-black text-white/[0.025] leading-none">404</span>
    </div>

    <motion.div
      animate={{ y: [0, -12, 0], rotate: [0, 2, -1, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      className="relative z-10 w-24 h-24 mb-8"
      aria-hidden="true"
    >
      <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="48" cy="56" r="32" stroke="#d97706" strokeWidth="2" strokeOpacity="0.6" />
        <circle cx="48" cy="56" r="22" stroke="#d97706" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="48" cy="56" r="10" fill="#d97706" fillOpacity="0.12" stroke="#d97706" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="36" y1="12" x2="36" y2="30" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1="40" y1="12" x2="40" y2="30" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1="38" y1="30" x2="38" y2="36" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7" />
        <ellipse cx="58" cy="18" rx="5" ry="8" stroke="#d97706" strokeWidth="2" strokeOpacity="0.7" />
        <line x1="58" y1="26" x2="58" y2="36" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
      </svg>
    </motion.div>

    <div className="relative z-10 max-w-md">
      <p className="text-overline mb-4">Page Not Found</p>
      <h1 className="text-heading-2 text-text-on-dark mb-4">This table is empty.</h1>
      <p className="text-body-lg text-text-on-dark-muted mb-10">
        The page you're looking for has moved or no longer exists. Let us take you somewhere delicious.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg" className="shadow-hero">Return to Home</Button>
      </Link>
    </div>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          {/* Single Routes — pages handle their own PageTransition internally */}
          <Routes location={location} key={location.pathname}>
            <Route path="/"                element={<Home />} />
            <Route path="/menu"            element={<Menu />} />
            <Route path="/menu/:id"        element={<ProductDetails />} />
            <Route path="/favorites"       element={<Favorites />} />
            <Route path="/cart"            element={<Cart />} />
            <Route path="/checkout"        element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/profile"         element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/login"           element={<Login />} />
            <Route path="/register"        element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password"  element={<ResetPassword />} />
            <Route path="/delivery"        element={<Delivery />} />
            <Route path="/contact"         element={<Contact />} />
            <Route path="/about"           element={<About />} />
            <Route path="*"               element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
