import React from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  return (
    <div style={{minHeight:"100vh", background:"#f8f9ff", padding:"20px"}}>
      <header style={{display:"flex", justifyContent:"space-between", background:"white", padding:"15px 30px", borderRadius:"10px"}}>
        <h2 style={{color:"#a18cd1"}}>👨‍🎓 Student Dashboard</h2>
        <button onClick={()=>router.push("/")} style={{padding:"10px 20px", background:"#ff7a93", color:"white", border:"none", borderRadius:"5px"}}>Logout</button>
      </header>
      
      <div style={{marginTop:"30px"}}>
        <h1>Welcome Student! 🚀</h1>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"20px", marginTop:"20px"}}>
          <div style={{background:"white", padding:"20px", borderRadius:"10px"}}>
            <h3>📝 My Projects</h3>
            <p>0 Projects Submitted</p>
            <button style={{padding:"10px", background:"#a18cd1", color:"white", border:"none", borderRadius:"5px"}}>Submit Project</button>
          </div>
          <div style={{background:"white", padding:"20px", borderRadius:"10px"}}>
            <h3>🏆 Certificates</h3>
            <p>0 Certificates Earned</p>
          </div>
          <div style={{background:"white", padding:"20px", borderRadius:"10px"}}>
            <h3>📊 Progress</h3>
            <p>0% Complete</p>
          </div>
        </div>
      </div>
    </div>
  )
}
