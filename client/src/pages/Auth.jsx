import { useParams } from "react-router-dom";
import Login from "../components/auth/login";
import SignUp from "../components/auth/signup";
import ForgetPassword from "../components/auth/forget-password";
import ResetPassword from "../components/auth/ResetPassword";

const Auth = ()=>{
    let path = useParams();

    let pathMap= {
        "forget-password":<ForgetPassword />,
        "login":<Login />,
        "signup":<SignUp />,
        "reset-password": <ResetPassword />,
    }

    function pathHandler(path){
        console.log("path",path.path)
        return pathMap[path.path];
    }
    return (
        <>
            {pathHandler(path)}
        </>
    )

}

export default Auth;