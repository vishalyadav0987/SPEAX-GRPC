import React, { createContext, useContext, useState } from 'react'
export const QuestionContext = createContext(null);


export const useQuestionContext = () => {
    return useContext(QuestionContext);
}

export const QuestionContextProvider = ({ children }) => {
    const [queryBasedQuestion, setQueryBasedQuestion] = useState([]);
    const [selectedQuestionQuery, setSelectedQuestionQuery] = useState("");
    const [selectedQuestionSearchHistory, setSelectedQuestionSearchHistory] = useState([]);
    const [totalQuestion,setTotalQuestion] = useState(0);
    const [loading, setLoading] = useState(false);
    const [totalPages,setTotalPages] = useState(0);
    const [typeOfQuestion,setTypeOfQuestion] = useState([])
    return (
        <QuestionContext.Provider value={
            {
                queryBasedQuestion,
                setQueryBasedQuestion,
                loading,
                setLoading,
                selectedQuestionQuery,
                setSelectedQuestionQuery,
                selectedQuestionSearchHistory,
                setSelectedQuestionSearchHistory,
                totalQuestion,
                setTotalQuestion,
                totalPages,
                setTotalPages,
                typeOfQuestion,
                setTypeOfQuestion,
            }
        }>
            {children}
        </QuestionContext.Provider>
    )
}




