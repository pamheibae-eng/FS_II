import { useState } from "react";
import { saveToken } from "../utils/auth";


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = () => {

        // Mock authentication
        if (username === "admin" && password === "1234") {

            // Simulated JWT token
            const fakeJWT =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo.token";


            saveToken(fakeJWT);

            alert("Login Successful ✅");

        } 
        else {

            alert("Invalid Username or Password ❌");

        }

    };


    return (
        <div>

            <h2>JWT Authentication Login</h2>


            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />


            <br /><br />


            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />


            <br /><br />


            <button onClick={handleLogin}>
                Login
            </button>


        </div>
    );
}


export default Login;