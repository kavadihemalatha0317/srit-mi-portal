import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedPass = localStorage.getItem(rollNo);
    setIsFirstTime(rollNo &&!savedPass);
  }, [rollNo]);

  const handleLogin = (e) => {
    e.preventDefault();
    const savedPass = localStorage.getItem(rollNo);
    if(isFirstTime) {
      localStorage.setItem(rollNo, password);
      localStorage.setItem(rollNo+"_data", JSON.stringify({name:"Student", roll:rollNo, dept:"CSM", year:"2nd Year", college:"SRIT"}));
      alert("Password Set! Now Login");
      setIsFirstTime(false); setPassword("");
    } else {
      if(password === savedPass) {
        localStorage.setItem("currentUser", rollNo);
        router.push("/dashboard");
      } else alert("Wrong Roll No or Password!");
    }
  }

  return (
    <div style={{minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", background:"linear-gradient(135deg,#FFE5EC,#E8DAFF)"}}>
      <div style={{background:"white", padding:"40px", borderRadius:"15px", width:"350px"}}>
        <h2 style={{textAlign:"center", background:"linear-gradient(135deg, #FF6B9D, #A18CD1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Enter Roll No" value={rollNo} onChange={(e)=>setRollNo(e.target.value.toUpperCase())} style={{width:"100%", padding:"12px", margin:"10px 0", border:"2px solid #A18CD1", borderRadius:"5px"}} required/>
          <input type="password" placeholder={isFirstTime? "Set Password" : "Enter Password"} value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:"100%", padding:"12px", margin:"10px 0", border:"2px solid #A18CD1", borderRadius:"5px"}} required/>
          <button type="submit" style={{width:"100%", padding:"12px", background:"linear-gradient(135deg, #FF6B9D, #A18CD1)", color:"white", border:"none", borderRadius:"5px", fontWeight:"bold"}}>
            {isFirstTime? "Set Password" : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}
