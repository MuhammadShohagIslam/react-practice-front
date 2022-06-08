import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

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
            <div className="col-12 text-center p-5 loader">
                __ React Redux EC <LoadingOutlined /> MMERCE __
            </div>
        </>
    );
};

export default LoadingToRedirect;

