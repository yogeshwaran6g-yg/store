import { useParams } from "react-router-dom";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/signup";
import ForgetPassword from "../components/auth/forget-password";
import ResetPassword from "../components/auth/ResetPassword";

const Auth = () => {
  const { path, token } = useParams();

  console.log("Auth path:", path);

  const pathMap = {
    login: <Login />,
    signup: <SignUp />,
    "forget-password": <ForgetPassword />,
    "reset-password": <ResetPassword token={token} />,
  };

  return pathMap[path] || <Login />;
};

export default Auth;
