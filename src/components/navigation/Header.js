import { useState } from "react";
import { Menu } from "antd";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    ShoppingOutlined,
    SearchOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import SearchFilter from './../forms/SearchFilter';

const Header = () => {
    const [current, setCurrent] = useState("home");
    // redux user state
    const { user } = useSelector((state) => ({ ...state }));
    // redux disfatch
    const dispatch = useDispatch();
    // for redirect another page
    const navigate = useNavigate();
    const handleSignOut = async () => {
        signOut(auth)
            .then(() => {
                dispatch({
                    type: "LOGOUT_USER",
                    payload: null,
                });
                navigate("/login");
            })
            .catch((error) => {
                toast.error(`Something Went Wrong like ${error}`);
            });
    };
    const handleClick = (e) => {
        setCurrent(e.key);
    };
    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: "home",
            icon: <AppstoreOutlined />,
        },
        {
            label: <Link to="/shop">Shop</Link>,
            key: "shop",
            icon: <ShoppingOutlined />,
        },
        !user && {
            label: <Link to="/register">Register</Link>,
            key: "register",
            icon: <UserAddOutlined />,
            className: "float-end",
        },
        !user && {
            label: <Link to="/login">Login</Link>,
            key: "login",
            icon: <UserOutlined />,
            className: "float-end",
        },
        user && {
            label: `${user.email.split("@")[0]}`,
            key: "SubMenu",
            icon: <SettingOutlined />,
            className: `float-end`,
            children: [
                {
                    label: (
                        <Link to="/register" onClick={handleSignOut}>
                            Logout
                        </Link>
                    ),
                    key: "Logout",
                    icon: <LogoutOutlined />,
                    className: classes.subMenu,
                },
                user.role === "admin" && {
                    label: <Link to="/admin/dashboard">Dashboard</Link>,
                    key: "dashboard",
                    className: classes.subMenu,
                },
                user.role === "subscriber" && {
                    label: <Link to="/user/history">History</Link>,
                    key: "histroy",
                    className: classes.subMenu,
                },
            ],
        },
        {
            type:"group",
            label: <SearchFilter/>,
            key: "search",
            className: `float-end`,
        },
    ];

    return (
        <div className="container-fluid">
            <Menu
                mode="horizontal"
                defaultSelectedKeys={["home"]}
                onClick={handleClick}
                selectedKeys={[current]}
                items={items}
                className={classes.menu}
            >
            </Menu>
            
        </div>
    );
};

export default Header;

/* 
<Menu.Item key="home" icon={<AppstoreOutlined />} className={classes.anticon}>
        Home
    </Menu.Item>
    <Menu.Item key="register" icon={<UserAddOutlined />} className={classes.anticon}>
        Register
    </Menu.Item>
    <Menu.Item key="login" icon={<UserOutlined />} className={classes.anticon}>
        Login
    </Menu.Item>
    <Menu.SubMenu key="submenu" title="Username" icon={<SettingOutlined />} className={classes.anticon}>
        <Menu.Item key="two" icon={<AppstoreOutlined />} className={classes.anticon}>
            Option 1
        </Menu.Item>
        <Menu.Item key="three" icon={<AppstoreOutlined />} className={classes.anticon}>
            Option 2
        </Menu.Item>
    </Menu.SubMenu>
</Menu> 
*/
