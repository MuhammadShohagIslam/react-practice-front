import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.token) {
            navigate("/");
        }
    }, [navigate, user]);

    if (user && user.token) {
        return <p className="text-center">Loading...</p>;
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const actionCodeSettings = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };

        // validation
        if (email.trim() === "") {
            toast.error("Enter Email Address");
            return;
        }
        if (!email || !email.includes("@")) {
            toast.error("Enter Valid Email Address");
            return;
        }
        setLoading(true);
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                toast.success(
                    `Email is sent to the ${email}.Click the link to complete your registration`
                );
                // save the user email for local storage
                window.localStorage.setItem("emailForSignIn", email);
                // set loading false
                setLoading(false);
                //clear state
                setEmail("");
            })
            .catch((error) => {
                toast.error(
                    `Something wrong! for registration like ${error.message}`
                );
                setLoading(false);
            });
    };

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                autoFocus
            />
            <br />
            <button type="submit" className="btn btn-outline-info">
                {loading ? "Loading" : "Register"}
            </button>
        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;
