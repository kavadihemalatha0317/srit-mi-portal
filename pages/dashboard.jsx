import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [team, setTeam] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Current user data
    const roll = localStorage.getItem("currentUser");
    const defaultUser = {
      name:"K.Hemalatha", 
      roll:"254g1a3353", 
      dept:"CSM", 
      year:"2ND Year", 
      college:"SRIT", 
      email:"254g1a3353@srit.ac.in"
    };
    const data = JSON.parse(localStorage.getItem(roll+"_data")) || defaultUser;
    setUser(data);
    
    // TEAM DB - 3 MEMBERS
    const teamDB = [
      {id:1, name:"K.Hemalatha", roll:"254G1A3353", dept:"CSM", role:"Project Manager", year:"2ND Year", email:"254g1a3353@srit.ac.in", img:"👩‍💼"},
      {id:2, name:"M.Hemalatha", roll:"254G1A3354", dept:"CSM", role:"Frontend Developer", year:"2ND Year", email:"254g1a3354@srit.ac.in", img:"👩‍💻"},
      {id:3, name:"M.Jasmitha", roll:"254G1A3359", dept:"CSM", role:"Backend Developer", year:"2ND Year", email:"254g1a3359@srit.ac.in", img:"👩‍💻"}
    ];
    if(!localStorage.getItem("team_db")) {
      localStorage.setItem("team_db", JSON.stringify(teamDB));
    }
    setTeam(JSON.parse(localStorage.getItem("team_db")));
  },[])

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  }

  const menuItems = [
    {id:"dashboard", name:"📊 Dashboard"},
    {id:"profile", name:"👤 Profile"},
    {id:"team", name:"👥 Team Members"},
    {id:"projects", name:"💼 Projects"},
    {id:"apply", name:"📝 Apply Project"},
  ]

  return (
    <div>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: Arial, sans-serif; background:#f5f5f5; }
        
        .header { 
          background:#4A90E2; 
          color:white; 
          padding:15px 20px; 
          display:flex; 
          justify-content:space-between; 
          align-items:center; 
          position:sticky; 
          top:0; 
          z-index:100;
          box-shadow:0 2px 5px rgba(0,0,0,0.1);
        }
        
        .sidebar { 
          width:240px; 
          background:white; 
          height:calc(100vh - 60px); 
          position:fixed; 
          padding:20px; 
          box-shadow:2px 0 5px rgba(0,0,0,0.1);
          overflow-y:auto;
        }
        
        .sidebar-btn { 
          width:100%; 
          padding:12px 15px; 
          margin:5px 0; 
          border:none; 
          background:none; 
          text-align:left; 
          cursor:pointer; 
          font-size:15px; 
          border-radius:5px;
          transition:0.2s;
        }
        
        .sidebar-btn:hover { background:#E3F2FD; }
        .sidebar-btn.active { background:#4A90E2; color:white; font-weight:bold; }
        
        .main { margin-left:260px; padding:30px; }
        
        .card { 
          background:white; 
          padding:25px; 
          border-radius:8px; 
          margin-bottom:20px; 
          box-shadow:0 2px 8px rgba(0,0,0,0.1);
        }
        
        .team-grid { 
          display:grid; 
          grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); 
          gap:20px; 
        }
        
        .team-card { 
          background:white; 
          padding:25px; 
          border-radius:8px; 
          text-align:center; 
          box-shadow:0 2px 8px rgba(0,0,0,0.1);
          border-top:4px solid #4A90E2;
        }
        
        .logout-btn {
          width:100%; 
          padding:12px; 
          margin-top:20px; 
          background:#f44336; 
          color:white; 
          border:none; 
          border-radius:5px; 
          cursor:pointer;
          font-size:15px;
          font-weight:bold;
        }
        
        .logout-btn:hover { background:#d32f2f; }
        
        .hamburger { 
          display:none; 
          font-size:24px; 
          background:none; 
          border:none; 
          color:white; 
          cursor:pointer; 
        }
        
        @media (max-width: 768px) {
          .sidebar { 
            display: ${menuOpen ? 'block' : 'none'}; 
            width:100%; 
            height:auto; 
            position:relative;
          }
          .main { margin-left:0; padding:15px; }
          .hamburger { display:block; }
        }
      `}</style>

      {/* HEADER */}
      <div className="header">
        <h3>🎓 SRIT MI Portal</h3>
        <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
      </div>

      <div style={{display:"flex"}}>
        {/* SIDEBAR */}
        <div className="sidebar">
          {menuItems.map(item => (
            <button 
              key={item.id} 
              onClick={()=>{setPage(item.id); setMenuOpen(false)}} 
              className={`sidebar-btn ${page===item.id?"active":""}`}
            >
              {item.name}
            </button>
          ))}
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="main">
          
          {/* DASHBOARD PAGE */}
          {page==="dashboard" && (
            <div>
              <h1 style={{marginBottom:"20px", color:"#333"}}>Welcome, {user.name}!</h1>
              <div className="card">
                <h3 style={{color:"#4A90E2", marginBottom:"15px"}}>Dashboard Overview</h3>
                <p style={{margin:"10px 0"}}><b>Roll No:</b> {user.roll}</p>
                <p style={{margin:"10px 0"}}><b>Department:</b> {user.dept}</p>
                <p style={{margin:"10px 0"}}><b>Year:</b> {user.year}</p>
                <p style={{margin:"10px 0"}}><b>College:</b> {user.college}</p>
              </div>
            </div>
          )}

          {/* PROFILE PAGE */}
          {page==="profile" && (
            <div className="card">
              <h2 style={{color:"#4A90E2", marginBottom:"20px"}}>My Profile</h2>
              <div style={{lineHeight:"2"}}>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Roll No:</b> {user.roll}</p>
                <p><b>Department:</b> {user.dept}</p>
                <p><b>Year:</b> {user.year}</p>
                <p><b>College:</b> {user.college}</p>
                <p><b>Email:</b> {user.email}</p>
              </div>
            </div>
          )}

          {/* TEAM PAGE */}
          {page==="team" && (
            <div>
              <h2 style={{color:"#4A90E2", marginBottom:"20px"}}>Our Team Members</h2>
              <div className="team-grid">
                {team.map(member => (
                  <div key={member.id} className="team-card">
                    <div style={{fontSize:"60px", marginBottom:"15px"}}>{member.img}</div>
                    <h3 style={{color:"#333", marginBottom:"10px"}}>{member.name}</h3>
                    <p style={{margin:"8px 0"}}><b>Roll:</b> {member.roll}</p>
                    <p style={{margin:"8px 0"}}><b>Role:</b> {member.role}</p>
                    <p style={{margin:"8px 0"}}><b>Dept:</b> {member.dept}</p>
                    <p style={{margin:"8px 0"}}><b>Year:</b> {member.year}</p>
                    <p style={{margin:"8px 0", fontSize:"14px", color:"#666"}}>{member.email}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS PAGE */}
          {page==="projects" && (
            <div className="card">
              <h2 style={{color:"#4A90E2", marginBottom:"20px"}}>My Projects</h2>
              <p>No projects assigned yet.</p>
              <p style={{marginTop:"10px", color:"#666"}}>Apply for a project to get started!</p>
            </div>
          )}

          {/* APPLY PAGE */}
          {page==="apply" && (
            <div className="card">
              <h2 style={{color:"#4A90E2", marginBottom:"20px"}}>Apply for Project</h2>
              <p>Project application form will be available soon.</p>
              <p style={{marginTop:"10px", color:"#666"}}>Stay tuned!</p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
