import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // TEAM DATABASE - 3 MEMBERS
  const TEAM_DB = [
    {id:1, name:"K.Hemalatha", roll:"254g1a3353", dept:"CSM", role:"Project Manager", year:"2ND Year", college:"SRIT", email:"254g1a3353@srit.ac.in", phone:"9876543210"},
    {id:2, name:"M.Hemalatha", roll:"254g1a3354", dept:"CSM", role:"Frontend Developer", year:"2ND Year", college:"SRIT", email:"254g1a3354@srit.ac.in", phone:"9876543211"},
    {id:3, name:"M.Jasmitha", roll:"254g1a3359", dept:"CSM", role:"Backend Developer", year:"2ND Year", college:"SRIT", email:"254g1a3359@srit.ac.in", phone:"9876543212"}
  ];

  useEffect(() => {
    const roll = localStorage.getItem("currentUser");
    const userData = TEAM_DB.find(u => u.roll.toLowerCase() === roll?.toLowerCase()) || TEAM_DB[0];
    setUser(userData);
    setProjects(JSON.parse(localStorage.getItem("projects_db") || "[]"));
    setApplications(JSON.parse(localStorage.getItem("applications_db") || "[]"));
  },[])

  // CREATE PROJECT WITH STUDENT DETAILS
  const [newProject, setNewProject] = useState({title:"", desc:"", skills:"", teamSize:""});
  const createProject = () => {
    const project = {
     ...newProject,
      id:Date.now(),
      createdBy:user.roll,
      createdByName:user.name,
      createdByEmail:user.email,
      createdByPhone:user.phone,
      status:"open",
      completed:false
    };
    const updated = [...projects, project];
    setProjects(updated);
    localStorage.setItem("projects_db", JSON.stringify(updated));
    setNewProject({title:"", desc:"", skills:"", teamSize:""});
    alert("✅ Project Created Successfully!");
  }

  // APPLY PROJECT WITH STUDENT DETAILS
  const [applyData, setApplyData] = useState({projectId:"", reason:""});
  const applyProject = () => {
    const app = {
     ...applyData,
      id:Date.now(),
      studentRoll:user.roll,
      studentName:user.name,
      studentEmail:user.email,
      studentPhone:user.phone,
      studentDept:user.dept,
      status:"pending"
    };
    const updated = [...applications, app];
    setApplications(updated);
    localStorage.setItem("applications_db", JSON.stringify(updated));
    setApplyData({projectId:"", reason:""});
    alert("✅ Applied Successfully!");
  }

  // CERTIFICATE FORM
  const [certData, setCertData] = useState({projectId:"", duration:"", description:""});
  const generateCertificate = () => {
    const project = projects.find(p => p.id == certData.projectId);
    if(!project) return alert("Select a project first");

    const certContent = `
SRIT MI PORTAL - CERTIFICATE OF COMPLETION

This is to certify that
${user.name}
Roll No: ${user.roll}
Department: ${user.dept}

has successfully completed the project:
"${project.title}"

Project Description: ${project.desc}
Duration: ${certData.duration}
Skills: ${project.skills}

Date: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([certContent], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificate_${user.roll}_${project.title}.txt`;
    a.click();
    alert("🎉 Certificate Downloaded Successfully!");
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

        @keyframes jump { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
       .jump { animation: jump 0.6s ease; }

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
          <div className="logo jump">🎓 SRIT MI Portal</div>
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
            <div className="card jump">
              <h2 style={{color:"#A18CD1", marginBottom:"20px"}}>My Profile</h2>
              <p><b>Name:</b> {user.name}</p>
              <p><b>Roll No:</b> {user.roll}</p>
              <p><b>Role:</b> {user.role}</p>
              <p><b>Department:</b> {user.dept}</p>
              <p><b>Year:</b> {user.year}</p>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Phone:</b> {user.phone}</p>
            </div>
          )}

          {/* DASHBOARD */}
          {page==="dashboard" && (
            <div className="jump">
              <div className="welcome">Welcome {user.name} 👋</div>
              <div className="stats-card">
                <div style={{fontSize:"18px", fontWeight:"bold"}}>Projects {myProjects}</div>
                <div style={{fontSize:"18px", fontWeight:"bold"}}>| Applications {myApplications}</div>
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {page==="projects" && (
            <div className="card jump">
              <h2 style={{color:"#A18CD1"}}>All Projects</h2>
              {projects.length===0? <p>No projects yet</p> :
                projects.map(p => (
                  <div key={p.id} className="project-item">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <p><b>Skills:</b> {p.skills}</p>
                    <p><b>Created By:</b> {p.createdByName} - {p.createdBy}</p>
                    <p><b>Contact:</b> {p.createdByEmail}</p>
                  </div>
                ))
              }
            </div>
          )}

          {/* CREATE PROJECT */}
          {page==="create" && (
            <div className="card jump">
              <h2 style={{color:"#A18CD1"}}>Create New Project ✨</h2>
              <input className="input" placeholder="Project Title" value={newProject.title} onChange={e=>setNewProject({...newProject, title:e.target.value})} />
              <textarea className="input" placeholder="Description" rows="4" value={newProject.desc} onChange={e=>setNewProject({...newProject, desc:e.target.value})} />
              <input className="input" placeholder="Required Skills" value={newProject.skills} onChange={e=>setNewProject({...newProject, skills:e.target.value})} />
              <input className="input" placeholder="Team Size Needed" value={newProject.teamSize} onChange={e=>setNewProject({...newProject, teamSize:e.target.value})} />

              <div style={{background:"#f5f5f5", padding:"15px", borderRadius:"8px", margin:"10px 0"}}>
                <h4>Your Details:</h4>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Roll:</b> {user.roll}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Phone:</b> {user.phone}</p>
              </div>
              <button className="btn" onClick={createProject}>Create Project</button>
            </div>
          )}

          {/* APPLY PROJECT */}
          {page==="apply" && (
            <div className="card jump">
              <h2 style={{color:"#A18CD1"}}>Apply for Project 📝</h2>
              <select className="input" value={applyData.projectId} onChange={e=>setApplyData({...applyData, projectId:e.target.value})}>
                <option value="">Select Project</option>
                {projects.filter(p=>!p.completed).map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
              <textarea className="input" placeholder="Why do you want this project?" rows="4" value={applyData.reason} onChange={e=>setApplyData({...applyData, reason:e.target.value})} />

              <div style={{background:"#f5f5f5", padding:"15px", borderRadius:"8px", margin:"10px 0"}}>
                <h4>Your Details will be sent:</h4>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Roll:</b> {user.roll}</p>
                <p><b>Dept:</b> {user.dept}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Phone:</b> {user.phone}</p>
              </div>
              <button className="btn" onClick={applyProject}>Apply Now</button>
            </div>
          )}

          {/* REVIEW APPLICATIONS */}
          {page==="review" && (
            <div className="card jump">
              <h2 style={{color:"#A18CD1"}}>Review Applications</h2>
              {applications.filter(a => projects.find(p=>p.id==a.projectId)?.createdBy === user.roll).length===0?
                <p>No applications yet</p> :
                applications.filter(a => projects.find(p=>p.id==a.projectId)?.createdBy === user.roll).map(a => (
                  <div key={a.id} className="project-item">
                    <p><b>Student:</b> {a.studentName} - {a.studentRoll}</p>
                    <p><b>Dept:</b> {a.studentDept}</p>
                    <p><b>Email:</b> {a.studentEmail}</p>
                    <p><b>Phone:</b> {a.studentPhone}</p>
                    <p><b>Project:</b> {projects.find(p=>p.id==a.projectId)?.title}</p>
                    <p><b>Reason:</b> {a.reason}</p>
                    <p><b>Status:</b> {a.status}</p>
                  </div>
                ))
              }
            </div>
          )}

          {/* NOTIFICATIONS */}
          {page==="notifications" && (
            <div className="card jump">
              <h2 style={{color:"#A18CD1"}}>Notifications 🔔</h2>
              <p>No new notifications</p>
            </div>
          )}

          {/* CERTIFICATES */}
          {page==="certificate" && (
            <div className="card jump">
              <h2 style={{color:"#A18CD1"}}>Generate Certificate 🏆</h2>
              <select className="input" value={certData.projectId} onChange={e=>setCertData({...certData, projectId:e.target.value})}>
                <option value="">Select Completed Project</option>
                {projects.filter(p=>p.createdBy===user.roll).map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
              <input className="input" placeholder="Project Duration" value={certData.duration} onChange={e=>setCertData({...certData, duration:e.target.value})} />
              <textarea className="input" placeholder="Project Description" rows="3" value={certData.description} onChange={e=>setCertData({...certData, description:e.target.value})} />
              <button className="btn" onClick={generateCertificate}>Generate & Download Certificate</button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
