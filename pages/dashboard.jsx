import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push, update, remove } from 'firebase/database';

// ==================== FIREBASE CONFIG ====================
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

// ==================== MAIN COMPONENT ====================
export default function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ==================== TEAM DATA ====================
  const TEAM_DB = [
    {id:1, name:"K.Hemalatha", roll:"254g1a3353", dept:"CSM", role:"Project Manager", year:"2ND Year", college:"SRIT", email:"254g1a3353@srit.ac.in", phone:"9876543210", skills:"React, UI/UX"},
    {id:2, name:"M.Hemalatha", roll:"254g1a3354", dept:"CSM", role:"Frontend Developer", year:"2ND Year", college:"SRIT", email:"254g1a3354@srit.ac.in", phone:"9876543211", skills:"NextJS, Tailwind"},
    {id:3, name:"M.Jasmitha", roll:"254g1a3359", dept:"CSM", role:"Backend Developer", year:"2ND Year", college:"SRIT", email:"254g1a3359@srit.ac.in", phone:"9876543212", skills:"Node, Firebase"}
  ];

  // ==================== FIREBASE DATA FETCH ====================
  useEffect(() => {
    const roll = localStorage.getItem("currentUser");
    const userData = TEAM_DB.find(u => u.roll.toLowerCase() === roll?.toLowerCase()) || TEAM_DB[0];
    setUser(userData);

    const projectsRef = ref(db, 'projects');
    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      setProjects(data? Object.values(data) : []);
      setLoading(false);
    });

    const applicationsRef = ref(db, 'applications');
    onValue(applicationsRef, (snapshot) => {
      const data = snapshot.val();
      setApplications(data? Object.values(data) : []);
    });
  },[])

  // ==================== PROJECT FUNCTIONS ====================
  const [newProject, setNewProject] = useState({title:"", desc:"", skills:"", teamSize:"3"});
  const createProject = () => {
    if(!newProject.title ||!newProject.desc) return alert("❌ Please fill all fields");
    const project = {
     ...newProject,
      id:Date.now(),
      createdBy:user.roll,
      createdByName:user.name,
      createdByEmail:user.email,
      createdAt: new Date().toLocaleString(),
      status:"open",
      applicants: []
    };
    set(push(ref(db, 'projects')), project);
    setNewProject({title:"", desc:"", skills:"", teamSize:"3"});
    alert("✅ Project Created Successfully for All 3 Members!");
  }

  // ==================== APPLICATION FUNCTIONS ====================
  const [applyData, setApplyData] = useState({projectId:"", reason:""});
  const applyProject = () => {
    if(!applyData.projectId) return alert("❌ Select a project");
    const existingApp = applications.find(a => a.projectId == applyData.projectId && a.studentRoll == user.roll);
    if(existingApp) return alert("⚠️ Already Applied!");

    const app = {
     ...applyData,
      id:Date.now(),
      projectId: applyData.projectId,
      studentRoll:user.roll,
      studentName:user.name,
      studentEmail:user.email,
      studentPhone:user.phone,
      studentDept:user.dept,
      studentSkills: user.skills,
      appliedAt: new Date().toLocaleString(),
      status:"pending"
    };
    set(push(ref(db, 'applications')), app);
    setApplyData({projectId:"", reason:""});
    alert("✅ Applied Successfully! Wait for review.");
  }

  // ==================== REVIEW FUNCTIONS ====================
  const acceptApplication = (appId, studentRoll) => {
    update(ref(db, `applications/${appId}`), {status: "accepted"});
    alert("✅ Application Accepted");
  }
  const rejectApplication = (appId) => {
    update(ref(db, `applications/${appId}`), {status: "rejected"});
    alert("❌ Application Rejected");
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  }

  // ==================== MENU ITEMS ====================
  const menuItems = [
    {id:"dashboard", name:"📊 Dashboard", icon:"📊"},
    {id:"projects", name:"💼 Browse Projects", icon:"💼"},
    {id:"create", name:"✨ Create Project", icon:"✨"},
    {id:"apply", name:"📝 Apply for Project", icon:"📝"},
    {id:"review", name:"📋 Review Applications", icon:"📋"},
    {id:"profile", name:"👤 My Profile", icon:"👤"}
  ]

  // ==================== STYLES ====================
  return (
    <div>
      <style jsx global>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: 'Poppins', 'Segoe UI', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height:100vh; }

       .sidebar {
          width:280px;
          background: linear-gradient(180deg, #FF6B9D 0%, #C44569 50%, #A18CD1 100%);
          color:white;
          padding:25px 20px;
          position:fixed;
          height:100vh;
          box-shadow:4px 0 25px rgba(0,0,0,0.3);
          transition:0.4s ease;
          z-index:100;
          overflow-y:auto;
        }
       .sidebar h2 {
          font-size:26px;
          margin-bottom:30px;
          display:flex;
          align-items:center;
          gap:12px;
          text-shadow:2px 2px 4px rgba(0,0,0,0.2);
        }
       .user-info {
          background:rgba(255,255,255,0.15);
          padding:15px;
          border-radius:15px;
          margin-bottom:20px;
          backdrop-filter:blur(10px);
        }
       .user-info h4 { font-size:16px; margin-bottom:5px; }
       .user-info p { font-size:12px; opacity:0.9; }

       .menu-btn {
          width:100%;
          padding:14px 18px;
          margin:8px 0;
          background:rgba(255,255,255,0.1);
          color:white;
          border:none;
          border-radius:12px;
          text-align:left;
          font-size:15px;
          cursor:pointer;
          transition:all 0.3s ease;
          backdrop-filter:blur(5px);
          display:flex;
          align-items:center;
          gap:10px;
          font-weight:500;
        }
       .menu-btn:hover {
          background:rgba(255,255,255,0.25);
          transform:translateX(8px) scale(1.02);
          box-shadow:0 4px 15px rgba(0,0,0,0.2);
        }
       .menu-btn.active {
          background:rgba(255,255,255,0.3);
          border-left:4px solid white;
        }

       .logout-btn {
          width:100%;
          padding:14px;
          margin-top:30px;
          background:linear-gradient(90deg, #FF4757, #FF3838);
          color:white;
          border:none;
          border-radius:12px;
          font-weight:bold;
          cursor:pointer;
          transition:0.3s;
          box-shadow:0 4px 15px rgba(255,71,87,0.4);
        }
       .logout-btn:hover {
          transform:scale(1.05);
          box-shadow:0 6px 20px rgba(255,71,87,0.6);
        }

       .main {
          margin-left:280px;
          padding:30px;
          min-height:100vh;
        }

       .card {
          background:rgba(255,255,255,0.95);
          padding:30px;
          border-radius:20px;
          margin-bottom:25px;
          box-shadow:0 8px 32px rgba(0,0,0,0.1);
          border-left:5px solid #A18CD1;
          animation:fadeInUp 0.6s ease;
          backdrop-filter:blur(10px);
        }
        @keyframes fadeInUp {
          from{opacity:0; transform:translateY(20px);}
          to{opacity:1; transform:translateY(0);}
        }

       .card h1 { color:#A18CD1; margin-bottom:15px; font-size:28px; }
       .card h2 { color:#FF6B9D; margin-bottom:20px; font-size:22px; border-bottom:2px solid #f0f0f0; padding-bottom:10px; }

       .input,.textarea,.select {
          width:100%;
          padding:14px;
          margin:12px 0;
          border:2px solid #e0e0e0;
          border-radius:12px;
          transition:0.3s;
          font-size:15px;
          background:white;
        }
       .input:focus,.textarea:focus,.select:focus {
          border-color:#A18CD1;
          outline:none;
          box-shadow:0 0 0 3px rgba(161,140,209,0.2);
        }
       .textarea { min-height:120px; resize:vertical; }

       .btn {
          padding:14px 30px;
          background:linear-gradient(90deg, #FF6B9D, #A18CD1);
          color:white;
          border:none;
          border-radius:12px;
          cursor:pointer;
          font-weight:bold;
          transition:all 0.3s ease;
          font-size:16px;
          box-shadow:0 4px 15px rgba(161,140,209,0.4);
        }
       .btn:hover {
          transform:translateY(-2px) scale(1.03);
          box-shadow:0 8px 25px rgba(161,140,209,0.6);
        }
       .btn-danger {
          background:linear-gradient(90deg, #FF4757, #FF3838);
          box-shadow:0 4px 15px rgba(255,71,87,0.4);
        }
       .btn-success {
          background:linear-gradient(90deg, #2ED573, #7BED9F);
          box-shadow:0 4px 15px rgba(46,213,115,0.4);
        }

       .project-card,.app-card {
          background:white;
          padding:20px;
          border-radius:15px;
          margin:15px 0;
          border:1px solid #eee;
          transition:0.3s;
          box-shadow:0 3px 10px rgba(0,0,0,0.05);
        }
       .project-card:hover,.app-card:hover {
          transform:translateY(-3px);
          box-shadow:0 8px 20px rgba(0,0,0,0.1);
        }

       .badge {
          display:inline-block;
          padding:5px 12px;
          border-radius:20px;
          font-size:12px;
          font-weight:bold;
          margin-right:8px;
        }
       .badge-open { background:#7BED9F; color:#2ED573; }
       .badge-pending { background:#FFA502; color:white; }
       .badge-accepted { background:#2ED573; color:white; }
       .badge-rejected { background:#FF4757; color:white; }

       .hamburger {
          display:none;
        }

        @media (max-width: 1023px) {
         .sidebar {
            transform: translateX(-100%);
            z-index:999;
          }
         .sidebar.open {
            transform: translateX(0);
          }
         .main {
            margin-left:0;
            padding:20px;
          }
         .hamburger {
            display:block;
            position:fixed;
            top:15px;
            right:15px;
            z-index:1000;
            background:linear-gradient(90deg, #FF6B9D, #A18CD1);
            color:white;
            border:none;
            padding:12px 15px;
            border-radius:10px;
            font-size:22px;
            box-shadow:0 4px 15px rgba(0,0,0,0.3);
          }
        }

       .stats-grid {
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap:20px;
          margin:20px 0;
        }
       .stat-card {
          background:linear-gradient(135deg, #FF6B9D, #A18CD1);
          color:white;
          padding:25px;
          border-radius:15px;
          text-align:center;
          box-shadow:0 5px 20px rgba(0,0,0,0.2);
        }
       .stat-card h3 { font-size:32px; margin-bottom:5px; }
      `}</style>

      {/* ==================== SIDEBAR ==================== */}
      <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
      <div className={`sidebar ${menuOpen? 'open' : ''}`}>
        <h2>🎓 SRIT Portal</h2>

        <div className="user-info">
          <h4>{user.name}</h4>
          <p>{user.roll} | {user.dept}</p>
          <p style={{fontSize:"11px"}}>{user.role}</p>
        </div>

        {menuItems.map(item => (
          <button
            key={item.id}
            className={`menu-btn ${page===item.id? 'active' : ''}`}
            onClick={()=>{setPage(item.id); setMenuOpen(false)}}
          >
            {item.icon} {item.name}
          </button>
        ))}
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="main">

        {/* DASHBOARD */}
        {page==="dashboard" && (
          <div>
            <div className="card">
              <h1>Welcome Back, {user.name}! 🎉</h1>
              <p>College: {user.college} | Year: {user.year}</p>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{projects.length}</h3>
                <p>Total Projects</p>
              </div>
              <div className="stat-card">
                <h3>{applications.length}</h3>
                <p>Total Applications</p>
              </div>
              <div className="stat-card">
                <h3>{projects.filter(p=>p.createdBy===user.roll).length}</h3>
                <p>Your Projects</p>
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {page==="projects" && (
          <div className="card">
            <h2>💼 Browse All Projects</h2>
            {loading? <p>Loading...</p> : projects.length===0?
              <p>❌ No projects available. Create one!</p> :
              projects.map(p => (
                <div key={p.id} className="project-card">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <p><b>Skills:</b> {p.skills}</p>
                  <p><b>Team Size:</b> {p.teamSize}</p>
                  <p><b>Created By:</b> {p.createdByName}</p>
                  <span className="badge badge-open">{p.status}</span>
                </div>
              ))
            }
          </div>
        )}

        {/* CREATE PROJECT */}
        {page==="create" && (
          <div className="card">
            <h2>✨ Create New Project</h2>
            <input className="input" placeholder="📌 Project Title" value={newProject.title} onChange={e=>setNewProject({...newProject, title:e.target.value})} />
            <textarea className="textarea" placeholder="📝 Project Description" value={newProject.desc} onChange={e=>setNewProject({...newProject, desc:e.target.value})} />
            <input className="input" placeholder="🛠️ Required Skills" value={newProject.skills} onChange={e=>setNewProject({...newProject, skills:e.target.value})} />
            <select className="select" value={newProject.teamSize} onChange={e=>setNewProject({...newProject, teamSize:e.target.value})}>
              <option value="2">Team Size: 2</option>
              <option value="3">Team Size: 3</option>
              <option value="4">Team Size: 4</option>
            </select>
            <button className="btn" onClick={createProject}>🚀 Create Project</button>
          </div>
        )}

        {/* APPLY PROJECT */}
        {page==="apply" && (
          <div className="card">
            <h2>📝 Apply for a Project</h2>
            <select className="select" onChange={e=>setApplyData({...applyData, projectId:e.target.value})}>
              <option value="">-- Select Project --</option>
              {projects.filter(p=>p.createdBy!==user.roll).map(p => <option key={p.id} value={p.id}>{p.title} - By {p.createdByName}</option>)}
            </select>
            <textarea className="textarea" placeholder="Why do you want to join this project?" value={applyData.reason} onChange={e=>setApplyData({...applyData, reason:e.target.value})} />
            <button className="btn" onClick={applyProject}>📤 Submit Application</button>
          </div>
        )}

        {/* REVIEW */}
        {page==="review" && (
          <div className="card">
            <h2>📋 Review Applications</h2>
            {applications.filter(a=>projects.find(p=>p.id==a.projectId)?.createdBy===user.roll).length===0?
              <p>No applications yet</p> :
              applications.filter(a=>projects.find(p=>p.id==a.projectId)?.createdBy===user.roll).map(a => (
                <div key={a.id} className="app-card">
                  <h4>{a.studentName} - {a.studentRoll}</h4>
                  <p><b>Dept:</b> {a.studentDept} | <b>Skills:</b> {a.studentSkills}</p>
                  <p><b>Reason:</b> {a.reason}</p>
                  <span className={`badge badge-${a.status}`}>{a.status}</span>
                  {a.status==="pending" && (
                    <div style={{marginTop:"10px"}}>
                      <button className="btn btn-success" onClick={()=>acceptApplication(a.id, a.studentRoll)}>✅ Accept</button>
                      <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={()=>rejectApplication(a.id)}>❌ Reject</button>
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        )}

        {/* PROFILE */}
        {page==="profile" && (
          <div className="card">
            <h2>👤 My Profile</h2>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Roll No:</b> {user.roll}</p>
            <p><b>Department:</b> {user.dept}</p>
            <p><b>Role:</b> {user.role}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone:</b> {user.phone}</p>
            <p><b>Skills:</b> {user.skills}</p>
          </div>
        )}

      </div>
    </div>
  )
}
