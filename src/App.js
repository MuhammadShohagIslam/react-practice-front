import { Fragment } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { currentUser } from "./functions/auth";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/navigation/Header";
import CartDrawer from "./components/drawer/CartDrawer";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UserRoute from "./components/routes/UserRoute";
import History from "./pages/user/History";
import UpdatePassword from "./pages/auth/UpdatePassword";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/category/CreateCategory";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import CreateSubCategory from "./pages/admin/sub-catetegory/CreateSubCategory";
import UpdateSubCategory from "./pages/admin/sub-catetegory/UpdateSubCategory";
import CreateProduct from "./pages/admin/product/CreateProduct";
import AllProducts from "./pages/admin/product/AllProducts";
import UpdateProduct from "./pages/admin/product/UpdateProduct";
import CategoryProduct from "./pages/category/CategoryProduct";
import Products from "./pages/Products";
import SubCategoryProducts from "./pages/sub-category/SubCategoryProducts";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CreateCoupon from "./pages/admin/coupon/CreateCoupon";
import Payment from "./pages/Payment";
import WishList from "./pages/user/WishList";

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
                <Route path="products/:slug" element={<Products />} />
                <Route
                    path="/products/categories/:slug"
                    element={<CategoryProduct />}
                />
                <Route
                    path="/products/sub-categories/:slug"
                    element={<SubCategoryProducts />}
                />
                <Route
                    path="/user/history"
                    element={
                        <UserRoute>
                            <History />
                        </UserRoute>
                    }
                />
                <Route
                    path="/user/update-password"
                    element={
                        <UserRoute>
                            <UpdatePassword />
                        </UserRoute>
                    }
                />
                <Route
                    path="/user/wishlist"
                    element={
                        <UserRoute>
                            <WishList />
                        </UserRoute>
                    }
                />
                <Route
                    path="/user/payment"
                    element={
                        <UserRoute>
                            <Payment />
                        </UserRoute>
                    }
                />
                {/* <Route path="/*" element={<UserRoute />}>
                    <Route path="user/history" element={<History />} />
                    <Route path="user/wishlist" element={<WishList />} />
                    <Route path="user/payment" element={<Payment />} />
                    <Route
                        path="user/update-password"
                        element={<UpdatePassword />}
                    />
                </Route> */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/category"
                    element={
                        <AdminRoute>
                            <CreateCategory />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/category/:slug"
                    element={
                        <AdminRoute>
                            <UpdateCategory />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/sub"
                    element={
                        <AdminRoute>
                            <CreateSubCategory />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/sub/:slug"
                    element={
                        <AdminRoute>
                            <UpdateSubCategory />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/product"
                    element={
                        <AdminRoute>
                            <CreateProduct />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/products"
                    element={
                        <AdminRoute>
                            <AllProducts />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/products/:slug"
                    element={
                        <AdminRoute>
                            <UpdateProduct />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/coupon"
                    element={
                        <AdminRoute>
                            <CreateCoupon />
                        </AdminRoute>
                    }
                />
                 <Route
                    path="/admin/wishlist"
                    element={
                        <AdminRoute>
                            <WishList />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/update-password"
                    element={
                        <AdminRoute>
                            <UpdatePassword />
                        </AdminRoute>
                    }
                />

                {/* <Route path="/*" element={<AdminRoute />}>
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
                    <Route path="admin/coupon" element={<CreateCoupon />} />
                </Route> */}
            </Routes>
        </Fragment>
    );
};

export default App;
