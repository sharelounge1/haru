import { Routes, Route } from 'react-router-dom'

// Auth Screens
import LandingScreen from './components/screens/auth/LandingScreen'
import LoginScreen from './components/screens/auth/LoginScreen'
import SignupTypeScreen from './components/screens/auth/SignupTypeScreen'
import ClientSignupScreen from './components/screens/auth/ClientSignupScreen'
import SecretarySignupScreen from './components/screens/auth/SecretarySignupScreen'

// Unified Screens
import UnifiedHomeScreen from './components/screens/UnifiedHomeScreen'
import UnifiedMyScreen from './components/screens/UnifiedMyScreen'

// Detail Screens
import SecretaryDetailScreen from './components/screens/SecretaryDetailScreen'
import JobDetailScreen from './components/screens/JobDetailScreen'

// My Page Screens
import ProfileEditScreen from './components/screens/ProfileEditScreen'
import ContractsScreen from './components/screens/ContractsScreen'
import PaymentsScreen from './components/screens/PaymentsScreen'
import SettingsScreen from './components/screens/SettingsScreen'

// Client Screens
import ClientHomeScreen from './components/screens/client/ClientHomeScreen'
import ClientHomeScreenAlt from './components/screens/client/ClientHomeScreenAlt'
import ClientSearchScreen from './components/screens/client/ClientSearchScreen'
import ClientJobsScreen from './components/screens/client/ClientJobsScreen'
import ClientMessagesScreen from './components/screens/client/ClientMessagesScreen'
import ClientMyScreen from './components/screens/client/ClientMyScreen'
import ClientVerificationsScreen from './components/screens/client/ClientVerificationsScreen'
import SecretarySearchScreen from './components/screens/client/SecretarySearchScreen'
import JobRequestListScreen from './components/screens/client/JobRequestListScreen'
import JobRequestCreateScreen from './components/screens/client/JobRequestCreateScreen'

// Secretary Screens
import SecretaryHomeScreen from './components/screens/secretary/SecretaryHomeScreen'
import SecretaryExploreScreen from './components/screens/secretary/SecretaryExploreScreen'
import SecretaryActivityScreen from './components/screens/secretary/SecretaryActivityScreen'
import SecretaryMessagesScreen from './components/screens/secretary/SecretaryMessagesScreen'
import SecretaryMyScreen from './components/screens/secretary/SecretaryMyScreen'
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

        {/* Unified Routes - Main */}
        <Route path="/home" element={<UnifiedHomeScreen />} />
        <Route path="/my" element={<UnifiedMyScreen />} />

        {/* Detail Routes */}
        <Route path="/secretary/:id" element={<SecretaryDetailScreen />} />
        <Route path="/job/:id" element={<JobDetailScreen />} />

        {/* My Page Routes */}
        <Route path="/my/profile/edit" element={<ProfileEditScreen />} />
        <Route path="/my/contracts" element={<ContractsScreen />} />
        <Route path="/my/payments" element={<PaymentsScreen />} />
        <Route path="/my/settings" element={<SettingsScreen />} />

        {/* Client Routes - Mobile App Style */}
        <Route path="/client" element={<ClientHomeScreen />} />
        <Route path="/client1" element={<ClientHomeScreenAlt />} />
        <Route path="/client/search" element={<ClientSearchScreen />} />
        <Route path="/client/jobs" element={<ClientJobsScreen />} />
        <Route path="/client/jobs/create" element={<JobRequestCreateScreen />} />
        <Route path="/client/messages" element={<ClientMessagesScreen />} />
        <Route path="/client/my" element={<ClientMyScreen />} />
        <Route path="/client/my/verifications" element={<ClientVerificationsScreen />} />

        {/* Client Routes - Legacy */}
        <Route path="/client/verifications" element={<ClientVerificationsScreen />} />
        <Route path="/client/secretary-search" element={<SecretarySearchScreen />} />
        <Route path="/client/job-requests" element={<JobRequestListScreen />} />
        <Route path="/client/job-requests/create" element={<JobRequestCreateScreen />} />

        {/* Secretary Routes - Mobile App Style */}
        <Route path="/secretary" element={<SecretaryHomeScreen />} />
        <Route path="/secretary/explore" element={<SecretaryExploreScreen />} />
        <Route path="/secretary/activity" element={<SecretaryActivityScreen />} />
        <Route path="/secretary/messages" element={<SecretaryMessagesScreen />} />
        <Route path="/secretary/my" element={<SecretaryMyScreen />} />

        {/* Secretary Routes - Legacy */}
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
