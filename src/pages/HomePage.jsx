import { useState, useEffect } from "react";
import {
  collection, addDoc, query, where,
  orderBy, onSnapshot, serverTimestamp, deleteDoc, doc
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import "./HomePage.css";

export default function HomePage() {
  const { user, logout } = useAuth();
  const [notes, setNotes]   = useState([]);
  const [input, setInput]   = useState("");
  const [saving, setSaving] = useState(false);

  // Real-time listener for this user's notes
  useEffect(() => {
    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setNotes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [user.uid]);

  const addNote = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSaving(true);
    await addDoc(collection(db, "notes"), {
      uid:       user.uid,
      text:      input.trim(),
      createdAt: serverTimestamp(),
    });
    setInput("");
    setSaving(false);
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  const formatDate = (ts) => {
    if (!ts) return "";
    return new Date(ts.seconds * 1000).toLocaleString(undefined, {
      month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div>
          <div className="home-badge">Hello World · React</div>
          <h1 className="home-title">Hello, World! <span className="wave">👋</span></h1>
          <p className="home-sub">Signed in as <strong>{user.email}</strong></p>
        </div>
        <button onClick={logout} className="logout-btn">Sign out</button>
      </header>

      <main className="home-main">
        <section className="card">
          <h2>My Notes <span className="note-count">{notes.length}</span></h2>
          <p className="card-desc">
            Notes are saved to Firestore in real-time and tied to your account.
          </p>

          <form onSubmit={addNote} className="note-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write a note and press Enter…"
              className="note-input"
              maxLength={200}
            />
            <button type="submit" className="btn primary" disabled={saving || !input.trim()}>
              {saving ? "Saving…" : "Add"}
            </button>
          </form>

          {notes.length === 0 ? (
            <p className="empty-state">No notes yet. Add your first one above!</p>
          ) : (
            <ul className="notes-list">
              {notes.map((note) => (
                <li key={note.id} className="note-item">
                  <div className="note-content">
                    <p className="note-text">{note.text}</p>
                    <span className="note-date">{formatDate(note.createdAt)}</span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(note.id)}
                    title="Delete note"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="home-footer">
        <p>Built by <a href="https://github.com/ishaniray1" target="_blank" rel="noreferrer">ishaniray1</a> · Powered by Firebase + Vite</p>
      </footer>
    </div>
  );
}
