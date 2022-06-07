import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Fragment } from "react";
import Header from "./components/navigation/Header";
import CartDrawer from "./components/drawer/CartDrawer";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "./functions/auth";
import UserRoute from "./components/routes/UserRoute";
import History from "./pages/user/History";
import UpdatePassword from "./pages/auth/UpdatePassword";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/category/CreateCategory";
// import PublicRoute from "./components/routes/PublicRoute";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import CreateSubCategory from "./pages/admin/sub-catetegory/CreateSubCategory";
import UpdateSubCategory from "./pages/admin/sub-catetegory/UpdateSubCategory";
import CreateProduct from "./pages/admin/product/CreateProduct";
import AllProducts from "./pages/admin/product/AllProducts";
import UpdateProduct from "./pages/admin/product/UpdateProduct";
import CategoryProduct from "./pages/category/CategoryProduct";
// import SingleProduct from "./pages/products/SingleProduct";
import Products from "./pages/Products";
import SubCategoryProducts from "./pages/sub-category/SubCategoryProducts";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from './pages/Checkout';
import CreateCoupon from './pages/admin/coupon/CreateCoupon';
import Payment from './pages/Payment';
import WishList from './pages/user/WishList';

const App = () => {
    const dispatch = useDispatch();

    // to checkup firebase auth state
    useEffect(() => {
        const unsubscriber = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                currentUser(idTokenResult.token)
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
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
        // cleanup
        return () => unsubscriber();
    }, [dispatch]);
    
    return (
        <Fragment>
            <ToastContainer />
            <Header />
            <CartDrawer />
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/*" element={<PublicRoute />}>
                    <Route path="login" element={<Login />} />
                </Route> */}
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="login" element={<Login />} />

                <Route path="/register" element={<Register />} />
                <Route
                    path="/register/complete"
                    element={<CompleteRegistration />}
                />
                <Route path="/forgot/password" element={<ForgotPassword />} />
                <Route path="/user/checkout" element={<Checkout />} />

                <Route path="/*" element={<UserRoute />}>
                    <Route path="user/history" element={<History />} />
                    <Route path="user/wishlist" element={<WishList />} />
                    <Route path="user/payment" element={<Payment />} />
                    <Route
                        path="user/update-password"
                        element={<UpdatePassword />}
                    />
                </Route>
                <Route path="/*" element={<AdminRoute />}>
                    <Route
                        path="admin/dashboard"
                        element={<AdminDashboard />}
                    />
                    <Route path="admin/category" element={<CreateCategory />} />
                    <Route
                        path="admin/category/:slug"
                        element={<UpdateCategory />}
                    />
                    <Route path="admin/sub" element={<CreateSubCategory />} />
                    <Route
                        path="admin/sub/:slug"
                        element={<UpdateSubCategory />}
                    />
                    <Route
                        path="admin/update-password"
                        element={<UpdatePassword />}
                    />
                    <Route path="admin/product" element={<CreateProduct />} />
                    <Route path="admin/products" element={<AllProducts />} />
                    <Route
                        path="admin/products/:slug"
                        element={<UpdateProduct />}
                    />
                    <Route
                        path="admin/coupon"
                        element={<CreateCoupon />}
                    />
                </Route>
                <Route path="products/:slug" element={<Products />} />
                <Route
                    path="/products/categories/:slug"
                    element={<CategoryProduct />}
                />
                <Route
                    path="/products/sub-categories/:slug"
                    element={<SubCategoryProducts />}
                />
            </Routes>
        </Fragment>
    );
};

export default App;
