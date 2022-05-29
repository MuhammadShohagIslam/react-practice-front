import StarRatings from "react-star-ratings";

export const avgRating = (product) => {
    let avgRating;
    let length;
    if (product && product.ratings) {
        let total = [];
        product.ratings.forEach((rating) => total.push(rating.star));
        const highest = product.ratings.length * 5;
        const totalReducer = total.reduce((acc, cur) => acc + cur, 0);
        avgRating = (totalReducer * 5) / highest;
        length = product.ratings.length;
    }
    
    return (
        <div className="text-center pb-3 pt-0">
            <span className="text-danger">
                <StarRatings
                    rating={avgRating}
                    isSelectable={false}
                    starRatedColor="red"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                />
                ({length})
            </span>
        </div>
    );
};
