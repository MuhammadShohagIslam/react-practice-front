/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { MailOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createOrUpdateUser } from "./../../functions/auth";
import { useSelector } from "react-redux";

const Login = () => {
    const [email, setEmail] = useState(
        "muhammadshohagislam.software.e@gmail.com"
    );
    const [password, setPassword] = useState("123456");
    const [loading, setLoading] = useState({
        userLoading: false,
        googleUserLoading: false,
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        let intended = location.state;
        if (intended) {
            return;
        } else {
            if (
                user &&
                user.token &&
                (user.role === "admin" || user.role === "subscriber")
            ) {
                navigate("/");
            } else {
                navigate("/login");
            }
        }
    }, [user, navigate]);

    const navigateAdminOrUser = (data) => {
        const intendedPage = location.state;
        // check if it's intended page or not
        if (intendedPage) {
            navigate(intendedPage.from);
            return;
        } else {
            if (data && data.role === "admin") {
                setTimeout(() => {
                    navigate("/admin/dashboard");
                }, 300);
            } else {
                setTimeout(() => {
                    navigate("/user/history");
                }, 300);
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
        setLoading({
            ...loading,
            userLoading: true,
        });
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
                    setLoading({
                        ...loading,
                        userLoading: false,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            toast.error(`Wrong Email Or Password!`);
            setLoading({
                ...loading,
                userLoading: true,
            });
        }
    };
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            setLoading({
                ...loading,
                googleUserLoading: true,
            });
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
                    setLoading({
                        ...loading,
                        googleUserLoading: false,
                    });
                    navigateAdminOrUser(res.data);
                    toast.success("Login Successfully With Google!");
                })
                .catch((error) => {
                    console.log(error);
                    setLoading({
                        ...loading,
                        googleUserLoading: false,
                    });
                });
        } catch (error) {
            toast.error(`Unauthenticated User!`);
            setLoading({
                ...loading,
                googleUserLoading: false,
            });
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
                className="mb-3 btn btn-outline-info"
                style={{ width: "100%" }}
                disabled={!email || password.length < 6 || loading.userLoading}
            >
                {" "}
                {loading.userLoading ? (
                    "Loading..."
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
                        disabled={loading.googleUserLoading}
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
