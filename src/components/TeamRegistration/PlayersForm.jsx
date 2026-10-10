import { useState } from 'react'
import { REGISTRATION_CONFIG } from '../../config/registration'

export default function PlayersForm({ players, onUpdate, onNext, onBack }) {
  const [errors, setErrors] = useState({})
  const [editingIndex, setEditingIndex] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState({
    player_name: '',
    mobile: '',
    email: '',
    role: '',
    jersey_number: ''
  })

  const validatePlayer = (player) => {
    const newErrors = {}

    if (!player.player_name?.trim()) {
      newErrors.player_name = 'Player name is required'
    }

    if (!player.mobile?.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^[6-9]\d{9}$/.test(player.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number'
    }

    if (player.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(player.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!player.role) {
      newErrors.role = 'Player role is required'
    }

    return newErrors
  }

  const handleAddPlayer = () => {
    console.log('Add Player clicked')
    console.log('Current Player:', currentPlayer)
    console.log('Existing Players:', players)
    
    const validationErrors = validatePlayer(currentPlayer)
    console.log('Validation Errors:', validationErrors)
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      console.log('Validation failed, showing errors')
      return
    }

    // Check for duplicate mobile numbers
    const isDuplicate = players.some((p, idx) => 
      idx !== editingIndex && p.mobile === currentPlayer.mobile
    )

    if (isDuplicate) {
      setErrors({ mobile: 'This mobile number is already added' })
      console.log('Duplicate mobile number detected')
      return
    }

    if (editingIndex !== null) {
      // Update existing player
      const updatedPlayers = [...players]
      updatedPlayers[editingIndex] = currentPlayer
      console.log('Updating player at index:', editingIndex)
      onUpdate(updatedPlayers)
      setEditingIndex(null)
    } else {
      // Add new player
      if (players.length >= REGISTRATION_CONFIG.MAX_PLAYERS) {
        alert(`Maximum ${REGISTRATION_CONFIG.MAX_PLAYERS} players allowed`)
        return
      }
      console.log('Adding new player')
      onUpdate([...players, currentPlayer])
    }

    // Reset form
    setCurrentPlayer({
      player_name: '',
      mobile: '',
      email: '',
      role: '',
      jersey_number: ''
    })
    setErrors({})
    console.log('Player added successfully, form reset')
  }

  const handleEditPlayer = (index) => {
    setCurrentPlayer(players[index])
    setEditingIndex(index)
    setErrors({})
  }

  const handleRemovePlayer = (index) => {
    onUpdate(players.filter((_, i) => i !== index))
  }

  const handleCancelEdit = () => {
    setCurrentPlayer({
      player_name: '',
      mobile: '',
      email: '',
      role: '',
      jersey_number: ''
    })
    setEditingIndex(null)
    setErrors({})
  }

  const handleNext = () => {
    if (players.length < REGISTRATION_CONFIG.MIN_PLAYERS) {
      alert(`Minimum ${REGISTRATION_CONFIG.MIN_PLAYERS} players required`)
      return
    }
    onNext()
  }

  return (
    <div className="players-form">
      <h2>Add Players</h2>
      <p className="info-text">
        Add between {REGISTRATION_CONFIG.MIN_PLAYERS} and {REGISTRATION_CONFIG.MAX_PLAYERS} players to your team.
      </p>

      <div className="player-input-section">
        <h3>{editingIndex !== null ? 'Edit Player' : 'Add New Player'}</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="player_name">Player Name *</label>
            <input
              type="text"
              id="player_name"
              value={currentPlayer.player_name}
              onChange={(e) => setCurrentPlayer({ ...currentPlayer, player_name: e.target.value })}
              placeholder="Enter player name"
              className={errors.player_name ? 'error' : ''}
            />
            {errors.player_name && <span className="error-message">{errors.player_name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number *</label>
            <input
              type="tel"
              id="mobile"
              value={currentPlayer.mobile}
              onChange={(e) => setCurrentPlayer({ ...currentPlayer, mobile: e.target.value })}
              placeholder="10-digit mobile"
              maxLength="10"
              className={errors.mobile ? 'error' : ''}
            />
            {errors.mobile && <span className="error-message">{errors.mobile}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email (Optional)</label>
            <input
              type="email"
              id="email"
              value={currentPlayer.email}
              onChange={(e) => setCurrentPlayer({ ...currentPlayer, email: e.target.value })}
              placeholder="Enter email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role *</label>
            <select
              id="role"
              value={currentPlayer.role}
              onChange={(e) => setCurrentPlayer({ ...currentPlayer, role: e.target.value })}
              className={errors.role ? 'error' : ''}
            >
              <option value="">Select role</option>
              {REGISTRATION_CONFIG.PLAYER_ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            {errors.role && <span className="error-message">{errors.role}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="jersey_number">Jersey Number (Optional)</label>
            <input
              type="number"
              id="jersey_number"
              value={currentPlayer.jersey_number}
              onChange={(e) => setCurrentPlayer({ ...currentPlayer, jersey_number: e.target.value })}
              placeholder="Number"
              min="1"
              max="99"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleAddPlayer} className="btn btn-primary">
            {editingIndex !== null ? 'Update Player' : 'Add Player'}
          </button>
          {editingIndex !== null && (
            <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="players-list">
        <h3>Team Players ({players.length}/{REGISTRATION_CONFIG.MAX_PLAYERS})</h3>
        {players.length === 0 ? (
          <p className="empty-message">No players added yet. Add at least {REGISTRATION_CONFIG.MIN_PLAYERS} players.</p>
        ) : (
          <div className="players-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Role</th>
                  <th>Jersey</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={index}>
                    <td>{player.player_name}</td>
                    <td>{player.mobile}</td>
                    <td>{player.role}</td>
                    <td>{player.jersey_number || '-'}</td>
                    <td className="actions">
                      <button 
                        onClick={() => handleEditPlayer(index)}
                        className="btn-icon btn-edit"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleRemovePlayer(index)}
                        className="btn-icon btn-delete"
                        title="Remove"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="form-navigation">
        <button type="button" onClick={onBack} className="btn btn-secondary">
          Back
        </button>
        <button 
          type="button" 
          onClick={handleNext} 
          className="btn btn-primary"
          disabled={players.length < REGISTRATION_CONFIG.MIN_PLAYERS}
        >
          Next: Select Tournament
        </button>
      </div>
    </div>
  )
}
