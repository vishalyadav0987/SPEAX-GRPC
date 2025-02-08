import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuestionContext } from '../QuestionContext/QuestionContext';

const useFetchQuestionType = () => {
    const { setTypeOfQuestion } = useQuestionContext();
    const [loading ,setLoading] = useState(true);

    useEffect(() => {
        const fetchQestionType = async () => {
            try {
                const response = await axios.get(`/api/v1/questions/find?limit=${100000}`);
                if (!response.data.success) {
                    console.log("No data found");
                    setTypeOfQuestion([]);
                    return;
                }
                const data = response.data;
                const uniqueTypeOfQuestion = new Set(
                    data?.questions.map((Questiontype) => Questiontype?.type)
                );
                const arr = Array.from(uniqueTypeOfQuestion);
                setTypeOfQuestion(arr);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }finally{
                setLoading(false);
            }
        };

        fetchQestionType();
    }, [setTypeOfQuestion]);

    return {loading};
};

export default useFetchQuestionType;
