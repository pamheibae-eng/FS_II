import { getToken } from "../utils/auth";


function Dashboard() {

    const token = getToken();


    return (
        <div>

            <h2>Dashboard</h2>


            {
                token ?
                <p>User authenticated successfully using JWT Token ✅</p>
                :
                <p>Please login first ❌</p>
            }


        </div>
    );
}


export default Dashboard;