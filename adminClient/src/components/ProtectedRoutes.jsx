import {React} from "react";
import {useAuthContext} from "@context/AuthContext";

const ProtectedRoutes = ({children}) => {
    const { isAuthenticated, loading } = useAuthContext();
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
export default ProtectedRoutes;