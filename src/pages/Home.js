import { Fragment } from "react";
import BestSellerProduct from "../components/products/BestSellerProduct";
import NewArrivalProduct from "../components/products/NewArrivalProduct";
import Jumbotron from "../components/libs/Jumbotron";
import CategoryHome from "./category/CategoryHome";

const Home = () => {
    return (
        <Fragment>
            <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbotron
                    text={["Latest Products", "New Arrivals", "Best Sellers"]}
                />
            </div>

            <h4 className="text-center p-3 mt-5 mb-5 display-6 jumbotron">
                New Arrivals
            </h4>
            <NewArrivalProduct />

            <h4 className="text-center p-3 mt-5 mb-5 display-6 jumbotron">
                Best Sellers
            </h4>
            <BestSellerProduct />

            <h4 className="text-center p-3 mt-5 mb-5 display-6 jumbotron">
                Categories
            </h4>
            <CategoryHome />

            <br />
            <br />
        </Fragment>
    );
};

export default Home;
