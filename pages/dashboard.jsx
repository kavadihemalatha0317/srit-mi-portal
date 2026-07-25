import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [notifications, setNotifications] = useState(0);
  const [selectedProject, setSelectedProject] = useState("");
  const [whyJoin, setWhyJoin] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu kosam

  const router = useRouter();
useEffect(() => {
  const roll = localStorage.getItem("currentUser");
  const defaultUser = {name:"K.Hemalatha", roll:"254g1a3353", dept:"CSM", year:"2ND Year", college:"SRIT", email:"254g1a3353@srit.ac.in"};
  const data = JSON.parse(localStorage.getItem(roll+"_data")) || defaultUser;
  setUser(data);
  if(!localStorage.getItem(roll+"_data")) localStorage.setItem(roll+"_data", JSON.stringify(defaultUser));

  // TEAM DB - 3 MEMBERS
  const teamDB = [
    {id:1, name:"K.Hemalatha", roll:"254G1A3353", dept:"CSM", role:"Project Manager", year:"2ND Year", email:"254g1a3353@srit.ac.in", img:"👩‍💼"},
    {id:2, name:"M.Hemalatha", roll:"254G1A3354", dept:"CSM", role:"Frontend Developer", year:"2ND Year", email:"254g1a3354@srit.ac.in", img:"👩‍💻"},
    {id:3, name:"M.Jasmitha", roll:"254G1A3359", dept:"CSM", role:"Backend Developer", year:"2ND Year", email:"254g1a3359@srit.ac.in", img:"👩‍💻"}
  ];
  if(!localStorage.getItem("team_db")) {
    localStorage.setItem("team_db", JSON.stringify(teamDB));
  }

  const completed = JSON.parse(localStorage.getItem(roll+"_completed")) || [];
  setProjects(completed);
  
  const demoProjects = JSON.parse(localStorage.getItem("all_projects")) || [
    {id:1, title:"AI Chatbot", desc:"Build AI chatbot for college", skills:"Python, NLP", limit:"5", duration:"2 Months"},
    {id:2, title:"E-Commerce Website", desc:"MERN stack website", skills:"React, Node", limit:"4", duration:"3 Months"}
  ];
  setAllProjects(demoProjects);
  
  const notifs = JSON.parse(localStorage.getItem(roll+"_notifs")) || [];
  setNotifications(notifs.length);
},[])

  const handleApply = () => {
    if(!selectedProject || !whyJoin) return alert("Please fill all fields");
    const application = {project: selectedProject, name: user.name, roll: user.roll, email: user.email, dept: user.dept, year: user.year, why: whyJoin, status: "Pending", date: new Date().toLocaleDateString()}
    const roll = localStorage.getItem("currentUser");
    const applied = JSON.parse(localStorage.getItem(roll+"_applied")) || [];
    localStorage.setItem(roll+"_applied", JSON.stringify([...applied, application]));
    alert("Application Submitted Successfully!");
    setSelectedProject(""); setWhyJoin("");
  }

  const [newProject, setNewProject] = useState({title:"", desc:"", skills:"", limit:"", duration:""});
  const handleCreate = () => {
    if(Object.values(newProject).some(v=>!v)) return alert("Please fill all fields");
    const roll = localStorage.getItem("currentUser");
    const created = JSON.parse(localStorage.getItem(roll+"_created")) || [];
    localStorage.setItem(roll+"_created", JSON.stringify([...created, {...newProject, status:"Live", creator: user.name}]));
    alert("Project Created Successfully! 🚀 Now Live");
    setNewProject({title:"", desc:"", skills:"", limit:"", duration:""});
  }

  const ProfilePage = () => (
    <div>
      <h1 style={{color:"#A18CD1", fontSize:"32px", marginBottom:"20px"}}>My Profile</h1>
      <div className="form-card">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Roll No:</b> {user.roll}</p>
        <p><b>Department:</b> {user.dept}</p>
        <p><b>Year:</b> {user.year}</p>
        <p><b>College:</b> {user.college}</p>
        <p><b>Email:</b> {user.email}</p>
      </div>
    </div>
  )

  const menuItems = [
    {id:"profile", icon:"👤", name:"Profile"},
    {id:"dashboard", icon:"📊", name:"Dashboard"},
    {id:"myprojects", icon:"📁", name:"My Projects"},
    {id:"applyprojects", icon:"📝", name:"Apply Projects"},
    {id:"createproject", icon:"➕", name:"Create Project"},
    {id:"notification", icon:"🔔", name:"Notifications"},
    {id:"reviewapplications", icon:"📋", name:"Review Applications"},
    {id:"mycertificate", icon:"🏆", name:"My Certificates"},
  ]

  return (
    <div>
      <style>{`
        @keyframes jumpOnce { 0% { transform: translateY(0); } 50% { transform: translateY(-6px); } 100% { transform: translateY(0); }
        
        /* DESKTOP SIDEBAR */
        .sidebar {
          width:270px; 
          background: linear-gradient(180deg, #FF6B9D 0%, #A18CD1 50%, #C44569 100%);
          padding:25px 20px; 
          box-shadow:4px 0 20px rgba(161,140,209,0.3);
          color: white;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }
        .sidebar-logo {
          color:white; 
          margin-bottom:30px; 
          font-size:24px; 
          font-weight:900; 
          text-align:center;
        }
        .sidebar-btn { 
          width:100%; 
          text-align:left; 
          padding:14px 18px; 
          margin:8px 0; 
          background:transparent; 
          color:white; 
          border:none; 
          border-radius:12px; 
          cursor:pointer; 
          font-size:16px; 
          font-weight:500; 
          transition:all 0.3s; 
          display:flex; 
          align-items:center; 
          gap:12px;
        }
        .sidebar-btn:hover { animation: jumpOnce 0.5s ease; background:rgba(255,255,255,0.2); }
        .sidebar-btn.active { background: white; color: #A18CD1; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .badge { background:#FF1744; color:white; border-radius:20px; padding:2px 10px; font-size:12px; font-weight:bold; margin-left:auto; }
        .logout-btn { width:100%; padding:14px; margin-top:20px; background: linear-gradient(135deg, #FF1744, #D50000); color:white; border:none; border-radius:12px; font-weight:bold; font-size:16px; }
        .logout-btn:hover { animation: jumpOnce 0.5s ease; }
        
        /* MAIN CONTENT */
        .main-content { margin-left: 270px; padding:40px; }
        
        /* MOBILE TOPBAR */
        .mobile-topbar { display: none; }
        .hamburger { font-size: 28px; background: none; border: none; color: white; cursor: pointer; }
        
        /* RESPONSIVE */
        @media (max-width: 768px) {
          .sidebar { 
            display: ${menuOpen ? 'block' : 'none'}; 
            width: 100%; 
            height: auto; 
            position: relative;
          }
          .main-content { margin-left: 0; padding: 20px; }
          .mobile-topbar { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            padding: 15px 20px; 
            background: linear-gradient(90deg, #FF6B9D, #A18CD1);
            color: white;
            position: sticky;
            top: 0;
            z-index: 1000;
          }
        }

        .stat-card:hover { animation: jumpOnce 0.5s ease; }
        .form-card { background:white; padding:30px; border-radius:15px; box-shadow:0 8px 25px rgba(161,140,209,0.1); max-width:700px; }
        .form-card p { font-size:18px; margin:15px 0; color:#333; }
        input, select, textarea { width:100%; padding:12px; margin:10px 0; border:2px solid #E1BEE7; border-radius:8px; font-size:15px; }
        label { font-weight:600; color:#A18CD1; }
        button.primary { padding:14px 30px; background:linear-gradient(135deg,#FF6B9D,#A18CD1); color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px; }
        button.primary:hover { animation: jumpOnce 0.5s ease; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family:'Segoe UI', Arial; }
      `}</style>

      <div style={{display:"flex", minHeight:"100vh", background:"#F5F7FA"}}>
        
        {/* MOBILE TOPBAR */}
        <div className="mobile-topbar">
          <h3>🎓 SRIT MI Portal</h3>
          <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
        </div>

        {/* SIDEBAR */}
        <div className="sidebar">
          <h3 className="sidebar-logo">🎓 SRIT MI Portal</h3>
          {menuItems.map(item => (
            <button 
              key={item.id} 
              onClick={()=>{setPage(item.id); setMenuOpen(false)}} 
              className={`sidebar-btn ${page===item.id?"active":""}`}
            >
              <span>{item.icon} {item.name}</span>
              {item.id==="notification" && notifications > 0 && <span className="badge">{notifications}</span>}
            </button>
          ))}
          <button onClick={()=>{localStorage.removeItem("currentUser"); router.push("/");}} className="logout-btn">Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          
          {page==="profile" && <ProfilePage />}

          {page==="applyprojects" && (
            <div>
              <h1 style={{color:"#A18CD1", fontSize:"32px", marginBottom:"20px"}}>Apply for Project</h1>
              <div className="form-card">
                <label>Select Project</label>
                <select value={selectedProject} onChange={(e)=>setSelectedProject(e.target.value)}>
                  <option value="">-- Choose a Project --</option>
                  {allProjects.map(p=><option key={p.id} value={p.title}>{p.title}</option>)}
                </select>
                <label>Name</label><input type="text" value={user.name} readOnly />
                <label>Roll No</label><input type="text" value={user.roll} readOnly />
                <label>Email</label><input type="text" value={user.email} readOnly />
                <label>Department</label><input type="text" value={user.dept} readOnly />
                <label>Year</label><input type="text" value={user.year} readOnly />
                <label>Why do you want to join?</label>
                <textarea rows="4" value={whyJoin} onChange={(e)=>setWhyJoin(e.target.value)} placeholder="Explain your interest and skills..."></textarea>
                <button className="primary" onClick={handleApply}>Submit Application</button>
              </div>
            </div>
          )}

          {page==="createproject" && (
            <div>
              <h1 style={{color:"#A18CD1", fontSize:"32px", marginBottom:"20px"}}>Create New Project</h1>
              <div className="form-card">
                <label>Project Title</label><input type="text" value={newProject.title} onChange={(e)=>setNewProject({...newProject, title:e.target.value})} placeholder="e.g. Smart Attendance System" />
                <label>Description</label><textarea rows="3" value={newProject.desc} onChange={(e)=>setNewProject({...newProject, desc:e.target.value})} placeholder="What is this project about?"></textarea>
                <label>Skills Required</label><input type="text" value={newProject.skills} onChange={(e)=>setNewProject({...newProject, skills:e.target.value})} placeholder="e.g. React, Firebase, ML" />
                <label>Limit in Group</label><input type="number" value={newProject.limit} onChange={(e)=>setNewProject({...newProject, limit:e.target.value})} placeholder="e.g. 4" />
                <label>Duration</label><input type="text" value={newProject.duration} onChange={(e)=>setNewProject({...newProject, duration:e.target.value})} placeholder="e.g. 3 Months" />
                <button className="primary" onClick={handleCreate}>Submit Project</button>
              </div>
            </div>
          )}
{page==="dashboard" && (
  <div>
    <h1 style={{color:"#A18CD1", fontSize:"32px"}}>Welcome {user.name}! 👋</h1>
    
    <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"25px", marginTop:"30px"}}>
      <div className="stat-card" style={{background:"white", padding:"25px", borderRadius:"15px", boxShadow:"0 8px 25px rgba(161,140,209,0.1)", borderLeft:"5px solid #A18CD1"}}>
        <h4 style={{color:"gray", fontSize:"14px"}}>Completed Projects</h4>
        <p style={{fontSize:"36px", color:"#A18CD1", fontWeight:"bold"}}>{projects.length}</p>
      </div>
      <div className="stat-card" style={{background:"white", padding:"25px", borderRadius:"15px", boxShadow:"0 8px 25px rgba(161,140,209,0.1)", borderLeft:"5px solid #FF6B9D"}}>
        <h4 style={{color:"gray", fontSize:"14px"}}>Pending Applications</h4>
        <p style={{fontSize:"36px", color:"#FF6B9D", fontWeight:"bold"}}>0</p>
      </div>
    </div>

    {/* TEAM MEMBERS SECTION */}
    <h2 style={{color:"#A18CD1", fontSize:"28px", marginTop:"40px", marginBottom:"20px"}}>Our Team</h2>
    <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))", gap:"25px"}}>
      {JSON.parse(localStorage.getItem("team_db") || "[]").map(member => (
        <div key={member.id} className="team-card jump-hover" style={{
          background:"linear-gradient(135deg, #FF6B9D, #A18CD1)", 
          padding:"25px", borderRadius:"15px", textAlign:"center", color:"white",
          boxShadow:"0 8px 20px rgba(161,140,209,0.3)"
        }}>
          <div style={{fontSize:"50px"}}>{member.img}</div>
          <h3 style={{margin:"10px 0 5px 0", fontSize:"22px"}}>{member.name}</h3>
          <p style={{margin:"5px 0", fontSize:"14px"}}>Roll: {member.roll}</p>
          <p style={{margin:"5px 0", fontSize:"14px"}}>Dept: {member.dept}</p>
          <p style={{margin:"5px 0", fontSize:"15px", fontWeight:"600"}}>{member.role}</p>
          <p style={{margin:"5px 0", fontSize:"14px"}}>{member.year}</p>
        </div>
      ))}
    </div>
  </div>
)}
      
