import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function App() {
  const router = useRouter();
  const [team, setTeam] = useState([]);

  useEffect(()=>{
    // TEAM DB - 3 MEMBERS
    const teamDB = [
      {id:1, name:"K.Hemalatha", roll:"254G1A3353", dept:"CSM", role:"Project Manager", year:"2ND Year", email:"254g1a3353@srit.ac.in", img:"👩‍💼"},
      {id:2, name:"M.Hemalatha", roll:"254G1A3354", dept:"CSM", role:"Frontend Developer", year:"2ND Year", email:"254g1a3354@srit.ac.in", img:"👩‍💻"},
      {id:3, name:"M.Jasmitha", roll:"254G1A3359", dept:"CSM", role:"Backend Developer", year:"2ND Year", email:"254g1a3359@srit.ac.in", img:"👩‍💻"}
    ];
    // First time ayithe save cheyi
    if(!localStorage.getItem("team_db")) {
      localStorage.setItem("team_db", JSON.stringify(teamDB));
    }
    setTeam(JSON.parse(localStorage.getItem("team_db")));
  },[])

  const buttonStyle = {
    padding:"16px 40px",
    background:"linear-gradient(135deg, #FF6B9D 0%, #A18CD1 50%, #C44569 100%)",
    color:"white", border:"none", borderRadius:"12px", fontSize:"18px", fontWeight:"bold",
    cursor:"pointer", boxShadow:"0 8px 20px rgba(161, 140, 209, 0.4)"
  }

  return (
    <div>
      <style>{`
        @keyframes jumpOnce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
        .jump-hover:hover {
          animation: jumpOnce 0.5s ease; /* MOUSE PETTINAPPUDE MATRAM */
        }
        .team-card {
          background:linear-gradient(135deg, #FF6B9D, #A18CD1, #C44569); 
          padding:30px; border-radius:20px; text-align:center; color:white;
          box-shadow:0 8px 20px rgba(161,140,209,0.3);
          transition: all 0.3s;
        }
        .header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:20px 40px;
          background:white;
          box-shadow:0 4px 15px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        /* MOBILE RESPONSIVE */
        @media (max-width: 768px) {
          .header { padding: 15px 20px; flex-direction: column; gap: 15px; }
          .hero h1 { font-size: 32px !important; }
          .hero { padding: 60px 20px !important; }
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
      `}</style>

      <div style={{fontFamily:"'Segoe UI', Arial", background:"linear-gradient(to right,#FFE5EC,#E8DAFF)", minHeight:"100vh"}}>
        
        {/* HEADER */}
        <header className="header">
          <h2 style={{color:"#A18CD1", fontSize:"28px", fontWeight:"900"}}>🎓 SRIT MI Portal</h2>
          <button onClick={() => router.push("/login")} style={buttonStyle} className="jump-hover">Login</button>
        </header>

        {/* HERO SECTION */}
        <div className="hero" style={{textAlign:"center",padding:"100px 20px"}}>
          <h1 style={{fontSize:"48px", background:"linear-gradient(135deg, #FF6B9D, #A18CD1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontWeight:"900", marginBottom:"20px"}}>
            Build Projects. Gain Experience. Get Certified
          </h1>
          <p style={{fontSize:"20px", color:"#666", maxWidth:"700px", margin:"0 auto"}}>
            A platform for SRIT students to work on projects,enhance skills, and earn certificates.
          </p>
        </div>

        {/* TEAM SECTION */}
        <div style={{padding:"60px 40px", background:"white"}}>
          <h2 style={{textAlign:"center", background:"linear-gradient(135deg, #FF6B9D, #A18CD1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontSize:"36px", marginBottom:"50px"}}>
            Meet Our Team
          </h2>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"30px", maxWidth:"1100px", margin:"0 auto"}}>
            {team.map((member) => (
              <div key={member.id} className="team-card jump-hover">
                <div style={{fontSize:"60px", marginBottom:"15px"}}>{member.img}</div>
                <h3 style={{margin:"10px 0 8px 0", fontSize:"24px"}}>{member.name}</h3>
                <p style={{margin:"5px 0", fontSize:"15px", opacity:0.9}}>Roll: {member.roll}</p>
                <p style={{margin:"5px 0", fontSize:"15px", opacity:0.9}}>Dept: {member.dept}</p>
                <p style={{margin:"8px 0", fontSize:"16px", fontWeight:"700", background:"rgba(255,255,255,0.2)", padding:"8px", borderRadius:"8px"}}>{member.role}</p>
                <p style={{margin:"5px 0", fontSize:"15px", opacity:0.9}}>{member.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{background:"#A18CD1", color:"white", textAlign:"center", padding:"30px 20px"}}>
          <p style={{fontSize:"16px"}}>© 2026 SRIT MI Portal | Made with ❤️ by Team CSM</p>
        </footer>
      </div>
    </div>
  )
}
