import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import UserNavigation from "./../../components/navigation/UserNavigation";
import WhisListProductCard from "./../../components/card/WhisListProductCard";
import { getWhisLists, removeWhisList } from "../../functions/user";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingCards from './../../components/card/LoadingCards';

const WishList = () => {
    const [whisLists, setWhisList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadingWhisList(user);
    }, [user]);

    // loading all whislist
    const loadingWhisList = (user) => {
        if (user && user.token) {
            setLoading(true);
            getWhisLists(user.token)
                .then((res) => {
                    console.log(res.data);
                    setWhisList(res.data.wishList);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    };

    const handleRemovedToWhisList = (_id) => {
        console.log(_id);
        if (user && user.token) {
            removeWhisList(user.token, _id).then((res) => {
                toast.error("Wish-List is Removed!");
                loadingWhisList(user);
            });
        }
    };

    return (
        <div className="container-fluid">
            <Row gutter={16}>
                <Col span={4}>
                    <UserNavigation />
                </Col>
                <Col span={20} className="pt-3">
                        {loading ? (
                            <LoadingCards count={2} />
                        ) : (
                            <Row gutter={12}>
                                {whisLists && whisLists.length ? (
                                    whisLists.map((item) => (
                                        <Col
                                            span={8}
                                            key={item._id}
                                            className="mb-3"
                                        >
                                            <WhisListProductCard
                                                product={item.product}
                                                handleRemovedToWhisList={
                                                    handleRemovedToWhisList
                                                }
                                            />
                                        </Col>
                                    ))
                                ) : (
                                    <>
                                        <h4 className="text-center">
                                            No Wish-List
                                        </h4>
                                    </>
                                )}
                            </Row>
                        )}
                </Col>
            </Row>
        </div>
    );
};

export default WishList;
