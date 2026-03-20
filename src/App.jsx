import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [greeted, setGreeted] = useState(false)

  const handleGreet = () => {
    if (name.trim()) setGreeted(true)
  }

  return (
    <div className="container">
      <header className="header">
        <div className="badge">React + Vite</div>
        <h1 className="title">
          Hello, World! <span className="wave">👋</span>
        </h1>
        <p className="subtitle">
          A minimal React app — built with Vite
        </p>
      </header>

      <main className="main">
        <section className="card">
          <h2>Greet yourself</h2>
          <div className="input-row">
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => { setName(e.target.value); setGreeted(false) }}
              onKeyDown={(e) => e.key === 'Enter' && handleGreet()}
              className="input"
            />
            <button onClick={handleGreet} className="btn primary">
              Say Hello
            </button>
          </div>
          {greeted && (
            <p className="greeting">
              Hello, <strong>{name}</strong>! Welcome to your React app. 🎉
            </p>
          )}
        </section>

        <section className="card">
          <h2>Counter</h2>
          <p className="counter-value">{count}</p>
          <div className="btn-row">
            <button onClick={() => setCount(c => c - 1)} className="btn secondary">−</button>
            <button onClick={() => setCount(0)} className="btn ghost">Reset</button>
            <button onClick={() => setCount(c => c + 1)} className="btn secondary">+</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Built by <a href="https://github.com/ishaniray1" target="_blank" rel="noreferrer">ishaniray1</a></p>
      </footer>
    </div>
  )
}

export default App
