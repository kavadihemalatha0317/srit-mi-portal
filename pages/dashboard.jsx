import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]); // For apply dropdown
  const [notifications, setNotifications] = useState(0);
  const [selectedProject, setSelectedProject] = useState("");
  const [whyJoin, setWhyJoin] = useState("");

  const router = useRouter();

  useEffect(() => {
    const roll = localStorage.getItem("currentUser");
    const data = JSON.parse(localStorage.getItem(roll+"_data"));
    setUser(data || {name:"Student", roll:"254G1A0000", dept:"CSM", year:"2nd Year", college:"SRIT", email:"student@srit.ac.in"});
    const completed = JSON.parse(localStorage.getItem(roll+"_completed")) || [];
    setProjects(completed);
    
    // Demo projects for Apply
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
    const application = {
      project: selectedProject,
      name: user.name, roll: user.roll, email: user.email, dept: user.dept, year: user.year,
      why: whyJoin, status: "Pending", date: new Date().toLocaleDateString()
    }
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
    localStorage.setItem(roll+"_created", JSON.stringify([...created, {...newProject, status:"Waiting for Approval"}]));
    alert("Project Created! Waiting for Admin Approval");
    setNewProject({title:"", desc:"", skills:"", limit:"", duration:""});
  }

  return (
    <div>
      <style>{`
        @keyframes jumpOnce { 0% { transform: translateY(0); } 50% { transform: translateY(-6px); } 100% { transform: translateY(0); } }
        .sidebar-btn { width:100%; text-align:left; padding:14px 20px; margin:6px 0; background:transparent; color:#333; border:none; border-radius:10px; cursor:pointer; font-size:16px; font-weight:500; transition:all 0.3s; display:flex; align-items:center; justify-content:space-between; }
        .sidebar-btn:hover { animation: jumpOnce 0.5s ease; background:#E0F7FA; }
        .sidebar-btn.active { background: linear-gradient(135deg, #004D40, #00796B); color: white; font-weight: bold; }
        .badge { background:#D32F2F; color:white; border-radius:20px; padding:2px 10px; font-size:12px; font-weight:bold; }
        .logout-btn { width:100%; padding:14px; margin-top:20px; background: linear-gradient(135deg, #D32F2F, #B71C1C); color:white; border:none; border-radius:10px; font-weight:bold; }
        .logout-btn:hover { animation: jumpOnce 0.5s ease; }
        .stat-card:hover { animation: jumpOnce 0.5s ease; }
        .form-card { background:white; padding:30px; border-radius:15px; box-shadow:0 8px 25px rgba(0,121,107,0.1); max-width:700px; }
        input, select, textarea { width:100%; padding:12px; margin:10px 0; border:2px solid #B2DFDB; border-radius:8px; font-size:15px; }
        label { font-weight:600; color:#004D40; }
        button.primary { padding:14px 30px; background:linear-gradient(135deg,#00796B,#004D40); color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px; }
        button.primary:hover { animation: jumpOnce 0.5s ease; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family:'Segoe UI', Arial; }
      `}</style>

      <div style={{display:"flex", minHeight:"100vh", background:"#F5F7FA"}}>
        {/* SIDEBAR */}
        <div style={{width:"270px", background:"white", padding:"20px", boxShadow:"4px 0 20px rgba(0,0,0,0.05)"}}>
          <h3 style={{color:"#004D40", marginBottom:"25px", fontSize:"22px", fontWeight:"900"}}>SRIT MI Portal</h3>
          <button onClick={()=>setPage("profile")} className={`sidebar-btn ${page==="profile"?"active":""}`}><span>👤 Profile</span></button>
          <button onClick={()=>setPage("dashboard")} className={`sidebar-btn ${page==="dashboard"?"active":""}`}><span>📊 Dashboard</span></button>
          <button onClick={()=>setPage("myprojects")} className={`sidebar-btn ${page==="myprojects"?"active":""}`}><span>📁 My Projects</span></button>
          <button onClick={()=>setPage("applyprojects")} className={`sidebar-btn ${page==="applyprojects"?"active":""}`}><span>📝 Apply Projects</span></button>
          <button onClick={()=>setPage("createproject")} className={`sidebar-btn ${page==="createproject"?"active":""}`}><span>➕ Create Project</span></button>
          <button onClick={()=>setPage("notification")} className={`sidebar-btn ${page==="notification"?"active":""}`}><span>🔔 Notification</span>{notifications > 0 && <span className="badge">{notifications}</span>}</button>
          <button onClick={()=>setPage("reviewapplications")} className={`sidebar-btn ${page==="reviewapplications"?"active":""}`}><span>📋 Review Applications</span></button>
          <button onClick={()=>setPage("mycertificate")} className={`sidebar-btn ${page==="mycertificate"?"active":""}`}><span>🏆 My Certificate</span></button>
          <button onClick={()=>{localStorage.removeItem("currentUser"); router.push("/");}} className="logout-btn">Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{flex:1, padding:"40px", overflowY:"auto"}}>
          
          {/* APPLY PROJECTS FORM */}
          {page==="applyprojects" && (
            <div>
              <h1 style={{color:"#004D40", fontSize:"32px", marginBottom:"20px"}}>Apply for Project</h1>
              <div className="form-card">
                <label>Select Project</label>
                <select value={selectedProject} onChange={(e)=>setSelectedProject(e.target.value)}>
                  <option value="">-- Choose a Project --</option>
                  {allProjects.map(p=><option key={p.id} value={p.title}>{p.title}</option>)}
                </select>

                <label>Name</label>
                <input type="text" value={user.name} readOnly />

                <label>Roll No</label>
                <input type="text" value={user.roll} readOnly />

                <label>Email</label>
                <input type="text" value={user.email} readOnly />

                <label>Department</label>
                <input type="text" value={user.dept} readOnly />

                <label>Year</label>
                <input type="text" value={user.year} readOnly />

                <label>Why do you want to join?</label>
                <textarea rows="4" value={whyJoin} onChange={(e)=>setWhyJoin(e.target.value)} placeholder="Explain your interest and skills..."></textarea>

                <button className="primary" onClick={handleApply}>Submit Application</button>
              </div>
            </div>
          )}

          {/* CREATE PROJECT FORM */}
          {page==="createproject" && (
            <div>
              <h1 style={{color:"#004D40", fontSize:"32px", marginBottom:"20px"}}>Create New Project</h1>
              <div className="form-card">
                <label>Project Title</label>
                <input type="text" value={newProject.title} onChange={(e)=>setNewProject({...newProject, title:e.target.value})} placeholder="e.g. Smart Attendance System" />

                <label>Description</label>
                <textarea rows="3" value={newProject.desc} onChange={(e)=>setNewProject({...newProject, desc:e.target.value})} placeholder="What is this project about?"></textarea>

                <label>Skills Required</label>
                <input type="text" value={newProject.skills} onChange={(e)=>setNewProject({...newProject, skills:e.target.value})} placeholder="e.g. React, Firebase, ML" />

                <label>Limit in Group</label>
                <input type="number" value={newProject.limit} onChange={(e)=>setNewProject({...newProject, limit:e.target.value})} placeholder="e.g. 4" />

                <label>Duration</label>
                <input type="text" value={newProject.duration} onChange={(e)=>setNewProject({...newProject, duration:e.target.value})} placeholder="e.g. 3 Months" />

                <button className="primary" onClick={handleCreate}>Submit Project</button>
              </div>
            </div>
          )}

          {/* DASHBOARD */}
          {page==="dashboard" && (
            <div>
              <h1 style={{color:"#004D40", fontSize:"32px"}}>Welcome {user.name}! 👋</h1>
              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"25px", marginTop:"30px"}}>
                <div className="stat-card" style={{background:"white", padding:"25px", borderRadius:"15px", boxShadow:"0 8px 25px rgba(0,121,107,0.1)", borderLeft:"5px solid #00796B"}}>
                  <h4 style={{color:"gray", fontSize:"14px"}}>Completed Projects</h4>
                  <p style={{fontSize:"36px", color:"#00796B", fontWeight:"bold"}}>{projects.length}</p>
                </div>
                <div className="stat-card" style={{background:"white", padding:"25px", borderRadius:"15px", boxShadow:"0 8px 25px rgba(0,121,107,0.1)", borderLeft:"5px solid #FFA000"}}>
                  <h4 style={{color:"gray", fontSize:"14px"}}>Pending Applications</h4>
                  <p style={{fontSize:"36px", color:"#FFA000", fontWeight:"bold"}}>0</p>
                </div>
              </div>
            </div>
          )}

          {page!=="dashboard" && page!=="applyprojects" && page!=="createproject" && (
            <div style={{background:"white", padding:"40px", borderRadius:"15px", textAlign:"center"}}>
              <h1 style={{color:"#004D40"}}>{page} Page - Coming Soon</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
