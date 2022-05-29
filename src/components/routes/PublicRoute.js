import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
    const { user } = useSelector((state) => ({ ...state }));
    console.log(user)

    return !user && user === null ? <Outlet/> : <Navigate to="/login" />;
};

export default PublicRoute;
