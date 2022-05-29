import { useState, useEffect } from "react";
// import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
// import classes from "../../components/navigation/Header.module.css";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createOrUpdateUser } from "./../../functions/auth";
import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const Login = () => {
    const [email, setEmail] = useState(
        "muhammadshohagislam.software.e@gmail.com"
    );
    const [password, setPassword] = useState("123456");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // const { user } = useSelector((state) => ({ ...state }));

    // useEffect(() => {
    //     if (user && user.token && user.role === "subscriber") {
    //         <Navigate to ="/user/history"/>
    //     }
    //     if (user && user.token && user.role === "admin") {
    //         <Navigate to ="/admin/dashbaord"/>
    //     }
    // }, [user, navigate]);

    // if (user && user.token && user.role === "subscriber") {
    //     return <p className="text-center">Loading...</p>;
    // }
    // if (user && user.token && user.role === "admin") {
    //     return <p className="text-center">Loading...</p>;
    // }

    const navigateAdminOrUser = (data) => {
        const intendedPage = location.state;
        // check if it's intended page or not
        if (intendedPage) {
            navigate(intendedPage.from);
        } else {
            if (data && data.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/history");
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //validation
        if (email.trim() === "") {
            toast.error("Enter Email Address");
            return;
        }
        if (
            !email ||
            !email.includes("@") ||
            !password ||
            password.length < 6
        ) {
            toast.error("Invalid Input!");
            return;
        }
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            email: res.data.email,
                            name: res.data.name,
                            role: res.data.role,
                            token: idTokenResult.token,
                            _id: res.data._id,
                        },
                    });
                    navigateAdminOrUser(res.data);
                    toast.success("Login Successfully!");
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            toast.error(`Wrong Email Or Password!`);
            setLoading(false);
        }
    };
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            email: res.data.email,
                            name: res.data.name,
                            role: res.data.role,
                            token: idTokenResult.token,
                            _id: res.data._id,
                        },
                    });
                    setLoading(false);
                    navigateAdminOrUser(res.data);
                    toast.success("Login Successfully With Google!");
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            toast.error(`Unauthenticated User!`);
        }
    };
    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    autoFocus
                />
            </div>
            <hr />
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                />
            </div>

            <br />
            <button
                onClick={handleSubmit}
                className={` mb-3 btn btn-outline-primary`}
                style={{ width: "100%" }}
                disabled={!email || password.length < 6}
            >
                {" "}
                {loading ? (
                    "Loading"
                ) : (
                    <span>
                        <MailOutlined /> Login with Email/Password
                    </span>
                )}
            </button>
        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    {loginForm()}
                    <button
                        onClick={handleGoogleLogin}
                        className={`mb-3 btn btn-outline-danger`}
                        style={{ width: "100%" }}
                    >
                        <span>
                            <MailOutlined /> Login with Google
                        </span>
                    </button>
                    <Link
                        to="/forgot/password"
                        className="float-end text-danger fw-bold fs-6"
                    >
                        Forgot Password
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
