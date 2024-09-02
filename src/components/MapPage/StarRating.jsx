import React from "react";

import star0_5 from "../../assets/star-ratings/0.5.png";
import star1 from "../../assets/star-ratings/1.0.png";
import star1_5 from "../../assets/star-ratings/1.5.png";
import star2 from "../../assets/star-ratings/2.0.png";
import star2_5 from "../../assets/star-ratings/2.5.png";
import star3 from "../../assets/star-ratings/3.0.png";
import star3_5 from "../../assets/star-ratings/3.5.png";
import star4 from "../../assets/star-ratings/4.0.png";
import star4_5 from "../../assets/star-ratings/4.5.png";
import star5 from "../../assets/star-ratings/5.0.png";

export default function StarRating({ RawRating }) {
  const rating = Math.round(RawRating * 2) / 2;
  console.log(rating);

  const starImages = {
    0.5: star0_5,
    1.0: star1,
    1.5: star1_5,
    2.0: star2,
    2.5: star2_5,
    3.0: star3,
    3.5: star3_5,
    4.0: star4,
    4.5: star4_5,
    5.0: star5,
  };

  const starImg = starImages[rating];
  console.log(starImg);

  return (
    <div className="star-rating">
      <img src={starImg} alt={`Star rating of ${rating}`} />
    </div>
  );
}
