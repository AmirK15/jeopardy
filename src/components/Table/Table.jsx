import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux"

import Button from "@mui/material/Button";

import toast, { Toaster } from 'react-hot-toast';

import Question from "../Question/Question";

import {clearAllAnswers} from "../../features/users/usersSlice";
import {addNewPlay} from "../../features/statistics/statisticsSlice";

import '../../styles/table.scss'

const Table = ({setActiveGame}) => {

    const dispatch = useDispatch()
    const {data} = useSelector(({categories}) => categories)
    const {allPlayers} = useSelector(({statistics}) => statistics)
    const {points, selectedQuestionId, rightAnswers, incorrectAnswers} = useSelector(({users}) => users)

    const [questionInfo, setQuestionInfo] = useState({})

    const notifySuc = () => toast.success('The answer is correct');
    const notifyErr = () => toast.error('The answer is incorrect');
    const notifyTime = () => toast.error('Time\'s up');

    return (
        <div className="table">
            <Toaster
                position="top-center"
                // reverseOrder={true}
            />
            <table className="table__content">
                <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td className="table__box">{item.title}</td>
                        {item.clues.map(el => (
                            <td key={el.id} className="table__box">
                                <Question
                                    id={el.id}
                                    value={el.value}
                                    info={el}
                                    setQuestionInfo={setQuestionInfo}
                                    questionInfo={questionInfo}
                                    notifySuc={notifySuc}
                                    notifyErr={notifyErr}
                                    notifyTime={notifyTime}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="table__block">
                <Button
                    onClick={() => {
                        dispatch(addNewPlay({
                            id: allPlayers.length + 1,
                            points,
                            selectedQuestionId,
                            rightAnswers,
                            incorrectAnswers
                        }))
                        setActiveGame(false)
                        dispatch(clearAllAnswers())
                    }}
                    variant="contained"
                >complete game
                </Button>
                <p>Points: {points ? points : 0}</p>
            </div>
        </div>
    );
};

export default Table;