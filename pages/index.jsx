import React, { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  if (page === "home") {
    return <div style={{fontFamily:"Arial",background:"linear-gradient(to right,#fff0f6,#f3e8ff)",minHeight:"100vh"}}><header style={{display:"flex",justifyContent:"space-between",padding:"15px 20px",background:"white"}}><h2 style={{color:"#a18cd1"}}>🎓 SRIT Mini Internship Portal</h2><button onClick={() => setPage("login")} style={{padding:"10px 25px",background:"#a18cd1",color:"white",border:"none",borderRadius:"5px"}}>Login</button></header><div style={{textAlign:"center",padding:"80px 20px"}}><h1 style={{fontSize:"40px",color:"#a18cd1"}}>Build Projects. Gain Experience. Get Certified 🚀</h1><button onClick={() => setPage("login")} style={{marginTop:"30px",padding:"18px 50px",background:"#ff7a93",color:"white",border:"none",borderRadius:"8px"}}>Get Started</button></div></div>
  }
  return <div style={{ padding: "50px", textAlign: "center" }}><h1>Dashboard Coming Soon 😅</h1></div>;
}
