import { useState } from 'react'
import TeamDetailsForm from '../components/TeamRegistration/TeamDetailsForm'
import PlayersForm from '../components/TeamRegistration/PlayersForm'
import TournamentSelection from '../components/TeamRegistration/TournamentSelection'
import UPIPayment from '../components/TeamRegistration/UPIPayment'
import RegistrationSuccess from '../components/TeamRegistration/RegistrationSuccess'
import '../styles/registration.css'

const STEPS = {
  TEAM_DETAILS: 1,
  PLAYERS: 2,
  TOURNAMENT: 3,
  REVIEW: 4,
  SUCCESS: 5
}

export default function TeamRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(STEPS.TEAM_DETAILS)
  const [teamData, setTeamData] = useState({
    team_name: '',
    captain_name: '',
    captain_mobile: '',
    captain_email: '',
    alternate_mobile: '',
    city: ''
  })
  const [players, setPlayers] = useState([])
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [completedRegistration, setCompletedRegistration] = useState(null)

  const handleNext = () => {
    setCurrentStep(prev => prev + 1)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSuccess = (registration) => {
    setCompletedRegistration(registration)
    setCurrentStep(STEPS.SUCCESS)
    window.scrollTo(0, 0)
  }

  const getStepName = (step) => {
    switch (step) {
      case STEPS.TEAM_DETAILS: return 'Team Details'
      case STEPS.PLAYERS: return 'Add Players'
      case STEPS.TOURNAMENT: return 'Select Tournament'
      case STEPS.REVIEW: return 'Review & Pay'
      case STEPS.SUCCESS: return 'Success'
      default: return ''
    }
  }

  return (
    <div className="registration-page">
      <div className="registration-container">
        <header className="registration-header">
          <h1>Team Registration</h1>
          <p>Register your team for Box Cricket tournaments</p>
        </header>

        {currentStep !== STEPS.SUCCESS && (
          <div className="progress-bar">
            {[STEPS.TEAM_DETAILS, STEPS.PLAYERS, STEPS.TOURNAMENT, STEPS.REVIEW].map((step) => (
              <div
                key={step}
                className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
              >
                <div className="step-number">{step}</div>
                <div className="step-name">{getStepName(step)}</div>
              </div>
            ))}
          </div>
        )}

        <div className="registration-content">
          {currentStep === STEPS.TEAM_DETAILS && (
            <TeamDetailsForm
              formData={teamData}
              onUpdate={setTeamData}
              onNext={handleNext}
            />
          )}

          {currentStep === STEPS.PLAYERS && (
            <PlayersForm
              players={players}
              onUpdate={setPlayers}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === STEPS.TOURNAMENT && (
            <TournamentSelection
              selectedTournament={selectedTournament}
              onSelect={setSelectedTournament}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === STEPS.REVIEW && (
            <UPIPayment
              teamData={teamData}
              players={players}
              tournament={selectedTournament}
              onBack={handleBack}
              onSuccess={handleSuccess}
            />
          )}

          {currentStep === STEPS.SUCCESS && completedRegistration && (
            <RegistrationSuccess registration={completedRegistration} />
          )}
        </div>
      </div>
    </div>
  )
}
