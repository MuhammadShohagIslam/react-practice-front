import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        count === 0 && navigate("/");
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    return (
        <>
            <div className="container p-5">
                <h1>Redirecting you in {count} seconds</h1>
            </div>
        </>
    );
};

export default LoadingToRedirect;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// const LoadingToRedirect = ({path}) => {
//     const [count, setCount] = useState(3);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCount((prevCount) => --prevCount);
//         }, 1000);

//         count === 0 && navigate(path);
//         return () => clearInterval(timer);
//     }, [count, navigate, path]);

//     return (
//         <div className="container text-center">
//             <p>Redirecting you within {count} second</p>
//         </div>
//     );
// };

// export default LoadingToRedirect;
