import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Website Design', creator: 'Ravi', creatorEmail: 'ravi@test.com' },
    { id: 2, title: 'Mobile App', creator: 'Priya', creatorEmail: 'priya@test.com' }
  ])
  const [newTitle, setNewTitle] = useState('')
  const [creatorName, setCreatorName] = useState('')

  const createProject = () => {
    if(!newTitle || !creatorName) return alert('Fill both')
    const newProject = { id: Date.now(), title: newTitle, creator: creatorName, creatorEmail: creatorName+'@test.com' }
    setProjects([...projects, newProject])
    setNewTitle('')
    setCreatorName('')
  }

  return (
    <div style={{padding: '30px'}}>
      <h1>Project Board</h1>
      
      <h3>Create New Project</h3>
      <input placeholder="Your Name" value={creatorName} onChange={(e)=>setCreatorName(e.target.value)}/><br/><br/>
      <input placeholder="Project Title" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/><br/><br/>
      <button onClick={createProject}>Create Project</button>

      <h3 style={{marginTop:'30px'}}>Available Projects</h3>
      {projects.map(p => (
        <div key={p.id} style={{border:'1px solid gray', padding:'10px', margin:'10px 0'}}>
          <h4>{p.title}</h4>
          <p>By: {p.creator}</p>
          <Link href={`/apply?id=${p.id}&creator=${p.creatorEmail}`}>
            <button>Apply</button>
          </Link>
        </div>
      ))}
    </div>
  )
}
