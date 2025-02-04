import React, { useEffect, useRef, useState } from 'react';
import './QuestionUi.css';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import gsap from 'gsap';

const QuestionUi = ({ question, questionNo, questionRefs, index }) => {
  console.log(question);

  const [isOpen, setIsOpen] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const mcqOptionsRef = useRef(null);

  useEffect(() => {
    const element = mcqOptionsRef.current;
  
    if (isOpen) {
      const fullHeight = element.scrollHeight; 
      gsap.fromTo(
        element,
        { opacity: 0, y: 50, height: 0 }, 
        {
          opacity: 1,
          y: 0,
          height: fullHeight, 
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => {
            element.style.height = 'auto'; 
          },
        }
      );
    } else {
      gsap.to(element, {
        opacity: 0,
        y: 50,
        height: 0,
        duration: 0.6,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);
  
  // const handleClickOptionChange = (index,type)=>{
  //   if(type === 'MCQ'){
  //     setSelectedAnswer([index]);
  //     console.log(index);
      
  //   }else{
  //     // when MSQ
  //     setSelectedAnswer((prev)=>{
  //       console.log(index);
  //       prev.includes(index) ? prev.filter((i) => i != index) : [...prev,index]
  //     })
  //   }
  // }

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const clearSelection = () => {
    setSelectedAnswer([]);
  };

  const checkQuestionMarkIsAvailOrNot = question?.title.substr(question?.title.length - 1);

  const ifCheckOptions = question?.blocks?.length > 0 ? question?.blocks : question?.options

  console.log(ifCheckOptions);
  
  let options = [];

  if (Array.isArray(ifCheckOptions)) {
     options = [...ifCheckOptions];
  }
  
  // console.log(options)

  return (
    // <></>
    <div className="question-container" ref={questionRefs[index]}>
      <div className="question-header">
        <span className="question-text" >
          Question {questionNo + 1}: {
            checkQuestionMarkIsAvailOrNot !== "." ? `${question?.title}?` : `${question?.title.substr(0, question?.title.length - 1)}?`
          }
          {" "}<span style={{
            color: '#989898',
            fontSize: '12px',
          }}>({question?.type})</span></span>
          {
            (question?.options?.length > 0 || question?.blocks?.length > 0) &&
            (<div className="accordion-arrow" onClick={toggleAccordion}>
              {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>)
          }
        
      </div>

      {isOpen && (
        <div className="mcq-options" ref={mcqOptionsRef}>
          {
            options?.map((option, index) => {
              return (
                <label key={index}>
                  <input
                    type={question?.type === 'MCQ' ? 'radio' : 'checkbox'}
                    name="answer"
                    // value={index}
                    // checked={selectedAnswer?.includes(index)} 
                    // onChange={() => handleClickOptionChange(index,question?.type)}
                  />
                  {option?.text}
                </label>
              )
            })
          }
          
        </div>
      )}

      <div className="clear-button-container">
      {
        (question?.options?.length > 0 || question?.blocks?.length > 0) &&
        <button className="clear-button" onClick={clearSelection}>
          Clear Option
        </button>
      }
      </div>
    </div>
  );
};

export default QuestionUi;
