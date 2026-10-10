import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function TournamentSelection({ selectedTournament, onSelect, onNext, onBack }) {
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .in('status', ['upcoming', 'ongoing'])
        .order('start_date', { ascending: true })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Fetched tournaments:', data)
      console.log('Number of tournaments:', data?.length || 0)
      setTournaments(data || [])
    } catch (err) {
      console.error('Error fetching tournaments:', err)
      setError(`Failed to load tournaments: ${err.message}. Please check your database connection.`)
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    console.log('Next button clicked')
    console.log('Selected Tournament:', selectedTournament)
    
    if (!selectedTournament) {
      alert('Please select a tournament')
      return
    }
    
    console.log('Calling onNext()')
    onNext()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'TBD'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="tournament-selection">
        <h2>Select Tournament</h2>
        <div className="loading">Loading tournaments...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="tournament-selection">
        <h2>Select Tournament</h2>
        <div className="error-box">{error}</div>
        <button onClick={fetchTournaments} className="btn btn-primary">
          Retry
        </button>
      </div>
    )
  }

  if (tournaments.length === 0) {
    return (
      <div className="tournament-selection">
        <h2>Select Tournament</h2>
        <div className="empty-message">
          No tournaments available at the moment. Please check back later.
        </div>
        <div className="form-navigation">
          <button type="button" onClick={onBack} className="btn btn-secondary">
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="tournament-selection">
      <h2>Select Tournament</h2>
      <p className="info-text">Choose the tournament you want to register for</p>

      <div className="tournaments-grid">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className={`tournament-card ${selectedTournament?.id === tournament.id ? 'selected' : ''}`}
            onClick={() => onSelect(tournament)}
          >
            <div className="tournament-header">
              <h3>{tournament.name}</h3>
              {selectedTournament?.id === tournament.id && (
                <span className="selected-badge">✓ Selected</span>
              )}
            </div>
            
            {tournament.description && (
              <p className="tournament-description">{tournament.description}</p>
            )}

            <div className="tournament-details">
              <div className="detail-item">
                <span className="label">Entry Fee:</span>
                <span className="value">₹{tournament.entry_fee}</span>
              </div>
              
              {tournament.venue && (
                <div className="detail-item">
                  <span className="label">Venue:</span>
                  <span className="value">{tournament.venue}</span>
                </div>
              )}
              
              <div className="detail-item">
                <span className="label">Start Date:</span>
                <span className="value">{formatDate(tournament.start_date)}</span>
              </div>

              {tournament.max_teams && (
                <div className="detail-item">
                  <span className="label">Max Teams:</span>
                  <span className="value">{tournament.max_teams}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="form-navigation">
        <button type="button" onClick={onBack} className="btn btn-secondary">
          Back
        </button>
        <button 
          type="button" 
          onClick={handleNext} 
          className="btn btn-primary"
          disabled={!selectedTournament}
        >
          Next: Review & Pay
        </button>
      </div>
    </div>
  )
}
