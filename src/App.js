import { lazy, Suspense, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { currentUser } from "./functions/auth";
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/navigation/Header"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));
const CategoryProduct = lazy(() => import("./pages/category/CategoryProduct"));
const Products = lazy(() => import("./pages/Products"));
const SubCategoryProducts = lazy(() =>
    import("./pages/sub-category/SubCategoryProducts")
);
const CartDrawer = lazy(() => import("./components/drawer/CartDrawer"));
const CompleteRegistration = lazy(() =>
    import("./pages/auth/CompleteRegistration")
);
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const UpdatePassword = lazy(() => import("./pages/auth/UpdatePassword"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const History = lazy(() => import("./pages/user/History"));
const WishList = lazy(() => import("./pages/user/WishList"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CreateCategory = lazy(() =>
    import("./pages/admin/category/CreateCategory")
);
const UpdateCategory = lazy(() =>
    import("./pages/admin/category/UpdateCategory")
);
const CreateSubCategory = lazy(() =>
    import("./pages/admin/sub-catetegory/CreateSubCategory")
);
const UpdateSubCategory = lazy(() =>
    import("./pages/admin/sub-catetegory/UpdateSubCategory")
);
const CreateProduct = lazy(() => import("./pages/admin/product/CreateProduct"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const UpdateProduct = lazy(() => import("./pages/admin/product/UpdateProduct"));
const CreateCoupon = lazy(() => import("./pages/admin/coupon/CreateCoupon"));
// import Home from "./pages/Home";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Header from "./components/navigation/Header";
// import CartDrawer from "./components/drawer/CartDrawer";
// import CompleteRegistration from "./pages/auth/CompleteRegistration";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import UserRoute from "./components/routes/UserRoute";
// import History from "./pages/user/History";
// import UpdatePassword from "./pages/auth/UpdatePassword";
// import AdminRoute from "./components/routes/AdminRoute";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import CreateCategory from "./pages/admin/category/CreateCategory";
// import UpdateCategory from "./pages/admin/category/UpdateCategory";
// import CreateSubCategory from "./pages/admin/sub-catetegory/CreateSubCategory";
// import UpdateSubCategory from "./pages/admin/sub-catetegory/UpdateSubCategory";
// import CreateProduct from "./pages/admin/product/CreateProduct";
// import AllProducts from "./pages/admin/product/AllProducts";
// import UpdateProduct from "./pages/admin/product/UpdateProduct";
// import CategoryProduct from "./pages/category/CategoryProduct";
// import Products from "./pages/Products";
// import SubCategoryProducts from "./pages/sub-category/SubCategoryProducts";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import CreateCoupon from "./pages/admin/coupon/CreateCoupon";
// import Payment from "./pages/Payment";
// import WishList from "./pages/user/WishList";

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
        <Suspense
            fallback={
                <div className="col-12 text-center p-5 mt-5 loader">
                    __ React Redux EC <LoadingOutlined /> MMERCE __
                </div>
            }
        >
            <ToastContainer />
            <Header />
            <CartDrawer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />
                <Route
                    path="/register/complete"
                    element={<CompleteRegistration />}
                />
                <Route path="/forgot/password" element={<ForgotPassword />} />
                <Route path="/user/checkout" element={<Checkout />} />
                <Route path="/products/:slug" element={<Products />} />
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
        </Suspense>
    );
};

export default App;
