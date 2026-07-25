import { useState, useEffect } from 'react'
import { auth, db } from '../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, addDoc } from 'firebase/firestore'

export default function Dashboard() {
  const [page, setPage] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [applications, setApplications] = useState([])

  useEffect(()=>{
    onAuthStateChanged(auth, (u)=>setUser(u))
    onSnapshot(collection(db, "projects"), (snap)=>setProjects(snap.docs.map(d=>({id:d.id, ...d.data()}))))
    onSnapshot(collection(db, "applications"), (snap)=>setApplications(snap.docs.map(d=>({id:d.id, ...d.data()}))))
  },[])

  const Sidebar = () => (
    <div style={{width: '250px', borderRight: '1px solid gray', padding: '10px'}}>
      <button onClick={()=>setPage('profile')}>Profile</button><br/>
      <button onClick={()=>setPage('dashboard')}>Dashboard</button><br/>
      <button onClick={()=>setPage('myprojects')}>My Projects</button><br/>
      <button onClick={()=>setPage('apply')}>Apply Projects</button><br/>
      <button onClick={()=>setPage('create')}>+ Create Project</button><br/>
      <button onClick={()=>setPage('notifications')}>Notification</button><br/>
      <button onClick={()=>setPage('review')}>Review Application</button><br/>
      <button onClick={()=>setPage('certificate')}>My Certificate</button><br/>
      <button onClick={()=>auth.signOut()}>Logout</button>
    </div>
  )

  const DashboardPage = () => (
    <div>
      <h2>Welcome {user?.email} 👋</h2>
      <div style={{display: 'flex', gap: '20px'}}>
        <div style={{border: '1px solid', padding: '20px'}}>
          <h3>No. of Projects Done</h3>
          <p>{projects.filter(p=>p.creator===user?.email && p.status==='done').length}</p>
        </div>
        <div style={{border: '1px solid', padding: '20px'}}>
          <h3>Applications</h3>
          <p>{applications.filter(a=>a.creator===user?.email).length}</p>
        </div>
      </div>
    </div>
  )

  const CreateProject = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const submit = async () => {
      await addDoc(collection(db, "projects"), {title, desc, creator: user.email, status: 'live', createdAt: new Date()})
      alert('Project Created & Live Now')
    }
    return (
      <div>
        <h3>Create Project</h3>
        <input placeholder="Project Title" value={title} onChange={(e)=>setTitle(e.target.value)}/><br/><br/>
        <textarea placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)}/><br/><br/>
        <button onClick={submit}>Submit</button>
      </div>
    )
  }

  return (
    <div style={{display: 'flex'}}>
      <Sidebar />
      <div style={{padding: '20px', flex: 1}}>
        {page === 'dashboard' && <DashboardPage />}
        {page === 'create' && <CreateProject />}
        {page === 'profile' && <div><h3>Profile</h3>Name: {user?.email}<br/>Roll: ...</div>}
        {/* migatha pages kuda ila add chey bro */}
      </div>
    </div>
  )
}
