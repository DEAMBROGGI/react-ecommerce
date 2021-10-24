import "../../styles/Stars.css"
import ReactStars from "react-rating-stars-component";
import React from "react";
import {useStateValue} from '../../StateProvider';
import {actionTypes} from '../../reducer'
 
export default function Ratting() {
  const [{ratingFilter},dispatch] = useStateValue()

  

  function ratingChanged(value) {
    
   
    dispatch({
      type: actionTypes.RATING_FILTER,
      ratingFilter:value,
    })

  }

/**/
 
return(
  <ReactStars
    classNames="stars"
    count={5}
    onChange={ratingChanged}
    size={30}
    isHalf={false}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
    value={5}
   
  />
 
  
);
}