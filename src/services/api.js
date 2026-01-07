const API_URL = import.meta.env.VITE_API_URL || 'https://khan-backend.onrender.com';

// Helper to get stored token
const getToken = () => localStorage.getItem('khan_token');

// Helper for authenticated requests
const authFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || error.message || 'Request failed');
  }

  return response.json();
};

// ===================
// AUTH
// ===================

export const auth = {
  // Google OAuth login
  googleLogin: async (credential) => {
    const data = await authFetch('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential })
    });
    if (data.token) {
      localStorage.setItem('khan_token', data.token);
      localStorage.setItem('khan_user', JSON.stringify(data.user));
    }
    return data;
  },

  // Email login
  login: async (email, password) => {
    const data = await authFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.token) {
      localStorage.setItem('khan_token', data.token);
      localStorage.setItem('khan_user', JSON.stringify(data.user));
    }
    return data;
  },

  // Email register
  register: async (email, password) => {
    const data = await authFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.token) {
      localStorage.setItem('khan_token', data.token);
      localStorage.setItem('khan_user', JSON.stringify(data.user));
    }
    return data;
  },

  // Verify current token
  verify: async () => {
    return authFetch('/auth/verify');
  },

  // Refresh token
  refresh: async () => {
    const data = await authFetch('/auth/refresh', { method: 'POST' });
    if (data.token) {
      localStorage.setItem('khan_token', data.token);
    }
    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('khan_token');
    localStorage.removeItem('khan_user');
  },

  // Get current user from storage
  getCurrentUser: () => {
    const user = localStorage.getItem('khan_user');
    return user ? JSON.parse(user) : null;
  },

  // Check if logged in
  isLoggedIn: () => {
    return !!getToken();
  }
};

// ===================
// STRAVA
// ===================

export const strava = {
  getAuthUrl: () => authFetch('/strava/auth-url'),
  getStatus: () => authFetch('/strava/status'),
  getActivities: (page = 1) => authFetch(`/strava/activities?page=${page}`),
  sync: () => authFetch('/strava/sync', { method: 'POST' }),
  disconnect: () => authFetch('/strava/disconnect', { method: 'DELETE' })
};

// ===================
// GOOGLE FIT
// ===================

export const googleFit = {
  getAuthUrl: () => authFetch('/googlefit/auth-url'),
  getStatus: () => authFetch('/googlefit/status'),
  getSteps: () => authFetch('/googlefit/steps'),
  getSummary: () => authFetch('/googlefit/summary'),
  sync: () => authFetch('/googlefit/sync', { method: 'POST' }),
  disconnect: () => authFetch('/googlefit/disconnect', { method: 'DELETE' })
};

// ===================
// STRIPE
// ===================

export const stripe = {
  createCheckout: (tier) => authFetch('/stripe/create-checkout', {
    method: 'POST',
    body: JSON.stringify({ tier })
  }),
  getPortal: () => authFetch('/stripe/portal', { method: 'POST' })
};

// ===================
// USER
// ===================

export const user = {
  getProfile: () => authFetch('/athletes/me'),
  updateSkin: (skinCode) => authFetch('/skins/activate', {
    method: 'POST',
    body: JSON.stringify({ skinCode })
  })
};

// ===================
// EXERCISES / WORKOUTS
// ===================

export const exercises = {
  getAll: () => authFetch('/exercises'),
  complete: (exerciseId, data) => authFetch(`/exercises/${exerciseId}/complete`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

// ===================
// LEADERBOARD
// ===================

export const leaderboard = {
  get: (type = 'xp') => authFetch(`/leaderboard?type=${type}`)
};

export default {
  auth,
  strava,
  googleFit,
  stripe,
  user,
  exercises,
  leaderboard
};
