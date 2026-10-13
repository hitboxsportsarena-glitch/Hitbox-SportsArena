// Team Registration Configuration
export const REGISTRATION_CONFIG = {
  MIN_PLAYERS: 2,
  MAX_PLAYERS: 15,
  
  PLAYER_ROLES: [
    'Batsman',
    'Bowler',
    'All-rounder',
    'Wicket-keeper',
    'Captain',
    'Vice-Captain'
  ],
  
  REGISTRATION_STATES: {
    DRAFT: 'draft',
    PENDING_PAYMENT: 'pending_payment',
    PAYMENT_PROCESSING: 'payment_processing',
    CONFIRMED: 'confirmed',
    PAYMENT_FAILED: 'payment_failed',
    CANCELLED: 'cancelled'
  },
  
  PAYMENT_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded'
  },
  
  // Payment method: 'razorpay' (live integration)
  PAYMENT_METHOD: 'razorpay',
  
  // Testing mode - set to false for production
  TESTING_MODE: false
}
