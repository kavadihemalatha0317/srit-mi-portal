import { useState, useEffect } from 'react'
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [page, setPage] = useState('home')
  const [loggedIn, setLoggedIn] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [user, setUser] = useState('K. Hemalatha')
  const [roll, setRoll] = useState('')
  const [pass, setPass] = useState('')
  const [newPass, setNewPass] = useState('')

  const [savedPassword, setSavedPassword] = useState(() => localStorage.getItem('srit_password') || '')
  const [isFirstLogin, setIsFirstLogin] = useState(() =>!localStorage.getItem('srit_password'))

  const [projects, setProjects] = useState([])
  const [applications, setApplications] = useState([])

  const [selectedProject, setSelectedProject] = useState('')
  const [skills, setSkills] = useState('')
  const [whyJoin, setWhyJoin] = useState('')
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDesc, setProjectDesc] = useState('')
  const [skillsRequired, setSkillsRequired] = useState('')
  const [groupLimit, setGroupLimit] = useState('')
  const [duration, setDuration] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
      const list = snapshot.docs.map(doc => ({id: doc.id,...doc.data()}))
      setProjects(list)
    })
    const unsubApps = onSnapshot(collection(db, "applications"), (snapshot) => {
      const list = snapshot.docs.map(doc => ({id: doc.id,...doc.data()}))
      setApplications(list)
    })
    setLoading(false)
    return () => {unsubProjects(); unsubApps()}
  }, [])

  const availableProjects = [
    {id: 1, name: 'AI Internship 2026'},
    {id: 2, name: 'Web Development Project'},
    {id: 3, name: 'Mobile App Development'}
  ]

  const teamMembers = [
    {name: 'K. Hemalatha', role: 'Project Manager 👑', rollNo: '254g1a3353', dept: 'CSM', year: '2nd'},
    {name: 'M. Hemalatha', role: 'Frontend Developer 💻', rollNo: '254g1a3354', dept: 'CSM', year: '2nd'},
    {name: 'M. Jasmitha', role: 'Backend Developer ⚙️', rollNo: '254g1a3355', dept: 'CSM', year: '2nd'}
  ]

  const jumpEffect = {
    onMouseOver: (e) => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(161, 140, 209, 0.4)'; },
    onMouseOut: (e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)'; }
  }
  const btnJump = {
    onMouseOver: (e) => { e.target.style.transform = 'translateY(-4px) scale(1.05)'; },
    onMouseOut: (e) => { e.target.style.transform = 'translateY(0) scale(1)'; }
  }
  const hoverStyle = {transition: 'all 0.3s ease', cursor: 'pointer'}

  const handleLogin = () => {
    if(roll === ''){ alert('Please enter Roll No'); return }
    if(isFirstLogin){ setPage('setpassword') }
    else { if(pass === savedPassword){ setLoggedIn(true); setPage('dashboard') } else { alert('Invalid Password! ❌') } }
  }
  const handleSetPassword = () => {
    if(newPass === '') { alert('Please enter password'); return }
    localStorage.setItem('srit_password', newPass)
    setSavedPassword(newPass); setIsFirstLogin(false); setLoggedIn(true); setPage('dashboard')
    alert('Password set successfully! 🎉')
  }
  const handleApplySubmit = async () => {
    if(selectedProject === '' || skills === '' || whyJoin === ''){ alert('Please fill all fields!'); return }
    await addDoc(collection(db, "applications"), { project: selectedProject, skills, whyJoin, student: user, roll: roll, status: 'Pending', time: new Date() })
    alert('Application Submitted Successfully! ✅'); setSelectedProject(''); setSkills(''); setWhyJoin('')
  }
  const handleCreateSubmit = async () => {
    if(projectTitle === '' || projectDesc === ''){ alert('Please fill Title and Description!'); return }
    await addDoc(collection(db, "projects"), { title: projectTitle, desc: projectDesc, skills: skillsRequired, limit: groupLimit, duration, createdBy: user })
    alert('Project Created Successfully! 🚀'); setProjectTitle(''); setProjectDesc(''); setSkillsRequired(''); setGroupLimit(''); setDuration('')
  }
  const handleLogout = () => { setLoggedIn(false); setRoll(''); setPass(''); setPage('home') }

  const menuItems = [
    {key: 'profile', label: 'Profile'}, {key: 'dashboard', label: 'Dashboard'}, {key: 'projects', label: 'Projects'},
    {key: 'apply', label: 'Apply Project'}, {key: 'create', label: '+ Create Project'}, {key: 'review', label: 'Review Applications'},
    {key: 'notifications', label: '🔔 Notifications'}, {key: 'certificates', label: '🏆 My Certificates'}
  ]

  if(loading) return <div style={{padding: '50px', textAlign: 'center', fontSize: '20px'}}>Loading Database...</div>

  if(page === 'home'){
    return (
      <div style={{fontFamily: 'Arial', background: 'linear-gradient(to right, #fff0f6, #f3e8ff)', minHeight: '100vh'}}>
        <header style={{display: 'flex', justifyContent: 'space-between', padding: '15px 20px', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
          <h2 style={{color: '#a18cd1', fontSize: '20px'}}>🎓 SRIT Mini Internship Portal</h2>
          <button onClick={() => setPage('login')} {...btnJump} style={{padding: '10px 25px', background: 'linear-gradient(to right, #ff1493, #a18cd1)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold',...hoverStyle}}>Login</button>
        </header>
        <div style={{textAlign: 'center', padding: '80px 20px'}}>
          <h1 style={{fontSize: isMobile? '28px' : '45px', color: '#a18cd1', lineHeight: '1.8', wordSpacing: '10px'}}>Build Projects.<br/>Gain Experience.<br/>Get Certified. ✨</h1>
          <button onClick={() => setPage('login')} {...btnJump} style={{marginTop: '30px', padding: '18px 50px', background: 'linear-gradient(to right, #ff1493, #a18cd1)', color: 'white', border: 'none', borderRadius: '15px', fontSize: '20px', fontWeight: 'bold',...hoverStyle}}>Get Started →</button>
        </div>
        <div style={{padding: '60px 20px', background: 'white'}}>
          <h2 style={{textAlign: 'center', color: '#a18cd1', marginBottom: '40px', fontSize: '32px'}}>👥 Meet Our Team</h2>
          <div style={{display: 'grid', gridTemplateColumns: isMobile? '1fr' : '1fr 1fr 1fr', gap: '30px', maxWidth: '1000px', margin: '0 auto'}}>
            {teamMembers.map((member, idx) => (
              <div key={idx} {...jumpEffect} style={{background: 'linear-gradient(135deg, #fff0f6, #f3e8ff)', padding: '35px 25px', borderRadius: '25px', textAlign: 'center', border: '3px solid #fbc2eb',...hoverStyle}}>
                <div style={{width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff1493, #a18cd1)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '40px', fontWeight: 'bold'}}>{member.name[0]}</div>
                <h3 style={{color: '#a18cd1', fontSize: '22px'}}>{member.name}</h3>
                <p style={{fontWeight: 'bold', color: '#ff1493'}}>{member.role}</p>
                <div style={{textAlign: 'left', fontSize: '14px', color: '#555', lineHeight: '1.8', marginTop: '15px'}}>
                  <p><b>Roll No:</b> {member.rollNo}</p>
                  <p><b>Dept:</b> {member.dept}</p>
                  <p><b>Year:</b> {member.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if(page === 'login'){
    return (
      <div style={{fontFamily: 'Arial', background: 'linear-gradient(to right, #fff0f6, #f3e8ff)', minHeight: '100vh', padding: '20px'}}>
        <div style={{maxWidth: '450px', margin: '50px auto', background: 'white', padding: '40px', borderRadius: '25px'}}>
          <h2 style={{textAlign: 'center', color: '#a18cd1'}}>Student Login 🔐</h2>
          <label style={{color: '#a18cd1', fontWeight: 'bold'}}>Roll Number</label>
          <input type="text" value={roll} onChange={(e) => setRoll(e.target.value)} placeholder="Enter your Roll No" style={{width: '100%', padding: '14px', margin: '10px 0 20px 0', borderRadius: '12px', border: '2px solid #fbc2eb'}}/>
          {!isFirstLogin && <><label style={{color: '#a18cd1', fontWeight: 'bold'}}>Password</label><input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter your Password" style={{width: '100%', padding: '14px', margin: '10px 0 20px 0', borderRadius: '12px', border: '2px solid #a18cd1'}}/></>}
          <button onClick={handleLogin} {...btnJump} style={{width: '100%', padding: '16px', background: 'linear-gradient(to right, #ff1493, #a18cd1)', color: 'white', border: 'none', borderRadius: '15px', fontSize: '18px', fontWeight: 'bold',...hoverStyle}}>{isFirstLogin? 'Continue' : 'Login'} 💜</button>
        </div>
      </div>
    )
  }

  if(page === 'setpassword'){
    return (
      <div style={{fontFamily: 'Arial', background: 'linear-gradient(to right, #fff0f6, #f3e8ff)', minHeight: '100vh', padding: '20px'}}>
        <div style={{maxWidth: '450px', margin: '100px auto', background: 'white', padding: '40px', borderRadius: '25px'}}>
          <h2 style={{textAlign: 'center', color: '#ff1493'}}>🔐 Set Your Password</h2>
          <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Enter new password" style={{width: '100%', padding: '14px', margin: '10px 0 20px 0', borderRadius: '12px', border: '2px solid #fbc2eb'}}/>
          <button onClick={handleSetPassword} {...btnJump} style={{width: '100%', padding: '16px', background: 'linear-gradient(to right, #ff1493, #a18cd1)', color: 'white', border: 'none', borderRadius: '15px', fontSize: '18px', fontWeight: 'bold',...hoverStyle}}>Submit 🚀</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{background: 'linear-gradient(to right, #fff0f6, #f3e8ff)', minHeight: '100vh', fontFamily: 'Arial'}}>
      {isMobile && (<button onClick={() => setSidebarOpen(!sidebarOpen)} {...btnJump} style={{position: 'fixed', top: '15px', left: '15px', zIndex: 1000, padding: '10px 15px', background: 'linear-gradient(to right, #ff1493, #a18cd1)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '20px'}}>☰</button>)}
      <div style={{width: '260px', background: 'linear-gradient(135deg, #ff1493, #a18cd1)', color: 'white', padding: '20px', height: '100vh', position: 'fixed', left: isMobile &&!sidebarOpen? '-260px' : '0', overflowY: 'auto'}}>
        <h2 style={{textAlign: 'center', marginBottom: '30px'}}>💜 SRIT MI Portal</h2>
        {menuItems.map(item => (<div key={item.key} onClick={() => {setPage(item.key); setSidebarOpen(false)}} {...hoverStyle} style={{padding: '14px 18px', margin: '10px 0', background: page === item.key? 'white' : 'transparent', color: page === item.key? '#ff1493' : 'white', borderRadius: '12px', fontWeight: page === item.key? 'bold' : '500', transform: page === item.key? 'translateX(10px)' : 'translateX(0)'}}>{item.label}</div>))}
        <button onClick={handleLogout} {...btnJump} style={{width: '100%', marginTop: '40px', padding: '14px', background: 'red', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px',...hoverStyle}}>Logout</button>
      </div>

      <div style={{marginLeft: isMobile? '0' : '280px', padding: isMobile? '20px' : '40px'}}>
        {page === 'dashboard' && (<div><h1 style={{color: '#a18cd1'}}>Welcome {user}! 👋</h1><div style={{display: 'grid', gridTemplateColumns: isMobile? '1fr' : '1fr 1fr', gap: '25px'}}><div {...jumpEffect} style={{background: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center',...hoverStyle}}><h3>📁 Projects</h3><h1 style={{color: '#ff1493', fontSize: '50px'}}>{projects.length}</h1></div><div {...jumpEffect} style={{background: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center',...hoverStyle}}><h3>📝 Applications</h3><h1 style={{color: '#ff1493', fontSize: '50px'}}>{applications.length}</h1></div></div></div>)}

        {page === 'projects' && (
          <div>
            <h1 style={{color: '#a18cd1', fontSize: '32px'}}>📁 My Projects</h1>
            {projects.length === 0?
              <div {...jumpEffect} style={{background: 'white', padding: '50px 40px', borderRadius: '20px', textAlign: 'center', marginTop: '20px', border: '2px dashed #fbc2eb',...hoverStyle}}>
                <h2 style={{color: '#a18cd1'}}>📝 Not yet started a project</h2>
                <p style={{color: '#777', marginTop: '10px'}}>Go to "+ Create Project" to start your first project</p>
              </div>
              :
              projects.map(p => <div key={p.id} {...jumpEffect} style={{background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '15px',...hoverStyle}}><h3>{p.title}</h3><p>{p.desc}</p></div>)
            }
          </div>
        )}

        {page === 'apply' && (<div><h1 style={{color: '#8b1a3a'}}>📝 Apply Project</h1><div style={{background: 'white', padding: '30px', borderRadius: '20px', maxWidth: '600px'}}><label>Select Project</label><select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} style={{width: '100%', padding: '12px', margin: '8px 0 20px 0', borderRadius: '10px', border: '2px solid #fbc2eb'}}><option value="">Choose a project</option>{availableProjects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}</select><label>Skills</label><input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Enter your Skills" style={{width: '100%', padding: '12px', margin: '8px 0 20px 0', borderRadius: '10px', border: '2px solid #fbc2eb'}}/><label>Why do you want to join?</label><textarea value={whyJoin} onChange={(e) => setWhyJoin(e.target.value)} placeholder="Why do you want to join?" rows="4" style={{width: '100%', padding: '12px', margin: '8px 0 20px 0', borderRadius: '10px', border: '2px solid #fbc2eb'}}/><button onClick={handleApplySubmit} {...btnJump} style={{padding: '14px 35px', background: 'linear-gradient(to right, #ff6b9d, #8b5cf6)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px',...hoverStyle}}>Submit Application</button></div></div>)}

        {page === 'create' && (<div><h1 style={{color: '#8b1a3a'}}>+ Create Project</h1><div style={{background: 'white', padding: '30px', borderRadius: '20px', maxWidth: '600px'}}><label>Project Title</label><input type="text" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} placeholder="Project Title" style={{width: '100%', padding: '12px', margin: '8px 0 20px 0', borderRadius: '10px', border: '2px solid #fbc2eb'}}/><button onClick={handleCreateSubmit} {...btnJump} style={{padding: '14px 35px', background: 'linear-gradient(to right, #ff6b9d, #8b5cf6)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px',...hoverStyle}}>Submit</button></div></div>)}
        {page === 'review' && (<div><h1 style={{color: '#a18cd1'}}>📋 Review Applications</h1>{applications.length === 0? <div {...jumpEffect} style={{background: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center',...hoverStyle}}><h2>📭 No Applications to Review</h2></div> : applications.map(a => <div key={a.id} {...jumpEffect} style={{background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '15px',...hoverStyle}}><h3>{a.project}</h3><p><b>Status:</b> {a.status}</p></div>)}</div>)}
      </div>
    </div>
  )
}
export default App
