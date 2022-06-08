import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children }) => {
    const [ok, setOk] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token && user.role === "subscriber") {
            console.log("Subscriber")
            setOk(true);
        }
    }, [user]);

    return ok ? children : <LoadingToRedirect />;
};

export default UserRoute;

// import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import LoadingToRedirect from "./LoadingToRedirect";

// const UserRoute = () => {
//     const { user } = useSelector((state) => ({ ...state }));

//     return user && user.token && user.role === "subscriber" ? (
//         <Outlet />
//     ) : (
//         <LoadingToRedirect path="/" />
//     );
// };

// export default UserRoute;
