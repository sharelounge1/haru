import { Routes, Route } from 'react-router-dom'

// Auth Screens
import LandingScreen from './components/screens/auth/LandingScreen'
import LoginScreen from './components/screens/auth/LoginScreen'
import SignupTypeScreen from './components/screens/auth/SignupTypeScreen'
import ClientSignupScreen from './components/screens/auth/ClientSignupScreen'
import SecretarySignupScreen from './components/screens/auth/SecretarySignupScreen'

// Client Screens
import ClientHomeScreen from './components/screens/client/ClientHomeScreen'
import ClientVerificationsScreen from './components/screens/client/ClientVerificationsScreen'
import SecretarySearchScreen from './components/screens/client/SecretarySearchScreen'
import JobRequestListScreen from './components/screens/client/JobRequestListScreen'
import JobRequestCreateScreen from './components/screens/client/JobRequestCreateScreen'

// Secretary Screens
import SecretaryHomeScreen from './components/screens/secretary/SecretaryHomeScreen'
import SecretaryJobSearchScreen from './components/screens/secretary/SecretaryJobSearchScreen'

// Admin Screens
import AdminDashboardScreen from './components/screens/admin/AdminDashboardScreen'
import AdminClientVerificationScreen from './components/screens/admin/AdminClientVerificationScreen'
import AdminSystemSettingsScreen from './components/screens/admin/AdminSystemSettingsScreen'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<LandingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupTypeScreen />} />
        <Route path="/signup/client" element={<ClientSignupScreen />} />
        <Route path="/signup/secretary" element={<SecretarySignupScreen />} />

        {/* Client Routes */}
        <Route path="/client" element={<ClientHomeScreen />} />
        <Route path="/client/verifications" element={<ClientVerificationsScreen />} />
        <Route path="/client/secretary-search" element={<SecretarySearchScreen />} />
        <Route path="/client/job-requests" element={<JobRequestListScreen />} />
        <Route path="/client/job-requests/create" element={<JobRequestCreateScreen />} />

        {/* Secretary Routes */}
        <Route path="/secretary" element={<SecretaryHomeScreen />} />
        <Route path="/secretary/job-search" element={<SecretaryJobSearchScreen />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboardScreen />} />
        <Route path="/admin/verifications" element={<AdminClientVerificationScreen />} />
        <Route path="/admin/settings" element={<AdminSystemSettingsScreen />} />
      </Routes>
    </div>
  )
}

export default App
