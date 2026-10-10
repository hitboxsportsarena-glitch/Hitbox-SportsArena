import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TeamRegistrationPage from './pages/TeamRegistrationPage'
import RegistrationDetailsPage from './pages/RegistrationDetailsPage'
import AdminDashboard from './pages/AdminDashboard'
import TournamentManagement from './pages/TournamentManagement'
import DatabaseTest from './pages/DatabaseTest'
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
      </Routes>
    </Router>
  )
}

export default App
