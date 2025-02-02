import React, { useRef } from "react";
import "./QuestionType.css";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import Spinner from "../Spinner/Spinner";

const QuestionType = ({ questionType }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -120,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 120,
      behavior: "smooth",
    });
  };

  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className="button-scroll-container">
      <button className="scroll-arrow" onClick={scrollLeft}>
        <FaAngleLeft />
      </button>
      <div className="button-wrapper" ref={scrollContainerRef}>
        {
          

            (questionType &&
              questionType.length > 0 &&
              questionType?.map((type, index) => (
                <div className="scrollable-button" key={index}>{capitalize(type)}</div>
              )))

        }
      </div>
      <button className="scroll-arrow" onClick={scrollRight}>
        <FaAngleRight />
      </button>
    </div>
  );
};

export default QuestionType;
