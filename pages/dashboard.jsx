import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push } from 'firebase/database';

// NEE FIREBASE KEYS
const firebaseConfig = {
  apiKey: "AIzaSyDra1qwWqvST3DoCKUCrfjw6jYAR6W35gg",
  authDomain: "srit-mini-internship.firebaseapp.com",
  databaseURL: "https://srit-mini-internship-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "srit-mini-internship",
  storageBucket: "srit-mini-internship.firebasestorage.app",
  messagingSenderId: "301325399899",
  appId: "1:301325399899:web:3791ba62f63f4061930c7e"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const TEAM_DB = [
    {id:1, name:"K.Hemalatha", roll:"254g1a3353", dept:"CSM", role:"Project Manager", year:"2ND Year", college:"SRIT", email:"254g1a3353@srit.ac.in", phone:"9876543210"},
    {id:2, name:"M.Hemalatha", roll:"254g1a3354", dept:"CSM", role:"Frontend Developer", year:"2ND Year", college:"SRIT", email:"254g1a3354@srit.ac.in", phone:"9876543211"},
    {id:3, name:"M.Jasmitha", roll:"254g1a3359", dept:"CSM", role:"Backend Developer", year:"2ND Year", college:"SRIT", email:"254g1a3359@srit.ac.in", phone:"9876543212"}
  ];

  useEffect(() => {
    const roll = localStorage.getItem("currentUser");
    const userData = TEAM_DB.find(u => u.roll.toLowerCase() === roll?.toLowerCase()) || TEAM_DB[0];
    setUser(userData);

    onValue(ref(db, 'projects'), (snapshot) => {
      const data = snapshot.val();
      setProjects(data? Object.values(data) : []);
    });

    onValue(ref(db, 'applications'), (snapshot) => {
      const data = snapshot.val();
      setApplications(data? Object.values(data) : []);
    });
  },[])

  const [newProject, setNewProject] = useState({title:"", desc:"", skills:"", teamSize:""});
  const createProject = () => {
    if(!newProject.title ||!newProject.desc) return alert("Fill all fields");
    const project = {...newProject, id:Date.now(), createdBy:user.roll, createdByName:user.name, createdByEmail:user.email, status:"open"};
    const newRef = push(ref(db, 'projects'));
    set(newRef, project);
    setNewProject({title:"", desc:"", skills:"", teamSize:""});
    alert("✅ Project Created for All 3 Members!");
  }

  const [applyData, setApplyData] = useState({projectId:"", reason:""});
  const applyProject = () => {
    if(!applyData.projectId) return alert("Select project");
    const app = {...applyData, id:Date.now(), studentRoll:user.roll, studentName:user.name, studentEmail:user.email, studentPhone:user.phone, studentDept:user.dept, status:"pending"};
    const newRef = push(ref(db, 'applications'));
    set(newRef, app);
    setApplyData({projectId:"", reason:""});
    alert("✅ Applied Successfully!");
  }

  const handleLogout = () => { localStorage.removeItem("currentUser"); router.push("/"); }

  const menuItems = [
    {id:"dashboard", name:"📊 Dashboard"}, {id:"projects", name:"💼 Projects"},
    {id:"create", name:"✨ Create Project"}, {id:"apply", name:"📝 Apply Project"},
    {id:"review", name:"📋 Review"}
  ]

  return (
    <div>
      <style>{`
      .sidebar { width:280px; background: linear-gradient(180deg, #FF6B9D 0%, #A18CD1 100%); color:white; padding:20px; position:fixed; height:100vh; transition:0.3s; }
      .main { margin-left:280px; padding:30px; }
      .card { background:white; padding:25px; border-radius:15px; margin-bottom:20px; box-shadow:0 4px 10px rgba(0,0,0,0.1); }
      .input { width:100%; padding:12px; margin:10px 0; border:1px solid #ddd; border-radius:8px; }
      .btn { padding:12px 25px; background:#A18CD1; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:bold; }
      .hamburger { display:none; }
        @media (max-width: 1023px) {.sidebar { transform: translateX(-100%); position:fixed; z-index:999; }.sidebar.open { transform: translateX(0); }.main { margin-left:0; }.hamburger { display:block; position:fixed; top:15px; right:15px; z-index:1000; background:#A18CD1; color:white; border:none; padding:10px; border-radius:8px; } }
      `}</style>

      <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
      <div className={`sidebar ${menuOpen? 'open' : ''}`}>
        <h2>🎓 SRIT Portal</h2>
        {menuItems.map(item => <button key={item.id} style={{width:"100%",padding:"12px",margin:"5px 0",background:"transparent",color:"white",border:"none",textAlign:"left"}} onClick={()=>{setPage(item.id); setMenuOpen(false)}}>{item.name}</button>)}
        <button style={{width:"100%",padding:"12px",marginTop:"20px",background:"red",color:"white",border:"none",borderRadius:"8px"}} onClick={handleLogout}>Logout</button>
      </div>

      <div className="main">
        {page==="dashboard" && <div className="card"><h1>Welcome {user.name}</h1></div>}
        {page==="projects" && <div className="card"><h2>All Projects</h2>{projects.map(p => <div key={p.id} style={{border:"1px solid #ddd",padding:"10px",margin:"10px 0"}}><h3>{p.title}</h3><p>By: {p.createdByName}</p></div>)}</div>}
        {page==="create" && <div className="card"><h2>Create Project</h2><input className="input" placeholder="Title" value={newProject.title} onChange={e=>setNewProject({...newProject, title:e.target.value})} /><button className="btn" onClick={createProject}>Create</button></div>}
        {page==="apply" && <div className="card"><h2>Apply</h2><select className="input" onChange={e=>setApplyData({...applyData, projectId:e.target.value})}>{projects.map(p => <option value={p.id}>{p.title}</option>)}</select><button className="btn" onClick={applyProject}>Apply</button></div>}
        {page==="review" && <div className="card"><h2>Applications</h2>{applications.map(a => <div><p>{a.studentName} - {a.studentRoll}</p></div>)}</div>}
      </div>
    </div>
  )
}
