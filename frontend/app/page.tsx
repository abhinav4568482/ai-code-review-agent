'use client'

import { useState } from 'react'

interface ReviewResponse {
  data?: string
  [key: string]: any
}

export default function Home() {
  const [language, setLanguage] = useState<string>('python')
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [response, setResponse] = useState<ReviewResponse | null>(null)

  const languages = ['python', 'javascript', 'typescript', 'java', 'c++']

  const handleReview = async () => {
    if (!code.trim()) {
      setError('Please enter code to review')
      return
    }

    setLoading(true)
    setError('')
    setResponse(null)

    try {
      const res = await fetch('http://127.0.0.1:8000/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          code,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.detail || 'Failed to review code')
      }

      const data = await res.json()
      setResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-3">
          AI Code Review Agent
        </h1>
        <p className="text-xl text-slate-400">
          Get intelligent code feedback powered by AI
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-4xl">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8 mb-6">
          {/* Language Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Programming Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-slate-700/50 text-white rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className="bg-slate-800">
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Code Editor */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Code to Review
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              disabled={loading}
              className="w-full h-80 bg-slate-700/50 text-slate-100 rounded-lg border border-slate-600 p-4 font-mono text-sm leading-relaxed focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Review Button */}
          <button
            onClick={handleReview}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50 disabled:shadow-none"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Reviewing Code...</span>
              </>
            ) : (
              <span>Review Code</span>
            )}
          </button>
        </div>

        {/* Result Section */}
        {response && (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-white mb-6">
              Code Review Results
            </h2>
            <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/50">
              <div className="text-slate-200 whitespace-pre-wrap font-mono text-sm leading-relaxed max-h-96 overflow-y-auto">
                {response.review || JSON.stringify(response, null, 2)}
              </div>
            </div>
            <button
              onClick={() => {
                setCode('')
                setResponse(null)
                setError('')
              }}
              className="mt-6 w-full bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 border border-slate-600 hover:border-slate-500"
            >
              Review Another Code
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-slate-500 text-sm">
        <p>Powered by OpenRouter API</p>
      </div>
    </div>
  )
}
