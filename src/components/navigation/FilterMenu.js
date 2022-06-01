import React, { useState } from "react";
import { Menu, Slider } from "antd";
import { DollarOutlined, DownCircleOutlined } from "@ant-design/icons";

const FilterMenu = ({
    price,
    onAfterPriceChangeHandler,
    checkboxCategories,
    checkboxSubCategories,
}) => {
    const [openKeys, setOpenKeys] = useState(["1", "2", "3"]);

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
            icon: <DownCircleOutlined />,
            children: [
                {
                    label: <div>{checkboxCategories()}</div>,
                    className: "menu-item",
                },
            ],
        },
        {
            label: "Sub-Category",
            key: "3",
            icon: <DownCircleOutlined />,
            children: [
                {
                    label: <div>{checkboxSubCategories()}</div>,
                    className: "menu-item",
                },
            ],
        },
    ];

    const rootSubmenuKeys = ["1", "2", "3"];
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={["1", "2", "3"]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={items}
            className=""
        />
    );
};

export default FilterMenu;
