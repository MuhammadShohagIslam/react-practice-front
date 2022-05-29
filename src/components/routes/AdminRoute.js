import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { adminUser } from "./../../functions/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            adminUser(user.token)
                .then((res) => {
                    setOk(true);
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                    setOk(false);
                });
        }
    }, [user]);
    console.log(user)

    return ok && user && user.role === "admin" ? (
        <Outlet />
    ) : (
        <LoadingToRedirect path="/" />
    );
};

export default AdminRoute;
