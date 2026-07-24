import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const roll = localStorage.getItem("currentUser");
    const data = JSON.parse(localStorage.getItem(roll+"_data"));
    setUser(data || {name:"Student", roll:"", dept:"CSM", year:"2nd Year", college:"SRIT"});
  },[])

  const sidebarStyle = {
    width:"100%", textAlign:"left", padding:"14px 20px", margin:"6px 0", 
    background:"white", color:"#555", border:"none", borderRadius:"10px", 
    cursor:"pointer", fontSize:"16px", fontWeight:"500",
    boxShadow:"0 4px 10px rgba(161,140,209,0.2)",
    animation:"jump 2s infinite", // JUMP EFFECT FOR ALL
    transition:"all 0.3s"
  }

  const activeSidebar = {
    ...sidebarStyle,
    background:"linear-gradient(135deg, #FF6B9D, #A18CD1)",
    color:"white", fontWeight:"bold"
  }

  const logoutStyle = {
    width:"100%", padding:"14px", marginTop:"20px", 
    background:"linear-gradient(135deg, #FF6B9D, #C44569)", 
    color:"white", border:"none", borderRadius:"10px", fontWeight:"bold",
    animation:"jump 2s infinite", boxShadow:"0 4px 15px rgba(196,69,105,0.4)"
  }

  return (
    <div>
      <style>{`
        @keyframes jump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        button:hover { transform: scale(1.03); }
        * { margin: 0; padding: 0; box-sizing: border-box; }
      `}</style>

      <div style={{display:"flex", minHeight:"100vh", background:"linear-gradient(to right,#FFE5EC,#E8DAFF)"}}>
        {/* SIDEBAR */}
        <div style={{width:"260px", background:"white", padding:"20px", boxShadow:"4px 0 20px rgba(0,0,0,0.08)"}}>
          <h3 style={{background:"linear-gradient(135deg, #FF6B9D, #A18CD1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:"25px", fontSize:"22px", fontWeight:"900"}}>Menu</h3>
          
          <button onClick={()=>setPage("profile")} style={page==="profile"?activeSidebar:sidebarStyle}>Profile</button>
          <button onClick={()=>setPage("dashboard")} style={page==="dashboard"?activeSidebar:sidebarStyle}>Dashboard</button>
          <button onClick={()=>setPage("myprojects")} style={page==="myprojects"?activeSidebar:sidebarStyle}>My Projects</button>
          <button onClick={()=>setPage("applyprojects")} style={page==="applyprojects"?activeSidebar:sidebarStyle}>Apply Projects</button>
          <button onClick={()=>setPage("createproject")} style={page==="createproject"?activeSidebar:sidebarStyle}>Create Project</button>
          <button onClick={()=>setPage("notification")} style={page==="notification"?activeSidebar:sidebarStyle}>Notification</button>
          <button onClick={()=>setPage("reviewapplications")} style={page==="reviewapplications"?activeSidebar:sidebarStyle}>Review Applications</button>
          
          {/* MY CERTIFICATE WITH SPACE + COLOR */}
          <div style={{marginTop:"20px", marginBottom:"10px"}}></div>
          <button onClick={()=>setPage("mycertificate")} style={{...sidebarStyle, background:"linear-gradient(135deg, #FFD700, #FFA500)", color:"white", fontWeight:"bold"}}>My Certificate</button>
          
          <button onClick={()=>{localStorage.removeItem("currentUser"); router.push("/");}} style={logoutStyle}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{flex:1, padding:"40px"}}>
          {page==="profile" && (
            <div>
              <h1 style={{color:"#A18CD1", fontSize:"32px"}}>Profile</h1>
              <div style={{background:"white", padding:"30px", borderRadius:"15px", marginTop:"20px", boxShadow:"0 8px 25px rgba(161,140,209,0.2)", animation:"jump 2s infinite"}}>
                <p style={{fontSize:"18px", margin:"10px 0"}}><b>Name:</b> {user.name}</p>
                <p style={{fontSize:"18px", margin:"10px 0"}}><b>Roll No:</b> {user.roll}</p>
                <p style={{fontSize:"18px", margin:"10px 0"}}><b>Dept:</b> {user.dept}</p>
                <p style={{fontSize:"18px", margin:"10px 0"}}><b>Year:</b> {user.year}</p>
                <p style={{fontSize:"18px", margin:"10px 0"}}><b>College:</b> {user.college}</p>
              </div>
            </div>
          )}

          {page==="dashboard" && (
            <div>
              <h1 style={{color:"#A18CD1", fontSize:"32px"}}>Welcome {user.name}! 👋</h1> {/* HI EMOJI ONLY HERE */}
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"25px", marginTop:"30px"}}>
                <div style={{background:"white", padding:"30px", borderRadius:"15px", boxShadow:"0 8px 25px rgba(161,140,209,0.2)", animation:"jump 2s infinite"}}>
                  <h3 style={{color:"#555"}}>No. of Projects Done</h3>
                  <p style={{fontSize:"40px", color:"#A18CD1", fontWeight:"bold"}}>0</p>
                </div>
                <div style={{background:"white", padding:"30px", borderRadius:"15px", boxShadow:"0 8px 25px rgba(161,140,209,0.2)", animation:"jump 2s infinite"}}>
                  <h3 style={{color:"#555"}}>Applications</h3>
                  <p style={{fontSize:"40px", color:"#FF6B9D", fontWeight:"bold"}}>0</p>
                </div>
              </div>
            </div>
          )}

          {page!=="profile" && page!=="dashboard" && (
            <div style={{background:"white", padding:"40px", borderRadius:"15px", textAlign:"center", animation:"jump 2s infinite"}}>
              <h1 style={{color:"#A18CD1"}}>{page} Page - Coming Soon</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
