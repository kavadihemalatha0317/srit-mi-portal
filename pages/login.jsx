import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedPass = localStorage.getItem(rollNo);
    if(rollNo && savedPass) setIsFirstTime(false);
    else if(rollNo) setIsFirstTime(true);
  }, [rollNo]);

  const handleLogin = (e) => {
    e.preventDefault();
    const savedPass = localStorage.getItem(rollNo);

    if(isFirstTime) {
      localStorage.setItem(rollNo, password);
      alert("Password Set Successfully! Now Login");
      setIsFirstTime(false);
      setPassword("");
    } else {
      if(password === savedPass) {
        if(rollNo === "254G1A3353") router.push("/admin"); // K.Hemalatha = Admin
        else router.push("/dashboard");
      } else {
        alert("Wrong Roll No or Password!");
      }
    }
  }

  return (
    <div style={{minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", background:"linear-gradient(135deg,#FFE5EC,#E8DAFF)"}}>
      <div style={{background:"white", padding:"40px", borderRadius:"15px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", width:"350px"}}>
        <h2 style={{textAlign:"center", background:"linear-gradient(135deg, #FF6B9D, #A18CD1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>🎓 Student Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Roll No: 254G1A3353"
            value={rollNo}
            onChange={(e)=>setRollNo(e.target.value.toUpperCase())}
            style={{width:"100%", padding:"12px", margin:"10px 0", border:"2px solid #A18CD1", borderRadius:"5px"}}
            required
          />
          <input
            type="password"
            placeholder={isFirstTime? "Set Your Password" : "Enter Password"}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{width:"100%", padding:"12px", margin:"10px 0", border:"2px solid #A18CD1", borderRadius:"5px"}}
            required
          />
          <button type="submit" style={{width:"100%", padding:"12px", background:"linear-gradient(135deg, #FF6B9D, #A18CD1)", color:"white", border:"none", borderRadius:"5px", fontSize:"16px", fontWeight:"bold"}}>
            {isFirstTime? "Set Password & Continue" : "Login"}
          </button>
        </form>
        <p style={{fontSize:"12px", marginTop:"15px", color:"gray", textAlign:"center"}}>
          {isFirstTime? "This is your first login. Set a password" : "Enter your roll no and password"}
        </p>
      </div>
    </div>
  )
}
