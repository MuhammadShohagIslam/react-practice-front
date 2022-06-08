import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children }) => {
    const [ok, setOk] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token && user.role === "subscriber") {
            setOk(true);
        }
    }, [user]);

    return ok ? children : <LoadingToRedirect />;
};

export default UserRoute;
