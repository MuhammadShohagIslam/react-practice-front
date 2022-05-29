import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CardCarousel = ({ images, title }) => {
    return (
        <Carousel
            showArrows={false}
            infiniteLoop
        >
            {images &&
                images.length > 0 &&
                images.map((image) => (
                    <img src={image.url} alt={title} key={image.public_id} />
                ))}
        </Carousel>
    );
};

export default CardCarousel;
