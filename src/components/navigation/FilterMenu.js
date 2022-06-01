import React from "react";
import { Menu, Slider } from "antd";
import {
    DollarOutlined,
    AppstoreAddOutlined,
    StarFilled,
    ShopOutlined,
} from "@ant-design/icons";

const FilterMenu = ({
    price,
    onAfterPriceChangeHandler,
    checkboxCategories,
    starRatingFilter,
    checkboxSubCategories,
    checkboxBrands,
    checkboxColor,
    checkboxShipping,
}) => {
    const items = [
        {
            label: "Price",
            key: "1",
            icon: <DollarOutlined />,
            children: [
                {
                    type: "group",
                    label: (
                        <Slider
                            range={price}
                            value={price}
                            defaultValue={[2000, 4000]}
                            max="5000"
                            tipFormatter={(value) => `$${value}`}
                            onAfterChange={onAfterPriceChangeHandler}
                        />
                    ),
                },
            ],
        },
        {
            label: "Category",
            key: "2",
            icon: <AppstoreAddOutlined />,
            children: [
                {
                    label: <div>{checkboxCategories()}</div>,
                    className: "menu-item",
                },
            ],
        },
        {
            label: "Ratings",
            key: "3",
            icon: <StarFilled />,
            children: [
                {
                    label: starRatingFilter(),
                    className: "menu-item-star-rating",
                },
            ],
        },
        {
            label: "Sub-Category",
            key: "4",
            icon: <AppstoreAddOutlined />,
            children: [
                {
                    label: <div>{checkboxSubCategories()}</div>,
                    className: "menu-item",
                },
            ],
        },
        {
            label: "Brands",
            key: "brand",
            icon: <AppstoreAddOutlined />,
            children: [
                {
                    label: <div>{checkboxBrands()}</div>,
                    className: "menu-item",
                },
            ],
        },
        {
            label: "Colors",
            key: "5",
            icon: <AppstoreAddOutlined />,
            children: [
                {
                    label: <div>{checkboxColor()}</div>,
                    className: "menu-item",
                },
            ],
        },
        {
            label: "Shipping",
            key: "6",
            icon: <ShopOutlined />,
            children: [
                {
                    label: <div>{checkboxShipping()}</div>,
                    className: "menu-item",
                },
            ],
        },
    ];

    // const rootSubmenuKeys = ["1", "2", "3", "4", "5"];
    // const onOpenChange = (keys) => {
    //     const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    //     if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //         setOpenKeys(keys);
    //     } else {
    //         setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    //     }
    // };
    return (
        <Menu
            mode="inline"
            defaultOpenKeys={["1", "2", "3", "4", "5", "6"]}
            items={items}
            className=""
        />
    );
};

export default FilterMenu;
