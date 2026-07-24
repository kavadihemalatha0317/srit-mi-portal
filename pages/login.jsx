import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Ippatiki demo login. Tarvatha Firebase connect cheddam
    if(email === "student@srit.com" && password === "123456") {
      router.push("/dashboard");
    } else if(email === "admin@srit.com" && password === "admin123") {
      router.push("/admin");
    } else {
      alert("Wrong Email or Password! Demo: student@srit.com / 123456");
    }
  }

  return (
    <div style={{minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", background:"linear-gradient(to right,#fff0f6,#f3e8ff)"}}>
      <div style={{background:"white", padding:"40px", borderRadius:"15px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", width:"350px"}}>
        <h2 style={{textAlign:"center", color:"#a18cd1"}}>🎓 Student Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            style={{width:"100%", padding:"12px", margin:"10px 0", border:"1px solid #ddd", borderRadius:"5px"}}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            style={{width:"100%", padding:"12px", margin:"10px 0", border:"1px solid #ddd", borderRadius:"5px"}}
            required
          />
          <button type="submit" style={{width:"100%", padding:"12px", background:"#a18cd1", color:"white", border:"none", borderRadius:"5px", fontSize:"16px", marginTop:"10px"}}>
            Login
          </button>
        </form>
        <p style={{fontSize:"12px", marginTop:"15px", color:"gray"}}>Demo Student: student@srit.com / 123456</p>
        <p style={{fontSize:"12px", color:"gray"}}>Demo Admin: admin@srit.com / admin123</p>
      </div>
    </div>
  )
}
