import { useState } from 'react'

export default function TeamDetailsForm({ formData, onUpdate, onNext }) {
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.team_name?.trim()) {
      newErrors.team_name = 'Team name is required'
    }

    if (!formData.captain_name?.trim()) {
      newErrors.captain_name = 'Captain name is required'
    }

    if (!formData.captain_mobile?.trim()) {
      newErrors.captain_mobile = 'Captain mobile is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.captain_mobile)) {
      newErrors.captain_mobile = 'Please enter a valid 10-digit mobile number'
    }

    if (!formData.captain_email?.trim()) {
      newErrors.captain_email = 'Captain email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.captain_email)) {
      newErrors.captain_email = 'Please enter a valid email address'
    }

    if (formData.alternate_mobile && !/^[6-9]\d{9}$/.test(formData.alternate_mobile)) {
      newErrors.alternate_mobile = 'Please enter a valid 10-digit mobile number'
    }

    if (!formData.city?.trim()) {
      newErrors.city = 'City/Area is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onNext()
    }
  }

  const handleChange = (field, value) => {
    onUpdate({ ...formData, [field]: value })
    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="team-details-form">
      <h2>Team Details</h2>
      
      <div className="form-group">
        <label htmlFor="team_name">Team Name *</label>
        <input
          type="text"
          id="team_name"
          value={formData.team_name || ''}
          onChange={(e) => handleChange('team_name', e.target.value)}
          placeholder="Enter your team name"
          className={errors.team_name ? 'error' : ''}
        />
        {errors.team_name && <span className="error-message">{errors.team_name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="captain_name">Captain Name *</label>
        <input
          type="text"
          id="captain_name"
          value={formData.captain_name || ''}
          onChange={(e) => handleChange('captain_name', e.target.value)}
          placeholder="Enter captain's name"
          className={errors.captain_name ? 'error' : ''}
        />
        {errors.captain_name && <span className="error-message">{errors.captain_name}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="captain_mobile">Captain Mobile *</label>
          <input
            type="tel"
            id="captain_mobile"
            value={formData.captain_mobile || ''}
            onChange={(e) => handleChange('captain_mobile', e.target.value)}
            placeholder="10-digit mobile number"
            maxLength="10"
            className={errors.captain_mobile ? 'error' : ''}
          />
          {errors.captain_mobile && <span className="error-message">{errors.captain_mobile}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="alternate_mobile">Alternate Mobile</label>
          <input
            type="tel"
            id="alternate_mobile"
            value={formData.alternate_mobile || ''}
            onChange={(e) => handleChange('alternate_mobile', e.target.value)}
            placeholder="10-digit mobile number"
            maxLength="10"
            className={errors.alternate_mobile ? 'error' : ''}
          />
          {errors.alternate_mobile && <span className="error-message">{errors.alternate_mobile}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="captain_email">Captain Email *</label>
        <input
          type="email"
          id="captain_email"
          value={formData.captain_email || ''}
          onChange={(e) => handleChange('captain_email', e.target.value)}
          placeholder="Enter captain's email"
          className={errors.captain_email ? 'error' : ''}
        />
        {errors.captain_email && <span className="error-message">{errors.captain_email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="city">City/Area *</label>
        <input
          type="text"
          id="city"
          value={formData.city || ''}
          onChange={(e) => handleChange('city', e.target.value)}
          placeholder="Enter your city or area"
          className={errors.city ? 'error' : ''}
        />
        {errors.city && <span className="error-message">{errors.city}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Next: Add Players
        </button>
      </div>
    </form>
  )
}
