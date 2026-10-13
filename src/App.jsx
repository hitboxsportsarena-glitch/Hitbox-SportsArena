import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TeamRegistrationPage from './pages/TeamRegistrationPage'
import RegistrationDetailsPage from './pages/RegistrationDetailsPage'
import AdminDashboard from './pages/AdminDashboard'
import TournamentManagement from './pages/TournamentManagement'
import DatabaseTest from './pages/DatabaseTest'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CancellationRefund from './pages/CancellationRefund'
import ContactUs from './pages/ContactUs'
import ShippingExchange from './pages/ShippingExchange'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<TeamRegistrationPage />} />
        <Route path="/registration/:id" element={<RegistrationDetailsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tournaments" element={<TournamentManagement />} />
        <Route path="/test" element={<DatabaseTest />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cancellation-refund" element={<CancellationRefund />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/shipping-exchange" element={<ShippingExchange />} />
      </Routes>
    </Router>
  )
}

export default App
