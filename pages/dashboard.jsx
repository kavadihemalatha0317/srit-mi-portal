import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push, update } from 'firebase/database';

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

export default function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const router = useRouter();

  const TEAM_DB = [
    {id:1, name:"K.Hemalatha", roll:"254g1a3353", dept:"CSM", role:"Project Manager", year:"2ND Year", college:"SRIT", email:"254g1a3353@srit.ac.in"},
    {id:2, name:"M.Hemalatha", roll:"254g1a3354", dept:"CSM", role:"Frontend Developer", year:"2ND Year", college:"SRIT", email:"254g1a3354@srit.ac.in"},
    {id:3, name:"M.Jasmitha", roll:"254g1a3359", dept:"CSM", role:"Backend Developer", year:"2ND Year", college:"SRIT", email:"254g1a3359@srit.ac.in"}
  ];

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); }

  useEffect(() => {
    const roll = localStorage.getItem("currentUser");
    let userData = TEAM_DB.find(u => u.roll.toLowerCase().trim() === roll?.toLowerCase().trim());
    if(!userData) userData = TEAM_DB[0];
    setUser(userData);

    onValue(ref(db, 'projects'), (snapshot) => {
      const data = snapshot.val();
      setProjects(data? Object.values(data) : []);
      setLoading(false);
    });

    onValue(ref(db, 'applications'), (snapshot) => {
      const data = snapshot.val();
      const appsArray = [];
      if(data){
        Object.keys(data).forEach(key => { // FIX: key kuda save chesthunna
          appsArray.push({firebaseKey: key,...data[key]});
        })
      }
      setApplications(appsArray);
    });

    onValue(ref(db, `notifications/${userData.roll}`), (snapshot) => {
      const data = snapshot.val();
      setNotifications(data? Object.values(data).reverse() : []);
    });
  },[])

  const addNotification = (roll, message) => {
    set(push(ref(db, `notifications/${roll}`)), {
      id: Date.now().toString(), message, time: new Date().toLocaleString(), read: false
    });
  }

  const [newProject, setNewProject] = useState({title:"", desc:"", teamSize:"3"});
  const createProject = () => {
    if(!newProject.title ||!newProject.desc) return showToast("❌ Fill all fields");
    set(push(ref(db, 'projects')), {...newProject, id:Date.now().toString(), createdBy:user.roll, createdByName:user.name, createdByDept:user.dept, createdByYear:user.year, createdAt: new Date().toLocaleString(), status:"open"});
    setNewProject({title:"", desc:"", teamSize:"3"});
    showToast("✅ Project Created!");
  }

  const [applyData, setApplyData] = useState({projectId:"", reason:""});
  const applyProject = () => {
    if(!applyData.projectId) return showToast("❌ Select a project");
    if(applications.find(a => a.projectId == applyData.projectId && a.studentRoll == user.roll)) return showToast("⚠️ Already Applied!");
    const proj = projects.find(p=>p.id==applyData.projectId);
    const app = {...applyData, id:Date.now().toString(), projectId: applyData.projectId, projectTitle: proj?.title, studentRoll:user.roll, studentName:user.name, studentDept:user.dept, studentYear:user.year, appliedAt: new Date().toLocaleString(), status:"pending"};
    set(push(ref(db, 'applications')), app);
    addNotification(proj.createdBy, `${user.name} applied to your project: ${proj.title}`);
    setApplyData({projectId:"", reason:""});
    showToast("✅ Applied Successfully!");
  }

  // FIX: Status update bug - firebaseKey tho update chesthunna
  const updateApplicationStatus = (firebaseKey, newStatus, appData) => {
    update(ref(db, `applications/${firebaseKey}`), {status: newStatus});
    const msg = newStatus === "accepted"? `🎉 Your application for "${appData.projectTitle}" is ACCEPTED!` : `❌ Your application for "${appData.projectTitle}" is REJECTED.`;
    addNotification(appData.studentRoll, msg);
    showToast(`✅ Application ${newStatus}`);
  }

  // COLORFUL CERTIFICATE WITH BORDER DESIGN
  const generateCertificate = (appData) => {
    const proj = projects.find(p=>p.id==appData.projectId);
    const certWindow = window.open('', '_blank');
    certWindow.document.write(`
      <html>
        <head><title>Certificate</title>
        <style>
          body { font-family: 'Arial'; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding:30px; }
        .border { background: linear-gradient(45deg, #FF6B9D, #A18CD1, #FFD700); padding:10px; border-radius:25px; }
        .cert { background:white; border-radius:20px; padding:50px; text-align:center; position:relative; }
        .cert:before { content:''; position:absolute; top:20px; left:20px; right:20px; bottom:20px; border:3px dashed #A18CD1; border-radius:15px; }
          h1 { color:#A18CD1; font-size:42px; margin-bottom:20px; }
          h2 { color:#FF6B9D; font-size:32px; margin:20px 0; }
         .seal { font-size:60px; margin:20px; }
        </style>
        </head>
        <body>
          <div class="border">
            <div class="cert">
              <div class="seal">🏆</div>
              <h1>CERTIFICATE OF COMPLETION</h1>
              <p style="font-size:18px;">This is to proudly certify that</p>
              <h2>${appData.studentName}</h2>
              <p style="font-size:16px;">Roll: ${appData.studentRoll} | Dept: ${appData.studentDept} | Year: ${appData.studentYear}</p>
              <p style="font-size:18px; margin:20px 0;">has successfully completed the project</p>
              <h2>"${proj?.title}"</h2>
              <p style="font-size:16px;">at <b>SRIT College</b></p>
              <p style="margin-top:30px;">Date: ${new Date().toLocaleDateString()}</p>
              <br><br>
              <p>___________________</p>
              <p><b>Project Manager: ${proj?.createdByName}</b></p>
            </div>
          </div>
        </body>
      </html>
    `);
    certWindow.document.close();
    certWindow.print();
  }

  const handleLogout = () => { localStorage.removeItem("currentUser"); router.push("/"); }
  const menuItems = [
    {id:"dashboard", name:"Dashboard", icon:"📊"}, {id:"projects", name:"Browse Projects", icon:"💼"},
    {id:"create", name:"Create Project", icon:"✨"}, {id:"apply", name:"Apply for Project", icon:"📝"},
    {id:"myapplications", name:"My Applications", icon:"📄"}, {id:"review", name:"Review Applications", icon:"📋"},
    {id:"notifications", name:"Notifications", icon:"🔔"}, {id:"profile", name:"My Profile", icon:"👤"}
  ]

  return (
    <div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: 'Poppins'; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height:100vh; }
    .toast { position:fixed; top:20px; right:20px; background:white; padding:15px 25px; border-radius:12px; box-shadow:0 8px 25px rgba(0,0,0,0.2); z-index:9999; }
    .sidebar { width:280px; background: linear-gradient(180deg, #FF6B9D 0%, #C44569 50%, #A18CD1 100%); color:white; padding:25px 20px; position:fixed; height:100vh; }
    .sidebar h2 { font-size:26px; margin-bottom:20px; font-weight:700; }
    .user-info { background:rgba(255,255,255,0.15); padding:18px; border-radius:15px; margin-bottom:25px; }
    .menu-btn { width:100%; padding:14px 18px; margin:8px 0; background:rgba(255,255,255,0.1); color:white; border:none; border-radius:12px; text-align:left; font-size:15px; cursor:pointer; display:flex; align-items:center; gap:12px; }
    .menu-btn.active { background:rgba(255,255,255,0.3); border-left:4px solid white; }
    .logout-btn { width:100%; padding:14px; margin-top:30px; background:linear-gradient(90deg, #FF4757, #FF3838); color:white; border:none; border-radius:12px; font-weight:bold; }
    .main { margin-left:280px; padding:30px; }
    .card { background:rgba(255,255,255,0.98); padding:30px; border-radius:20px; margin-bottom:25px; box-shadow:0 8px 32px rgba(0,0,0,0.12); border-left:5px solid #A18CD1; }
    .card h1 { color:#A18CD1; font-size:28px; font-weight:700; }
    .card h2 { color:#FF6B9D; font-size:24px; border-bottom:2px solid #f0f0f0; padding-bottom:12px; }
    .input,.textarea,.select { width:100%; padding:14px; margin:12px 0; border:2px solid #e0e0e0; border-radius:12px; }
    .btn { padding:14px 30px; background:linear-gradient(90deg, #FF6B9D, #A18CD1); color:white; border:none; border-radius:12px; cursor:pointer; font-weight:600; margin:5px; }
    .btn-danger { background:linear-gradient(90deg, #FF4757, #FF3838); }
    .btn-success { background:linear-gradient(90deg, #2ED573, #7BED9F); }
    .btn-cert { background:linear-gradient(90deg, #FFD700, #FFA500); color:#000; font-size:18px; padding:18px 40px; }
    .project-card,.app-card,.notif-card { background:white; padding:22px; border-radius:15px; margin:15px 0; border:1px solid #eee; }
    .badge { display:inline-block; padding:6px 14px; border-radius:20px; font-size:12px; font-weight:600; }
    .badge-pending { background:#FFF3CD; color:#856404; }
    .badge-accepted { background:#D4EDDA; color:#155724; }
    .badge-rejected { background:#F8D7DA; color:#721C24; }
    .hamburger { display:none; }
        @media (max-width: 1023px) {.sidebar { transform: translateX(-100%); position:fixed; }.sidebar.open { transform: translateX(0); }.main { margin-left:0; }.hamburger { display:block; position:fixed; top:15px; right:15px; background:#A18CD1; color:white; border:none; padding:12px 15px; border-radius:10px; font-size:22px; z-index:1000; } }
    .stats-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:20px; }
    .stat-card { background:linear-gradient(135deg, #FF6B9D, #A18CD1); color:white; padding:28px; border-radius:15px; text-align:center; }
    .info-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px; margin:15px 0; }
    .info-item { padding:12px; background:#f8f9fa; border-radius:10px; border-left:3px solid #A18CD1; }
      `}</style>

      {toast && <div className="toast">{toast}</div>}
      <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
      <div className={`sidebar ${menuOpen? 'open' : ''}`}>
        <h2>🎓 SRIT Portal</h2>
        <div className="user-info"><h4>{user.name}</h4><p>Roll: {user.roll}</p><p>Dept: {user.dept}</p></div>
        {menuItems.map(item => (<button key={item.id} className={`menu-btn ${page===item.id? 'active' : ''}`} onClick={()=>{setPage(item.id); setMenuOpen(false)}}><span>{item.icon}</span> {item.name}</button>))}
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>

      <div className="main">
        {page==="dashboard" && (<div><div className="card"><h1>Welcome {user.name}! 🎉</h1></div></div>)}
        {page==="projects" && (<div className="card"><h2>💼 Browse Projects</h2>{projects.map(p => (<div key={p.id} className="project-card"><h3>{p.title}</h3><p>{p.desc}</p></div>))}</div>)}
        {page==="create" && (<div className="card"><h2>✨ Create Project</h2><input className="input" placeholder="Title" value={newProject.title} onChange={e=>setNewProject({...newProject, title:e.target.value})} /><textarea className="textarea" placeholder="Description" value={newProject.desc} onChange={e=>setNewProject({...newProject, desc:e.target.value})} /><button className="btn" onClick={createProject}>Create</button></div>)}
        {page==="apply" && (<div className="card"><h2>📝 Apply</h2><select className="select" value={applyData.projectId} onChange={e=>setApplyData({...applyData, projectId:e.target.value})}><option value="">-- Select --</option>{projects.filter(p=>p.createdBy!==user.roll).map(p => <option key={p.id} value={p.id}>{p.title}</option>)}</select><textarea className="textarea" placeholder="Reason" value={applyData.reason} onChange={e=>setApplyData({...applyData, reason:e.target.value})} /><button className="btn" onClick={applyProject}>Submit</button></div>)}

        {page==="myapplications" && (
          <div className="card"><h2>📄 My Applications</h2>
            {applications.filter(a=>a.studentRoll===user.roll).map(a => (
              <div key={a.id} className="app-card">
                <h4>{a.projectTitle}</h4>
                <p><b>Status:</b> <span className={`badge badge-${a.status}`}>{a.status}</span></p>
                {/* Certificate button teesesa ikkada nunchi */}
              </div>
            ))}
          </div>
        )}

        {page==="review" && (
          <div className="card"><h2>📋 Review</h2>
            {applications.filter(a=>projects.find(p=>p.id==a.projectId)?.createdBy===user.roll).map(a => (
              <div key={a.id} className="app-card">
                <h4>{a.studentName} - {a.studentRoll}</h4>
                <p><b>Project:</b> {a.projectTitle}</p>
                <span className={`badge badge-${a.status}`}>{a.status}</span>
                {a.status==="pending" && (<div><button className="btn btn-success" onClick={()=>updateApplicationStatus(a.firebaseKey, "accepted", a)}>✅ Accept</button><button className="btn btn-danger" onClick={()=>updateApplicationStatus(a.firebaseKey, "rejected", a)}>❌ Reject</button></div>)}
              </div>
            ))}
          </div>
        )}

        {page==="profile" && (
          <div className="card"><h2>👤 My Profile</h2>
            <div className="info-grid">
              <div className="info-item"><b>Name:</b> {user.name}</div>
              <div className="info-item"><b>Roll:</b> {user.roll}</div>
              <div className="info-item"><b>Dept:</b> {user.dept}</div>
              <div className="info-item"><b>Year:</b> {user.year}</div>
            </div>
            {/* CERTIFICATE BUTTON IKADA PETTANU BROO */}
            <h3 style={{marginTop:"30px", color:"#A18CD1"}}>🏆 Your Certificates</h3>
            {applications.filter(a=>a.studentRoll===user.roll && a.status==="accepted").length===0?
              <p>No certificates yet. Get accepted to a project first!</p> :
              applications.filter(a=>a.studentRoll===user.roll && a.status==="accepted").map(a => (
                <div key={a.id} style={{textAlign:"center", marginTop:"20px"}}>
                  <p><b>{a.projectTitle}</b></p>
                  <button className="btn btn-cert" onClick={()=>generateCertificate(a)}>🎓 Generate Certificate</button>
                </div>
              ))
            }
          </div>
        )}
        {page==="notifications" && (<div className="card"><h2>🔔 Notifications</h2>{notifications.map((n,i) => (<div key={i} className="notif-card"><p>{n.message}</p></div>))}</div>)}
      </div>
    </div>
  )
}
