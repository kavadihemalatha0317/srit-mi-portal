import React, { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  
  const buttonStyle = {
    padding:"18px 50px",
    background:"linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)", // THICK PINK
    color:"white",
    border:"none",
    borderRadius:"12px",
    fontSize:"18px",
    fontWeight:"bold",
    cursor:"pointer",
    boxShadow:"0 8px 20px rgba(196, 69, 105, 0.4)",
    transition:"all 0.3s ease",
    animation:"jump 2s infinite" // JUMPING EFFECT
  }

   const team = [
  {
    name:"K.Hemalatha", 
    roll:"Rollno: 254G1A3353",
    dept:"Dept: CSM", 
    role:"Project Manager", 
    year:"2nd Year"
  },
  {
    name:"M.Hemalatha", 
    roll:"Rollno: 254G1A3354",
    dept:"Dept: CSM", 
    role:"Frontend Developer", 
    year:"2nd Year"
  },
  {
    name:"M.Jasmitha", 
    roll:"Rollno: 254G1A3359",
    dept:"Dept: CSM", 
    role:"Backend Developer", 
    year:"2nd Year"
  }
]

  if (page === "home") {
    return (
      <div>
        <style>{`
          @keyframes jump {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .btn:hover { transform: scale(1.05); box-shadow: 0 12px 30px rgba(196, 69, 105, 0.6); }
        `}</style>
        
        <div style={{fontFamily:"Arial", background:"linear-gradient(to right,#FFE5EC,#E8DAFF)", minHeight:"100vh"}}>
          
          {/* HEADER - THICK COLOR */}
          <header style={{display:"flex",justifyContent:"space-between",padding:"20px 40px",background:"white",boxShadow:"0 4px 15px rgba(0,0,0,0.1)"}}>
            <h2 style={{color:"#C44569", fontSize:"28px"}}>🎓 SRIT Mini Internship Portal</h2>
            <button className="btn" onClick={() => window.location.href="/login"} style={{...buttonStyle, padding:"12px 30px", fontSize:"16px", animation:"none"}}>Login</button>
          </header>
          
          {/* HERO SECTION */}
          <div style={{textAlign:"center",padding:"100px 20px"}}>
            <h1 style={{fontSize:"48px", color:"#C44569", fontWeight:"900", textShadow:"2px 2px 4px rgba(0,0,0,0.1)"}}>
              Build Projects. Gain Experience. Get Certified 🚀
            </h1>
            <p style={{fontSize:"20px", color:"#555", marginTop:"20px"}}>Join SRIT's official mini internship program</p>
            <button className="btn" onClick={() => window.location.href="/login"} style={buttonStyle}>Get Started</button>
          </div>

          {/* TEAM MEMBERS SECTION */}
          <div style={{padding:"60px 40px", background:"white"}}>
            <h2 style={{textAlign:"center", color:"#C44569", fontSize:"36px", marginBottom:"40px"}}>👥 Meet Our Team</h2>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:"30px", maxWidth:"1000px", margin:"0 auto"}}>
              {team.map((member, i) => (
                <div key={i} style={{background:"linear-gradient(135deg, #FF6B9D, #C44569)", padding:"30px", borderRadius:"15px", textAlign:"center", color:"white", boxShadow:"0 8px 20px rgba(196,69,105,0.3)"}}>
                  <div style={{fontSize:"50px"}}>👨‍💻</div>
                  <h3 style={{marginTop:"10px"}}>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <footer style={{textAlign:"center", padding:"20px", background:"#C44569", color:"white"}}>
            © 2026 SRIT Mini Internship Portal. Made with ❤️
          </footer>
        </div>
      </div>
    )
  }
  return <div style={{ padding: "50px", textAlign: "center" }}><h1>Dashboard Coming Soon 😅</h1></div>;
}
