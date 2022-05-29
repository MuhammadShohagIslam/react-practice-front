import React from "react";
import { Skeleton, Row, Col, Card } from "antd";

const LoadingCards = ({ count }) => {
    const skeletonCard = () => {
        let totalCards = [];
        for (let i = 0; i < count; i++) {
            totalCards.push(
                <Col span={8} key={i} className="mb-3">
                    <Card
                        cover={
                            <Skeleton.Image
                                active
                                style={{ width: "100%", height: "197px" }}
                            />
                        }
                        actions={[
                            <Skeleton.Button active />,
                            <Skeleton.Button active />,
                        ]}
                    >
                        <Skeleton active paragraph={{ rows: 2 }} />
                    </Card>
                </Col>
            );
        }
        return totalCards;
    };
    return <Row gutter={12}>{skeletonCard()}</Row>;
};

export default LoadingCards;
