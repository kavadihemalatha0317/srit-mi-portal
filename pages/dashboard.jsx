import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [page, setPage] = useState("profile");
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const roll = localStorage.getItem("currentUser");
    const data = JSON.parse(localStorage.getItem(roll+"_data"));
    setUser(data || {});
  },[])

  const sidebarBtn = (label) => (
    <button onClick={()=>setPage(label.toLowerCase().replace(" ",""))}
      style={{width:"100%", textAlign:"left", padding:"12px", margin:"5px 0", background:page===label.toLowerCase().replace(" ","")?"#A18CD1":"transparent", color:page===label.toLowerCase().replace(" ","")?"white":"#555", border:"none", borderRadius:"8px", cursor:"pointer"}}>
      {label}
    </button>
  )

  return (
    <div style={{display:"flex", minHeight:"100vh", background:"#f8f9ff"}}>
      {/* SIDEBAR */}
      <div style={{width:"250px", background:"white", padding:"20px", boxShadow:"2px 0 10px rgba(0,0,0,0.1)"}}>
        <h3 style={{color:"#A18CD1", marginBottom:"20px"}}>🎓 Menu</h3>
        {sidebarBtn("Profile")}
        {sidebarBtn("Dashboard")}
        {sidebarBtn("My Projects")}
        {sidebarBtn("Apply Projects")}
        {sidebarBtn("Create Project")}
        {sidebarBtn("Notification")}
        {sidebarBtn("Review Applications")}
        {sidebarBtn("My Certificate")}
        <button onClick={()=>{localStorage.removeItem("currentUser"); router.push("/");}}
          style={{width:"100%", padding:"12px", marginTop:"20px", background:"#FF6B9D", color:"white", border:"none", borderRadius:"8px"}}>Logout</button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{flex:1, padding:"30px"}}>
        {page==="profile" && (
          <div>
            <h1>Profile 👤</h1>
            <div style={{background:"white", padding:"20px", borderRadius:"10px", marginTop:"20px"}}>
              <p><b>Name:</b> {user.name}</p>
              <p><b>Roll No:</b> {user.roll}</p>
              <p><b>Dept:</b> {user.dept}</p>
              <p><b>Year:</b> {user.year}</p>
              <p><b>College:</b> {user.college}</p>
            </div>
          </div>
        )}
        {page==="dashboard" && (
          <div>
            <h1>Welcome {user.name}! 😊</h1>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginTop:"20px"}}>
              <div style={{background:"white", padding:"20px", borderRadius:"10px"}}>
                <h3>No. of Projects Done</h3>
                <p style={{fontSize:"32px", color:"#A18CD1"}}>0</p>
              </div>
              <div style={{background:"white", padding:"20px", borderRadius:"10px"}}>
                <h3>Applications</h3>
                <p style={{fontSize:"32px", color:"#FF6B9D"}}>0</p>
              </div>
            </div>
          </div>
        )}
        {/* MIGATA PAGES KI "Coming Soon" */}
        {page!=="profile" && page!=="dashboard" && <h1>{page} Page - Coming Soon 😅</h1>}
      </div>
    </div>
  )
}
