import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = () => {
    const { user } = useSelector((state) => ({ ...state }));

    return user && user.token && user.role === "subscriber" ? (
        <Outlet />
    ) : (
        <LoadingToRedirect path="/" />
    );
};

export default UserRoute;
