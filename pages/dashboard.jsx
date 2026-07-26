import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // TEAM DATABASE
  const TEAM_DB = [
    {id:1, name:"K.Hemalatha", roll:"254g1a3353", dept:"CSM", role:"Project Manager", year:"2ND Year", college:"SRIT", email:"254g1a3353@srit.ac.in"},
    {id:2, name:"M.Hemalatha", roll:"254g1a3354", dept:"CSM", role:"Frontend Developer", year:"2ND Year", college:"SRIT", email:"254g1a3354@srit.ac.in"},
    {id:3, name:"M.Jasmitha", roll:"254g1a3359", dept:"CSM", role:"Backend Developer", year:"2ND Year", college:"SRIT", email:"254g1a3359@srit.ac.in"}
  ];

  useEffect(() => {
    const roll = localStorage.getItem("currentUser");
    const userData = TEAM_DB.find(u => u.roll.toLowerCase() === roll?.toLowerCase()) || TEAM_DB[0];
    setUser(userData);

    // Load data from localStorage
    setProjects(JSON.parse(localStorage.getItem("projects_db") || "[]"));
    setApplications(JSON.parse(localStorage.getItem("applications_db") || "[]"));
    setNotifications(JSON.parse(localStorage.getItem("notifications_db") || "[]"));
  },[])

  // CREATE PROJECT
  const [newProject, setNewProject] = useState({title:"", desc:"", skills:""});
  const createProject = () => {
    const project = {...newProject, id:Date.now(), createdBy:user.roll, status:"open"};
    const updated = [...projects, project];
    setProjects(updated);
    localStorage.setItem("projects_db", JSON.stringify(updated));
    setNewProject({title:"", desc:"", skills:""});
    alert("Project Created!");
  }

  // APPLY PROJECT
  const [applyData, setApplyData] = useState({projectId:"", reason:""});
  const applyProject = () => {
    const app = {...applyData, id:Date.now(), studentRoll:user.roll, studentName:user.name, status:"pending"};
    const updated = [...applications, app];
    setApplications(updated);
    localStorage.setItem("applications_db", JSON.stringify(updated));
    setApplyData({projectId:"", reason:""});
    alert("Applied Successfully!");
  }

  // GENERATE CERTIFICATE
  const generateCertificate = () => {
    const cert = `------------------------------------
        SRIT MI PORTAL - CERTIFICATE

This is to certify that
${user.name}
Roll No: ${user.roll}
has successfully completed the project.
Date: ${new Date().toLocaleDateString()}
------------------------------------`;
    alert(cert);
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  }

  const menuItems = [
    {id:"profile", name:"Profile"},
    {id:"dashboard", name:"Dashboard"},
    {id:"projects", name:"Projects"},
    {id:"apply", name:"Apply Project"},
    {id:"create", name:"+ Create Project"},
    {id:"review", name:"Review Applications"},
    {id:"notifications", name:"🔔 Notifications"},
    {id:"certificate", name:"🏆 My Certificates"},
  ]

  const myProjects = projects.filter(p => p.createdBy === user.roll).length;
  const myApplications = applications.filter(a => a.studentRoll === user.roll).length;

  return (
    <div>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; font-family: Arial, sans-serif; }
        body { background:#f0f0f0; }

       .container { display:flex; min-height:100vh; }

       .sidebar {
          width:280px;
          background: linear-gradient(180deg, #FF6B9D 0%, #A18CD1 100%);
          color:white;
          padding:20px;
          position:fixed;
          height:100vh;
          overflow-y:auto;
        }

       .logo { font-size:22px; font-weight:bold; margin-bottom:30px; text-align:center; }

       .sidebar-btn {
          width:100%;
          padding:14px 15px;
          margin:8px 0;
          border:none;
          background:transparent;
          color:white;
          text-align:left;
          cursor:pointer;
          font-size:15px;
          border-radius:10px;
          transition:0.3s;
        }

       .sidebar-btn:hover { background:rgba(255,255,255,0.2); }
       .sidebar-btn.active { background:white; color:#A18CD1; font-weight:bold; }

       .logout-btn {
          width:100%;
          padding:14px;
          margin-top:20px;
          background:#ff4444;
          color:white;
          border:none;
          border-radius:10px;
          cursor:pointer;
          font-size:15px;
          font-weight:bold;
        }

       .main { margin-left:280px; padding:30px; flex:1; }

       .welcome { font-size:28px; font-weight:bold; color:#8B2D6B; margin-bottom:20px; }

       .stats-card {
          background:white;
          padding:20px;
          border-radius:15px;
          display:inline-block;
          box-shadow:0 4px 10px rgba(0,0,0,0.1);
        }

       .card {
          background:white;
          padding:25px;
          border-radius:15px;
          margin-bottom:20px;
          box-shadow:0 4px 10px rgba(0,0,0,0.1);
        }

       .input { width:100%; padding:12px; margin:10px 0; border:1px solid #ddd; border-radius:8px; }
       .btn { padding:12px 25px; background:#A18CD1; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:bold; }
       .btn:hover { background:#8B7AC6; }

       .project-item { border:1px solid #ddd; padding:15px; border-radius:10px; margin:10px 0; }

       .hamburger { display:none; position:fixed; top:15px; right:15px; z-index:999; background:#A18CD1; color:white; border:none; padding:10px 15px; border-radius:5px; }

        @media (max-width: 768px) {
         .sidebar { display: ${menuOpen? 'block' : 'none'}; width:100%; position:relative; height:auto; }
         .main { margin-left:0; padding:15px; }
         .hamburger { display:block; }
        }
      `}</style>

      <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>☰</button>

      <div className="container">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="logo">🎓 SRIT MI Portal</div>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={()=>{setPage(item.id); setMenuOpen(false)}}
              className={`sidebar-btn ${page===item.id?"active":""}`}
            >
              {item.name}
            </button>
          ))}
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        {/* MAIN */}
        <div className="main">

          {/* PROFILE */}
          {page==="profile" && (
            <div className="card">
              <h2 style={{color:"#A18CD1", marginBottom:"20px"}}>My Profile</h2>
              <p><b>Name:</b> {user.name}</p>
              <p><b>Roll No:</b> {user.roll}</p>
              <p><b>Role:</b> {user.role}</p>
              <p><b>Department:</b> {user.dept}</p>
              <p><b>Year:</b> {user.year}</p>
              <p><b>Email:</b> {user.email}</p>
            </div>
          )}

          {/* DASHBOARD */}
          {page==="dashboard" && (
            <div>
              <div className="welcome">Welcome {user.name} 👋</div>
              <div className="stats-card">
                <div style={{fontSize:"18px", fontWeight:"bold"}}>Projects {myProjects}</div>
                <div style={{fontSize:"18px", fontWeight:"bold"}}>| Applications {myApplications}</div>
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {page==="projects" && (
            <div className="card">
              <h2 style={{color:"#A18CD1"}}>All Projects</h2>
              {projects.length===0? <p>No projects yet</p> :
                projects.map(p => (
                  <div key={p.id} className="project-item">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <p><b>Skills:</b> {p.skills}</p>
                  </div>
                ))
              }
            </div>
          )}

          {/* CREATE PROJECT */}
          {page==="create" && (
            <div className="card">
              <h2 style={{color:"#A18CD1"}}>Create New Project</h2>
              <input className="input" placeholder="Project Title" value={newProject.title} onChange={e=>setNewProject({...newProject, title:e.target.value})} />
              <textarea className="input" placeholder="Description" rows="4" value={newProject.desc} onChange={e=>setNewProject({...newProject, desc:e.target.value})} />
              <input className="input" placeholder="Required Skills" value={newProject.skills} onChange={e=>setNewProject({...newProject, skills:e.target.value})} />
              <button className="btn" onClick={createProject}>Create Project</button>
            </div>
          )}

          {/* APPLY PROJECT */}
          {page==="apply" && (
            <div className="card">
              <h2 style={{color:"#A18CD1"}}>Apply for Project</h2>
              <select className="input" value={applyData.projectId} onChange={e=>setApplyData({...applyData, projectId:e.target.value})}>
                <option value="">Select Project</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
              <textarea className="input" placeholder="Why do you want this project?" rows="4" value={applyData.reason} onChange={e=>setApplyData({...applyData, reason:e.target.value})} />
              <button className="btn" onClick={applyProject}>Apply Now</button>
            </div>
          )}

          {/* REVIEW APPLICATIONS */}
          {page==="review" && (
            <div className="card">
              <h2 style={{color:"#A18CD1"}}>Review Applications</h2>
              {applications.filter(a => projects.find(p=>p.id==a.projectId)?.createdBy === user.roll).length===0?
                <p>No applications yet</p> :
                applications.filter(a => projects.find(p=>p.id==a.projectId)?.createdBy === user.roll).map(a => (
                  <div key={a.id} className="project-item">
                    <p><b>Student:</b> {a.studentName} - {a.studentRoll}</p>
                    <p><b>Project:</b> {projects.find(p=>p.id==a.projectId)?.title}</p>
                    <p><b>Status:</b> {a.status}</p>
                  </div>
                ))
              }
            </div>
          )}

          {/* NOTIFICATIONS */}
          {page==="notifications" && (
            <div className="card">
              <h2 style={{color:"#A18CD1"}}>Notifications</h2>
              <p>No new notifications</p>
            </div>
          )}

          {/* CERTIFICATES */}
          {page==="certificate" && (
            <div className="card">
              <h2 style={{color:"#A18CD1"}}>My Certificates</h2>
              <button className="btn" onClick={generateCertificate}>Generate Certificate</button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
