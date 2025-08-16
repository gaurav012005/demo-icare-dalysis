import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import MedicalRecords from './pages/medical-records';
import AppointmentBooking from './pages/appointment-booking';
import PatientDashboard from './pages/patient-dashboard';
import RealTimeQueueManagement from './pages/real-time-queue-management';
import LoginRegistration from './pages/login-registration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/real-time-queue-management" element={<RealTimeQueueManagement />} />
        <Route path="/login-registration" element={<LoginRegistration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
