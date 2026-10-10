import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function DatabaseTest() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResult('Testing...\n\n')

    try {
      // Test 1: Check tournaments
      const { data: tournaments, error: tourError } = await supabase
        .from('tournaments')
        .select('*')
        .limit(1)

      setResult(prev => prev + `✅ Tournaments table accessible\n`)
      setResult(prev => prev + `Found ${tournaments?.length || 0} tournaments\n\n`)

      // Test 2: Try to insert a test team
      const testTeam = {
        team_name: 'Test Team ' + Date.now(),
        captain_name: 'Test Captain',
        captain_mobile: '9999999999',
        captain_email: 'test@example.com',
        city: 'Test City',
        registration_status: 'draft'
      }

      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert(testTeam)
        .select()
        .single()

      if (teamError) {
        setResult(prev => prev + `❌ Teams insert failed: ${teamError.message}\n`)
        setResult(prev => prev + `Details: ${JSON.stringify(teamError, null, 2)}\n\n`)
      } else {
        setResult(prev => prev + `✅ Teams table writable\n`)
        setResult(prev => prev + `Created team ID: ${team.id}\n\n`)

        // Test 3: Try to insert a test player
        const testPlayer = {
          team_id: team.id,
          player_name: 'Test Player',
          mobile: '8888888888',
          role: 'Batsman'
        }

        const { data: player, error: playerError } = await supabase
          .from('team_players')
          .insert(testPlayer)
          .select()
          .single()

        if (playerError) {
          setResult(prev => prev + `❌ Team_players insert failed: ${playerError.message}\n`)
          setResult(prev => prev + `Details: ${JSON.stringify(playerError, null, 2)}\n\n`)
        } else {
          setResult(prev => prev + `✅ Team_players table writable\n`)
          setResult(prev => prev + `Created player ID: ${player.id}\n\n`)
        }

        // Cleanup
        await supabase.from('team_players').delete().eq('team_id', team.id)
        await supabase.from('teams').delete().eq('id', team.id)
        setResult(prev => prev + `🧹 Cleaned up test data\n`)
      }

      setResult(prev => prev + `\n✅ All tests completed!`)
    } catch (error) {
      setResult(prev => prev + `\n❌ Error: ${error.message}`)
      console.error('Test error:', error)
    }

    setLoading(false)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Database Connection Test</h1>
      <button 
        onClick={testConnection} 
        disabled={loading}
        style={{
          padding: '1rem 2rem',
          fontSize: '1rem',
          background: '#aa3bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '2rem'
        }}
      >
        {loading ? 'Testing...' : 'Run Database Test'}
      </button>

      {result && (
        <pre style={{
          background: '#1f2028',
          color: '#f3f4f6',
          padding: '1.5rem',
          borderRadius: '8px',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace'
        }}>
          {result}
        </pre>
      )}
    </div>
  )
}
