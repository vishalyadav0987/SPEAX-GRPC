import React, {  useEffect, useRef, useState } from 'react'
import { useQuestionContext } from '../../QuestionContext/QuestionContext';
import useFetchQery from '../../CustomHook/useFetchQery';
import { useLocation } from 'react-router-dom';
import './QuerySearchQuestion.css';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import QuestionUi from '../../components/QuestionUi/QuestionUi';

const QuerySearchQuestion = () => {
    const questionRefs = Array.from({ length: 20 }, () => useRef(null));
    const questionTypeRef = useRef(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const searchQuery = query.get("q");
    const getPageNo = query.get("page") || 1;
    const [currentPage, setCurrentPage] = useState(+getPageNo);

    
    useFetchQery(searchQuery,currentPage);
  

    const { queryBasedQuestion,totalPages } = useQuestionContext();
    console.log(queryBasedQuestion);
    // console.log(totalQuestion);

    useEffect(() => {
        window.history.replaceState(
          null,
          '',
          `?q=${searchQuery}&page=${currentPage}`
        );

        if (questionTypeRef.current && questionRefs[1].current) {
            questionTypeRef.current.scrollTo({
                top: 0,
                behavior: 'smooth', 
            });
            questionRefs[0].current.scrollIntoView({
                top: 0,
                behavior: 'smooth', 
            });
            
        }
      }, [currentPage, searchQuery]);

      const scrollToQuestion = (index) =>{
        if (questionRefs[index + 1] && questionRefs[index + 1].current) {
            questionRefs[index + 1].current.scrollIntoView({
              behavior: 'smooth',
              block: 'start', 
            });
          }
      }

    


    return (
        <>
        <div className="result-count" style={{
            display:"flex",
            alignItems:"center",
            padding:"2px 20px",
            fontSize:"14px",
            color:"#333"
        }}>
            <p>
            {(20 * (+currentPage-1)) + 0+1} - {(20 * (+currentPage-1)) + 20}  of over {20*totalPages} question for {" "}<span style={{
                fontWeight:"600",
                fontFamily:"sans-serif",
                color:"#0058ca"
            }}>"{searchQuery?.length > 30 ? searchQuery?.slice(0,30) + "..." : searchQuery}"</span>
            </p>
        </div>
            <div className="query-question-container">
                <div className="question-lists" ref={questionTypeRef}>
                    {
                        queryBasedQuestion && queryBasedQuestion?.length > 0 &&
                        queryBasedQuestion.map((question, index) => (
                            <div className="question-with-type" key={index} onClick={() => scrollToQuestion(index-1)}>
                                <div className="question-details">
                                    <div className="question-text">
                                        Question {(20 * (+currentPage-1)) + index+1}</div>
                                    <div className="question-type">{question?.type}</div>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div className="question-here-ui">
                    {
                        queryBasedQuestion && queryBasedQuestion?.length > 0 ? queryBasedQuestion.map((question, index) => (
                            <QuestionUi question={question}
                            questionRefs={questionRefs} 
                            index={index}
                            key={index} questionNo={(20 * (+currentPage-1)) + index} />
                        )) : <div className="no-question-found">No question found</div>

                    }

                <div className="paginationBox" style={{
                    width:"50%",
                    margin:"0 auto",
                    padding:"10px",
                    paddingBottom:"30px"
                }}>
                    <ResponsivePagination
                        current={currentPage}
                        total={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
                </div>
            </div>

        </>
    )
}

export default QuerySearchQuestion
