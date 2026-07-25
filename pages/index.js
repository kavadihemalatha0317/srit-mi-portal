import { useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Home() {
  const [roll, setRoll] = useState('')
  const [pass, setPass] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      // Password = Roll no first 10 chars ani nuv cheppavu
      await signInWithEmailAndPassword(auth, roll+'@srit.ac.in', pass)
      router.push('/dashboard')
    } catch {
      alert('Login Failed')
    }
  }

  const team = [
    {name: 'K. Hemalatha', role: 'Project Manager', dept: 'CSM', year: 'II', roll: '209G1A3353'},
    {name: 'M. Hemalatha', role: 'Member', dept: 'CSM', year: 'II', roll: '254G1A3354'},
    {name: 'M. Jasmirtha', role: 'Member', dept: 'CSM', year: 'II', roll: '254G1A3359'},
  ]

  return (
    <div style={{padding: '20px'}}>
      <h1>1st SRIT MI anirvanvial</h1>
      <p>Build projects. Gain Experience. Get Certified</p>
      
      <div style={{border: '1px solid gray', padding: '20px', width: '300px'}}>
        <h3>Login</h3>
        <input placeholder="Enter Roll No" value={roll} onChange={(e)=>setRoll(e.target.value)}/><br/><br/>
        <input type="password" placeholder="Enter Password" value={pass} onChange={(e)=>setPass(e.target.value)}/><br/><br/>
        <button onClick={handleLogin}>Login</button>
      </div>

      <h2 style={{marginTop: '40px'}}>Meet our team</h2>
      {team.map(t => (
        <div key={t.roll} style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
          <b>{t.name}</b><br/>
          Role: {t.role}<br/>
          Dept: {t.dept}<br/>
          Year: {t.year}<br/>
          Roll no: {t.roll}
        </div>
      ))}
    </div>
  )
}
