import React from "react";
import "./FeedBack.css";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import StarRatings from "react-star-ratings";
const Feedback = ({ name, review, rating }) => {
  return (
    <div className="feedBack">
      <div>
        <blockquote>{review}</blockquote>
        <FormatQuoteIcon></FormatQuoteIcon>
      </div>
      <div>
        <StarRatings
          starHoverColor="yellow"
          rating={rating}
          starRatedColor="#0866FF"
          numberOfStars={5}
          starDimension="15px"
          starSpacing="0px"
          name="rating"
        />
        <small>{name}</small>
      </div>
    </div>
  );
};

export default Feedback;
