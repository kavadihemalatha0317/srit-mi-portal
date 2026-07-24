import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [notifications, setNotifications] = useState(3); // demo count

  const router = useRouter();

  useEffect(() => {
    const roll = localStorage.getItem("currentUser");
    const data = JSON.parse(localStorage.getItem(roll+"_data"));
    setUser(data || {name:"Student", roll:"", dept:"CSM", year:"2nd Year", college:"SRIT", phone:"", skills:""});
    const completed = JSON.parse(localStorage.getItem(roll+"_completed")) || [];
    setProjects(completed);
  },[])

  return (
    <div>
      <style>{`
        @keyframes jumpOnce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
        .sidebar-btn {
          width:100%; text-align:left; padding:14px 20px; margin:6px 0; 
          background:transparent; color:#333; border:none; border-radius:10px; 
          cursor:pointer; font-size:16px; font-weight:500;
          transition:all 0.3s;
          display:flex; align-items:center; gap:10px;
        }
        .sidebar-btn:hover {
          animation: jumpOnce 0.5s ease;
          background:#E0F7FA;
        }
        .sidebar-btn.active {
          background: linear-gradient(135deg, #004D40, #00796B); /* NAVY + TEAL */
          color: white;
          font-weight: bold;
          box-shadow:0 4px 15px rgba(0,121,107,0.3);
        }
        .logout-btn {
          width:100%; padding:14px; margin-top:20px; 
          background: linear-gradient(135deg, #D32F2F, #B71C1C); 
          color:white; border:none; border-radius:10px; font-weight:bold;
        }
        .logout-btn:hover { animation: jumpOnce 0.5s ease; }
        .stat-card:hover { animation: jumpOnce 0.5s ease; }
        table { width:100%; border-collapse: collapse; }
        th, td { padding:12px; text-align:left; border-bottom:1px solid #eee; }
        input { width:100%; padding:12px; margin:8px 0; border:2px solid #B2DFDB; border-radius:8px; }
        button.primary { padding:12px 25px; background:linear-gradient(135deg,#00796B,#004D40); color:white; border:none; border-radius:8px; font-weight:bold; cursor:pointer; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family:'Segoe UI', Arial; }
      `}</style>

      <div style={{display:"flex", minHeight:"100vh", background:"#F5F7FA"}}>
        {/* SIDEBAR */}
        <div style={{width:"270px", background:"white", padding:"20px", boxShadow:"4px 0 20px rgba(0,0,0,0.05)"}}>
          <h3 style={{color:"#004D40", marginBottom:"25px", fontSize:"22px", fontWeight:"900"}}>SRIT MI Portal</h3>
          
          <button onClick={()=>setPage("profile")} className={`sidebar-btn ${page==="profile"?"active":""}`}>👤 Profile</button>
          <button onClick={()=>setPage("dashboard")} className={`sidebar-btn ${page==="dashboard"?"active":""}`}>📊 Dashboard</button>
          <button onClick={()=>setPage("myprojects")} className={`sidebar-btn ${page==="myprojects"?"active":""}`}>📁 My Projects</button>
          <button onClick={()=>setPage("applyprojects")} className={`sidebar-btn ${page==="applyprojects"?"active":""}`}>📝 Apply Projects</button>
          <button onClick={()=>setPage("createproject")} className={`sidebar-btn ${page==="createproject"?"active":""}`}>➕ Create Project</button>
          <button onClick={()=>setPage("notification")} className={`sidebar-btn ${page==="notification"?"active":""}`}>🔔 Notification {notifications>0 && <span style={{background:"#D32F2F",color:"white",borderRadius:"50%",padding:"2px 8px",fontSize:"12px"}}>{notifications}</span>}</button>
          <button onClick={()=>setPage("reviewapplications")} className={`sidebar-btn ${page==="reviewapplications"?"active":""}`}>📋 Review Applications</button>
          <button onClick={()=>setPage("mycertificate")} className={`sidebar-btn ${page==="mycertificate"?"active":""}`}>🏆 My Certificate</button>
          
          <button onClick={()=>{localStorage.removeItem("currentUser"); router.push("/");}} className="logout-btn">Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{flex:1, padding:"40px", overflowY:"auto"}}>
          
          {/* DASHBOARD */}
          {page==="dashboard" && (
            <div>
              <h1 style={{color:"#004D40", fontSize:"32px"}}>Welcome {user.name}! 👋</h1>
              
              {/* 4 STATS CARDS */}
              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"25px", marginTop:"30px"}}>
                <div className="stat-card" style={{background:"white", padding:"25px", borderRadius:"15px", boxShadow:"0 8px 25px rgba(0,121,107,0.1)", borderLeft:"5px solid #00796B"}}>
                  <h4 style={{color:"gray", fontSize:"14px"}}>Completed Projects</h4>
                  <p style={{fontSize:"36px", color:"#00796B", fontWeight:"bold"}}>{projects.length}</p>
                </div>
                <div className="stat-card" style={{background:"white", padding:"25px", borderRadius:"15px", boxShadow:"0 8px 25px rgba(0,121,107,0.1)", borderLeft:"5px solid #FFA000"}}>
                  <h4 style={{color:"gray", fontSize:"14px"}}>Pending Applications</h4>
                  <p style={{fontSize:"36px", color:"#FFA000", fontWeight:"bold"}}>0</p>
                </div>
                <div className="stat-card" style={{background:"white", padding:"25px", borderRadius:"15px", boxShadow:"0 8px 25px rgba(0,121,107,0.1)", borderLeft:"5px solid #D32F2F"}}>
                  <h4 style={{color:"gray", fontSize:"14px"}}>Certificates Earned</h4>
                  <p style={{fontSize:"36px", color:"#D32F2F", fontWeight:"bold"}}>{projects.filter(p=>p.certificate).length}</p>
                </div>
                <div className="stat-card" style={{background:"white", padding:"25px", borderRadius:"15px", boxShadow:"0 8px 25px rgba(0,121,107,0.1)", borderLeft:"5px solid #6A5ACD"}}>
                  <h4 style={{color:"gray", fontSize:"14px"}}>Total Hours</h4>
                  <p style={{fontSize:"36px", color:"#6A5ACD", fontWeight:"bold"}}>0</p>
                </div>
              </div>

              {/* COMPLETED PROJECTS TABLE */}
              <div style={{background:"white", padding:"30px", borderRadius:"15px", marginTop:"30px", boxShadow:"0 8px 25px rgba(0,121,107,0.1)"}}>
                <h3 style={{color:"#004D40", marginBottom:"15px"}}>Recent Completed Projects</h3>
                {projects.length === 0 ? (
                  <p style={{fontSize:"18px", color:"gray"}}>No completed projects yet</p>
                ) : (
                  <table>
                    <thead><tr style={{background:"#E0F7FA"}}><th>Project Name</th><th>Start Date</th><th>Completion Date</th><th>Status</th><th>Certificate</th></tr></thead>
                    <tbody>{projects.map((p,i)=>(<tr key={i}><td>{p.name}</td><td>{p.start}</td><td>{p.end}</td><td style={{color:p.status==="Yes"?"green":"orange", fontWeight:"bold"}}>{p.status}</td><td>{p.certificate? <a href={p.certificate} style={{color:"#00796B"}}>Download</a> : "-"}</td></tr>))}</tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* PROFILE WITH EDIT */}
          {page==="profile" && (
            <div>
              <h1 style={{color:"#004D40", fontSize:"32px"}}>Profile</h1>
              <div style={{background:"white", padding:"30px", borderRadius:"15px", marginTop:"20px", boxShadow:"0 8px 25px rgba(0,121,107,0.1)"}}>
                <p style={{fontSize:"18px", margin:"10px 0"}}><b>Name:</b> {user.name}</p>
                <p style={{fontSize:"18px", margin:"10px 0"}}><b>Roll No:</b> {user.roll}</p>
                <p style={{fontSize:"18px", margin:"10px 0"}}><b>Dept:</b> {user.dept}</p>
                <p style={{fontSize:"18px", margin:"10px 0"}}><b>Year:</b> {user.year}</p>
                <p style={{fontSize:"18px", margin:"10px 0"}}><b>College:</b> {user.college}</p>
                <p style={{fontSize:"18px", margin:"10px 0"}}><b>Phone:</b> {user.phone || "Not Added"}</p>
                <p style={{fontSize:"18px", margin:"10px 0"}}><b>Skills:</b> {user.skills || "Not Added"}</p>
                <button className="primary" style={{marginTop:"15px"}}>Edit Profile</button>
              </div>
            </div>
          )}

          {/* OTHER PAGES */}
          {page!=="dashboard" && page!=="profile" && (
            <div style={{background:"white", padding:"40px", borderRadius:"15px", textAlign:"center", boxShadow:"0 8px 25px rgba(0,121,107,0.1)"}}>
              <h1 style={{color:"#004D40"}}>{page} Page - Coming Soon</h1>
              <p style={{marginTop:"10px", color:"gray"}}>We are building this feature for you</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
