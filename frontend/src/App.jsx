import { useState, useEffect } from 'react'

const API = `http://${window.location.hostname}:8000/api/personnes/`
const vide = { nom: '', prenom: '', profession: '' }

export default function App() {
  const [form, setForm] = useState(vide)
  const [liste, setListe] = useState([])

  const charger = () =>
    fetch(API).then(r => r.json()).then(setListe)

  useEffect(() => { charger() }, [])

  const change = e => setForm({ ...form, [e.target.name]: e.target.value })

  const envoyer = async e => {
    e.preventDefault()
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setForm(vide)
    charger()
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Présente-toi</h2>
      <form onSubmit={envoyer} style={{ display: 'grid', gap: 8 }}>
        <input name="nom" placeholder="Nom" value={form.nom} onChange={change} required />
        <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={change} required />
        <input name="profession" placeholder="Profession" value={form.profession} onChange={change} required />
        <button type="submit">Envoyer</button>
      </form>

      <h3>Personnes enregistrées</h3>
      <ul>
        {liste.map(p => (
          <li key={p.id}>{p.prenom} {p.nom} : {p.profession}</li>
        ))}
      </ul>
    </div>
  )
}