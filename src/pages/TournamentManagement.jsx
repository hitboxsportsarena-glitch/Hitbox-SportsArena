import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import '../styles/tournament.css'

export default function TournamentManagement() {
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTournament, setEditingTournament] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    entry_fee: '',
    start_date: '',
    end_date: '',
    venue: '',
    max_teams: '',
    status: 'upcoming'
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setTournaments(data || [])
    } catch (err) {
      console.error('Error fetching tournaments:', err)
      setError('Failed to load tournaments')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      const tournamentData = {
        name: formData.name,
        description: formData.description || null,
        entry_fee: parseFloat(formData.entry_fee),
        start_date: formData.start_date ? new Date(formData.start_date).toISOString() : null,
        end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
        venue: formData.venue || null,
        max_teams: formData.max_teams ? parseInt(formData.max_teams) : null,
        status: formData.status
      }

      if (editingTournament) {
        // Update existing tournament
        const { error } = await supabase
          .from('tournaments')
          .update(tournamentData)
          .eq('id', editingTournament.id)

        if (error) throw error
        setSuccess('Tournament updated successfully!')
      } else {
        // Create new tournament
        const { error } = await supabase
          .from('tournaments')
          .insert([tournamentData])

        if (error) throw error
        setSuccess('Tournament created successfully!')
      }

      // Reset form and refresh list
      resetForm()
      await fetchTournaments()
    } catch (err) {
      console.error('Error saving tournament:', err)
      setError(err.message || 'Failed to save tournament')
    }
  }

  const handleEdit = (tournament) => {
    setEditingTournament(tournament)
    setFormData({
      name: tournament.name,
      description: tournament.description || '',
      entry_fee: tournament.entry_fee,
      start_date: tournament.start_date ? new Date(tournament.start_date).toISOString().slice(0, 16) : '',
      end_date: tournament.end_date ? new Date(tournament.end_date).toISOString().slice(0, 16) : '',
      venue: tournament.venue || '',
      max_teams: tournament.max_teams || '',
      status: tournament.status
    })
    setShowForm(true)
    setError(null)
    setSuccess(null)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this tournament? This will also delete all associated registrations.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('tournaments')
        .delete()
        .eq('id', id)

      if (error) throw error

      setSuccess('Tournament deleted successfully!')
      await fetchTournaments()
    } catch (err) {
      console.error('Error deleting tournament:', err)
      setError('Failed to delete tournament')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      entry_fee: '',
      start_date: '',
      end_date: '',
      venue: '',
      max_teams: '',
      status: 'upcoming'
    })
    setEditingTournament(null)
    setShowForm(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="tournament-management">
        <div className="loading">Loading tournaments...</div>
      </div>
    )
  }

  return (
    <div className="tournament-management">
      <header className="page-header">
        <h1>Tournament Management</h1>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : '+ Create Tournament'}
        </button>
      </header>

      {error && (
        <div className="alert alert-error">
          {error}
          <button onClick={() => setError(null)} className="alert-close">&times;</button>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
          <button onClick={() => setSuccess(null)} className="alert-close">&times;</button>
        </div>
      )}

      {showForm && (
        <div className="tournament-form-section">
          <h2>{editingTournament ? 'Edit Tournament' : 'Create New Tournament'}</h2>
          <form onSubmit={handleSubmit} className="tournament-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Tournament Name *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Summer Box Cricket League 2024"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="entry_fee">Entry Fee (₹) *</label>
                <input
                  type="number"
                  id="entry_fee"
                  value={formData.entry_fee}
                  onChange={(e) => setFormData({ ...formData, entry_fee: e.target.value })}
                  placeholder="2500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Annual summer tournament with exciting prizes"
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="venue">Venue</label>
                <input
                  type="text"
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="City Sports Complex"
                />
              </div>

              <div className="form-group">
                <label htmlFor="max_teams">Maximum Teams</label>
                <input
                  type="number"
                  id="max_teams"
                  value={formData.max_teams}
                  onChange={(e) => setFormData({ ...formData, max_teams: e.target.value })}
                  placeholder="16"
                  min="1"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="start_date">Start Date & Time</label>
                <input
                  type="datetime-local"
                  id="start_date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="end_date">End Date & Time</label>
                <input
                  type="datetime-local"
                  id="end_date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingTournament ? 'Update Tournament' : 'Create Tournament'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="tournaments-list">
        <h2>All Tournaments ({tournaments.length})</h2>
        {tournaments.length === 0 ? (
          <div className="empty-state">
            <p>No tournaments found. Create your first tournament!</p>
          </div>
        ) : (
          <div className="tournaments-grid">
            {tournaments.map((tournament) => (
              <div key={tournament.id} className="tournament-card">
                <div className="tournament-header">
                  <h3>{tournament.name}</h3>
                  <span className={`status-badge ${tournament.status}`}>
                    {tournament.status}
                  </span>
                </div>

                {tournament.description && (
                  <p className="tournament-description">{tournament.description}</p>
                )}

                <div className="tournament-details">
                  <div className="detail-row">
                    <span className="label">Entry Fee:</span>
                    <span className="value">₹{tournament.entry_fee}</span>
                  </div>
                  
                  {tournament.venue && (
                    <div className="detail-row">
                      <span className="label">Venue:</span>
                      <span className="value">{tournament.venue}</span>
                    </div>
                  )}
                  
                  {tournament.start_date && (
                    <div className="detail-row">
                      <span className="label">Start:</span>
                      <span className="value">{formatDate(tournament.start_date)}</span>
                    </div>
                  )}

                  {tournament.max_teams && (
                    <div className="detail-row">
                      <span className="label">Max Teams:</span>
                      <span className="value">{tournament.max_teams}</span>
                    </div>
                  )}
                </div>

                <div className="tournament-actions">
                  <button 
                    onClick={() => handleEdit(tournament)} 
                    className="btn-small btn-secondary"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(tournament.id)} 
                    className="btn-small btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
