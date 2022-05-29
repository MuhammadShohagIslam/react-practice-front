import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LoadingToRedirect = ({path}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => --prevCount);
        }, 1000);

        count === 0 && navigate(path);
        return () => clearInterval(timer);
    }, [count, navigate, path]);

    return (
        <div className="container text-center">
            <p>Redirecting you within {count} second</p>
        </div>
    );
};

export default LoadingToRedirect;
