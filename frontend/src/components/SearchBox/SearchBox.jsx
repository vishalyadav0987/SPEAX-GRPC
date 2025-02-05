import React, { useEffect, useRef, useState } from 'react'
import QuestionType from '../QuestionType/QuestionType'
import './SearchBox.css'
import { FiSearch } from "react-icons/fi";
import PopUpSearchBar from '../PopUpSearchBar/PopUpSearchBar';
import gsap from 'gsap';
import { useQuestionContext } from '../../QuestionContext/QuestionContext';

const SearchBox = () => {
  const [popSearchBarOpen, setPopSearchBarOpen] = useState(false);

  const popUpContainer = useRef(null);
  useEffect(() => {
    if (popSearchBarOpen) {
      gsap.fromTo(popUpContainer.current,
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" } 
      );
    }else {
      gsap.fromTo(
        popUpContainer.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: 50, duration: 0.8, ease: "power3.in" }
      );
    }
  },[popSearchBarOpen])

  const {typeOfQuestion} = useQuestionContext();


    const questionType = [
      "all",
      "general",
      "technology",
      "business",
      "science",
      "mathematics",
      "health",
      "history",
      "sports",
      "entertainment",
    ]
  

  return (
    <>
      <div className="search-box-container">
        <div className="search-box">
          <div className="search-box-content">
            <input type="text" placeholder="Search for questions"
              onClick={(e) => {e.stopPropagation(); setPopSearchBarOpen(true)}}
            />
            <button className="search-button">
              <FiSearch />
            </button>
          </div>
          {/* <QuestionType /> */}
          <QuestionType questionType={questionType}/>
          <p className='tag-question'>Popular Questions type</p>
        </div>
      </div>
      <div className="popSearchBar" ref={popUpContainer}>
        
        {popSearchBarOpen && <PopUpSearchBar setPopSearchBarOpen={setPopSearchBarOpen} />}
      </div>
    </>
  )
}

export default SearchBox
