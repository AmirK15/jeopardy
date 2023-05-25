import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import {minusCountValue, plusCountValue, addRightAnswers, addIncorrectAnswers, addQuestionId} from "../../features/users/usersSlice";
// import { plusValue, minusValue, addQuestion, addRight, addIncorrect } from "../../features/statistics/statisticsSlice";

const Question = ({id, value, info, setQuestionInfo, questionInfo}) => {

    const dispatch = useDispatch()
    const {selectedQuestionId, rightAnswers, incorrectAnswers} = useSelector(({users}) => users)

    const [questionActive, setQuestionActive] = useState(false)
    const [timer, setTimer] = useState(60)
    const [intervalId, setIntervalId] = useState(null)
    const [timeoutId, setTimeoutIdId] = useState(null)


    const stopTimer = () => {
        if (intervalId && timeoutId) {
            clearInterval(intervalId)
            clearTimeout(timeoutId)
            setTimer(60)
        }
    }

    const runTimer = () => {
        const time = setInterval(() => {
            if (timer > 0) {
                setTimer((prev) => prev - 1)
            }
        }, 1000)
        setIntervalId(time)
        const timeout = setTimeout(() => {
            stopTimer(intervalId)
            dispatch(minusCountValue(value))
            dispatch(addQuestionId(id))
            dispatch(addIncorrectAnswers(id))
            // for statistics
            // dispatch(minusValue(value))
            // dispatch(addQuestion())
            // dispatch(addIncorrect())
            setQuestionActive(false)
        }, 60000)
        setTimeoutIdId(timeout)
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (e.target[0].value.toLowerCase() === questionInfo.answer.replace(/[^a-zа-яё0-9\s]/gi, '').toLowerCase()) {
            dispatch(plusCountValue(questionInfo.value))
            dispatch(addRightAnswers(id))
            // for statistics
            // dispatch(plusValue(questionInfo.value))
            // dispatch(addRight())
        } else {
            dispatch(minusCountValue(questionInfo.value))
            dispatch(addIncorrectAnswers(id))
            // for statistics
            // dispatch(minusValue(questionInfo.value))
            // dispatch(addIncorrect())
        }
        setQuestionActive(false)
        stopTimer(intervalId)
        dispatch(addQuestionId(id))
        // dispatch(addQuestion())
    }

    return (
        <>
            <Button
                style={{borderColor: rightAnswers.includes(id) ? 'green' : incorrectAnswers.includes(id) ? 'red' : '', color: rightAnswers.includes(id) ? 'green' : incorrectAnswers.includes(id) ? 'red' : ''}}
                variant="outlined"
                disabled={selectedQuestionId.includes(id)}
                onClick={() => {
                    setQuestionInfo(info)
                    runTimer()
                    setQuestionActive(true)
                }}
            >
                {value}
            </Button>
            {
                questionActive ?
                    <div className="table__question">
                        <form onSubmit={submitForm} className="table__question__form">
                            <h2 className="table__question__title">{questionInfo.question}?</h2>
                            <TextField required id="standard-basic" label="Answer" variant="standard"/>
                            <p>{info.answer.replace(/[^a-zа-яё0-9\s]/gi, '')}</p>
                            <Button type="submit" variant="contained">Done</Button>
                            <p>{timer} seconds left</p>
                        </form>
                    </div> : ''
            }
        </>

    );
};

export default Question;