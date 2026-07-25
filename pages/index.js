import React from "react";
import { useRouter } from "next/router"; // router add chesa

export default function App() {
  const router = useRouter(); // idhi add chesa

  const buttonStyle = {
    padding:"16px 40px",
    background:"linear-gradient(135deg, #FF6B9D 0%, #A18CD1 50%, #C44569 100%)",
    color:"white", border:"none", borderRadius:"12px", fontSize:"18px", fontWeight:"bold",
    cursor:"pointer", boxShadow:"0 8px 20px rgba(161, 140, 209, 0.4)"
  }

  const team = [
    {name:"K.Hemalatha", roll:"Rollno: 254G1A3353", dept:"Dept: CSM", role:"Project Manager", year:"2nd Year"},
    {name:"M.Hemalatha", roll:"Rollno: 254G1A3354", dept:"Dept: CSM", role:"Frontend Developer", year:"2nd Year"},
    {name:"M.Jasmitha", roll:"Rollno: 254G1A3359", dept:"Dept: CSM", role:"Backend Developer", year:"2nd Year"} // spelling fix
  ]

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
          padding:25px; border-radius:15px; text-align:center; color:white;
          box-shadow:0 8px 20px rgba(161,140,209,0.3)
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
      `}</style>

      <div style={{fontFamily:"'Segoe UI', Arial", background:"linear-gradient(to right,#FFE5EC,#E8DAFF)", minHeight:"100vh"}}>
        <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 40px",background:"white",boxShadow:"0 4px 15px rgba(0,0,0,0.1)"}}>
          <h2 style={{color:"#A18CD1", fontSize:"28px", fontWeight:"900"}}>SRIT MI Portal</h2>
          <button onClick={() => router.push("/login")} style={buttonStyle} className="jump-hover">Login</button> {/* router.push marchanu */}
        </header>

        <div style={{textAlign:"center",padding:"100px 20px"}}>
          <h1 style={{fontSize:"48px", background:"linear-gradient(135deg, #FF6B9D, #A18CD1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontWeight:"900"}}>
            Build Projects. Gain Experience. Get Certified
          </h1>
        </div>

        <div style={{padding:"60px 40px", background:"white"}}>
          <h2 style={{textAlign:"center", background:"linear-gradient(135deg, #FF6B9D, #A18CD1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontSize:"36px", marginBottom:"40px"}}>Meet Our Team</h2>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))", gap:"30px", maxWidth:"1000px", margin:"0 auto"}}>
            {team.map((member, i) => (
              <div key={i} className="team-card jump-hover"> {/* HOVER LO MATRAM JUMP */}
                <div style={{fontSize:"50px"}}>👩‍💻</div>
                <h3 style={{margin:"10px 0 5px 0", fontSize:"22px"}}>{member.name}</h3>
                <p style={{margin:"5px 0", fontSize:"14px"}}>{member.roll}</p>
                <p style={{margin:"5px 0", fontSize:"14px"}}>{member.dept}</p>
                <p style={{margin:"5px 0", fontSize:"15px", fontWeight:"600"}}>{member.role}</p>
                <p style={{margin:"5px 0", fontSize:"14px"}}>{member.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
