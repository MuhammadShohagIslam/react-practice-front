import React from "react";
import StarRatings from "react-star-ratings";

const Star = ({ clickRating, numberOfStars }) => {
    return (
        <>
            <StarRatings
                starRatedColor="red"
                changeRating={() => clickRating(numberOfStars)}
                numberOfStars={numberOfStars}
                starEmptyColor="red"
                starDimension="20px"
                starSpacing="2px"
            />
            <br />
        </>
    );
};

export default Star;
