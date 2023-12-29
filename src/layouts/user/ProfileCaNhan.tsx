import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const Test = ()=>{
    const [username, setUsername] = useState<string | null> (null);
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            const userData = jwtDecode(token);
            console.log(userData);
            if(userData){
                setUsername(userData.sub+'');
            }
        }
    }, [])
    return(
        <div className="text-center mt-4">
            {
                username&& <h3>Xin chào, {username}!</h3>
            }
        </div>
    );
}
export default Test;