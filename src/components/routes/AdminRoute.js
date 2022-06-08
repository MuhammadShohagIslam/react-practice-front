import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentUser } from "../../functions/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            currentUser(user.token)
                .then((res) => {
                    console.log("Current Admin User", res);
                    setOk(true);
                })
                .catch((error) => {
                    console.log(error);
                    setOk(false);
                });
        }
    }, [user]);

    return ok && user?.role === "admin" ? children : <LoadingToRedirect />;
};

export default AdminRoute;

