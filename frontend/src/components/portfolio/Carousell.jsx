import meter1 from "../../assets/img/logo.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import meter1 from "../../assets/img/logo.png";


export const Crousell =({
     record, index
}) =>{

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };
return(
<Carousel
                            responsive={responsive}
                            infinite={true}
                            className="owl-carousel owl-theme skill-slider skill-bx wow zoomIn"
                          >
                            <div className="item"  key="index">
                                <img src={meter1} alt="Hobby" />
                                <h5>{record}</h5>
                              </div>
                            
                          </Carousel>
);
};