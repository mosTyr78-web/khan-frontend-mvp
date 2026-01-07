import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { auth } from '../services/api'

export default function Login({ onBack, onLogin }) {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true)
    setError('')
    try {
      const data = await auth.googleLogin(credentialResponse.credential)
      onLogin && onLogin(data.user)
    } catch (err) {
      setError(err.message || 'Google login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.')
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let data
      if (isRegister) {
        data = await auth.register(email, password)
      } else {
        data = await auth.login(email, password)
      }
      onLogin && onLogin(data.user)
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleAppleLogin = () => {
    // Apple Sign In requires Apple Developer account setup
    setError('Apple Sign In coming soon!')
  }

  const handleFacebookLogin = () => {
    // Facebook OAuth requires Facebook App setup
    setError('Facebook login coming soon!')
  }

  const handleTikTokLogin = () => {
    // TikTok OAuth requires TikTok Developer account
    setError('TikTok login coming soon!')
  }

  return (
    <div className="h-screen w-screen bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center px-4">
      {/* Back Button */}
      <button
        onClick={showEmailForm ? () => setShowEmailForm(false) : onBack}
        className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70"
      >
        ←
      </button>

      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-black mb-2">KHAN</h1>
        <p className="text-white/60">
          {showEmailForm
            ? (isRegister ? 'Create your account' : 'Sign in with email')
            : 'Sign in to track your progress'
          }
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-sm mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm text-center">
          {error}
        </div>
      )}

      {showEmailForm ? (
        /* Email Form */
        <form onSubmit={handleEmailSubmit} className="w-full max-w-sm space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full py-4 px-6 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-orange-500"
          />
          <input
            type="password"
            placeholder="Password (min 8 chars, upper, lower, number)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full py-4 px-6 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold active:scale-95 transition-transform disabled:opacity-50"
          >
            {loading ? 'Loading...' : (isRegister ? 'Create Account' : 'Sign In')}
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="w-full text-center text-white/60 text-sm"
          >
            {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
          </button>
        </form>
      ) : (
        <>
          {/* Login Options */}
          <div className="w-full max-w-sm space-y-3">
            {/* Google - Real OAuth */}
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_black"
                shape="pill"
                size="large"
                text="continue_with"
                width="350"
              />
            </div>

            {/* Apple */}
            <button
              onClick={handleAppleLogin}
              className="w-full py-4 px-6 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
              </svg>
              Continue with Apple
            </button>

            {/* Facebook */}
            <button
              onClick={handleFacebookLogin}
              className="w-full py-4 px-6 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>

            {/* TikTok */}
            <button
              onClick={handleTikTokLogin}
              className="w-full py-4 px-6 rounded-2xl bg-black border-2 border-white/20 text-white font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
              Continue with TikTok
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6 w-full max-w-sm">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-white/40 text-sm">or</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          {/* Email Option */}
          <button
            onClick={() => setShowEmailForm(true)}
            className="w-full max-w-sm py-4 px-6 rounded-2xl border-2 border-white/20 text-white font-bold active:scale-95 transition-transform"
          >
            Continue with Email
          </button>
        </>
      )}

      {/* Terms */}
      <p className="text-white/40 text-xs text-center mt-6 max-w-sm">
        By continuing, you agree to KHAN's Terms of Service and Privacy Policy
      </p>
    </div>
  )
}
