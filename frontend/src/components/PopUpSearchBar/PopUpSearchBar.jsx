import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { RxCountdownTimer } from "react-icons/rx";
import { BsFillQuestionSquareFill } from "react-icons/bs"; // Anagram
import { useNavigate } from 'react-router-dom';
import { useQuestionContext } from '../../QuestionContext/QuestionContext';
import './PopUpSearchBar.css';
import useFetchQery from '../../CustomHook/useFetchQery';
import Spinner from '../../components/Spinner/Spinner'
import { HiLockClosed } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { HiLockOpen } from "react-icons/hi2";
import gsap from 'gsap';





const PopUpSearchBar = ({ setPopSearchBarOpen }) => {
    const [searchHistory, setSearchHistory] = useState([]);
    const navigation = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const { queryBasedQuestion,typeOfQuestion} = useQuestionContext();
    const [isTypeOpen,setIsTypeClose] = useState(true)


     // fetching question type
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

    // call hook to fetch data based on query
    useFetchQery(searchQuery);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        setSearchHistory(storedHistory);
      }, []);

      const saveSearchHistory = (newHistory) => {
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        setSearchHistory(newHistory);
      };

    const handleClickSearchQuestion = async () => {
        if (!searchQuery) return;
        const updatedSearchHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 10);
        saveSearchHistory(updatedSearchHistory);
        navigation(`/search?q=${searchQuery}`);
        setSearchQuery("")
    }

    const highlightedText = (text) => {
        if (!searchQuery) return text;
        const querySearparts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
        // return array of word that will write in query
        return querySearparts.map((part, index) =>
            part.toLowerCase() === searchQuery.toLowerCase() ? (
                <span key={index} className="highlight">{part}</span>
            ) : (
                part
            )
        );
    }

    // Direction onclick redirect to the new page
    const sugesstionQuestionHandler = (questionQuery) =>{
        if (!questionQuery) return;
        const updatedSearchHistory = [questionQuery, ...searchHistory.filter(item => item !== questionQuery)].slice(0, 10);
        saveSearchHistory(updatedSearchHistory);
        navigation(`/search?q=${questionQuery}`);
    }
    


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleClickSearchQuestion()
        }
      };


      const capitalize = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      };

      const typeCloseOpenRef = useRef(null)
  const openTypeBar = () => {
    setIsTypeClose(true);
    gsap.to(typeCloseOpenRef.current, {
      x: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  };
  const closeTypeBar = () => {
    gsap.to(typeCloseOpenRef.current, {
      x: '-120%',
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => setIsTypeClose(false),
    });
  };
  useEffect(()=>{
    if(searchQuery){
        closeTypeBar()
    }
  },[searchQuery])
    return (
        <>
            <div className="overlay" onClick={() => { setPopSearchBarOpen(false)
                closeTypeBar()
             }}></div>
            <div className="pop-serach-bar-container">
                <div className="pop-search-bar-content">
                    <div className="pop-search-box">
                        <button onClick={()=>{handleClickSearchQuestion()}}><FiSearch /></button>
                        <input
                            type="text"
                            placeholder="Search for a question..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                    <div className="pop-search-bar-history-type">
                        <div className="question-type-box">
                            <h4>Question Type</h4>
                            <div className="question-type-list">
                                {
                                   
                                    
                                       ( questionType && 
                                        questionType.length >0 && 
                                        questionType?.map((type, index) => (
                                            <div key={index}>{capitalize(type)}</div>
                                        )))
                                    
                                }
                            </div>
                            
                        </div>
                        <div className="responsive-question-type-box" ref={typeCloseOpenRef}>
                            <h4>
                                <span>Question Type</span>
                                <span onClick={closeTypeBar}><AiOutlineClose /></span>
                            </h4>
                            <div className="question-type-list">
                                {
                                   
                                    
                                       ( questionType && 
                                        questionType.length >0 && 
                                        questionType?.map((type, index) => (
                                            <div key={index}>{capitalize(type)}</div>
                                        )))
                                    
                                }
                            </div>
                            
                        </div>
                        <div className="search-history-box">
                            <div className="responsive-type-button-opener"
                            onClick={openTypeBar}>
                                <span>Question Types</span>
                                <span>
                                    {
                                        isTypeOpen ? <HiLockOpen/>:<HiLockClosed/>
                                    }
                                </span>
                            </div>
                            <div className='search-history-box-heading'>
                                {searchQuery.length > 0 ? "Search Results" : "Search History"}
                            </div>
                            {
                                searchQuery.length === 0 ? (
                                    <div className='search-history-list'>
                                        {searchHistory && searchHistory?.map((history, index) => (
                                            <div key={index} onClick={()=>setSearchQuery(history)}
                                            >
                                                <RxCountdownTimer />
                                                <li>
                                                    {history?.length > 10 ? 
                                                    history?.slice(0, 40) + '...' : history
                                                    }
                                                </li>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="search-on-query-question-list">
                                        {queryBasedQuestion?.length > 0 ? (
                                            <div className="search-on-query-list-item">
                                                {queryBasedQuestion.map((question, index) => (
                                                    <div className='single-search-question' key={index}>
                                                        <div className="question-icon">
                                                            <BsFillQuestionSquareFill />
                                                        </div>
                                                        <div className="question-details"
                                                            onClick={() => 
                                                                {
                                                                    sugesstionQuestionHandler(question.title);
                                                            }}>
                                                            <div>{
                                                                highlightedText(question?.title)
                                                            }
                                                            </div>
                                                            <div>{question?.type}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div>No results found for your search.</div>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopUpSearchBar;
