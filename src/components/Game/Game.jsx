import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import Button from '@mui/material/Button';

import Table from "../Table/Table"

import {logOut} from "../../features/users/usersSlice";
import {clearStatistics, addNewPlay} from "../../features/statistics/statisticsSlice";
import {clearAllAnswers} from "../../features/users/usersSlice";

import '../../styles/game.scss'

const Game = () => {

    const dispatch = useDispatch()
    const {data} = useSelector(({categories}) => categories)
    const {allPlayers} = useSelector(({statistics}) => statistics)
    const {name, selectedQuestionId, points, rightAnswers, incorrectAnswers} = useSelector(({users}) => users)

    const [activeGame, setActiveGame] = useState(false)

    useEffect(() => {
        if (selectedQuestionId.length === (data.length * data[0].clues.length)) {
            setActiveGame(false)
            dispatch(clearAllAnswers())
            dispatch(addNewPlay({
                id: allPlayers.length + 1,
                points,
                selectedQuestionId,
                rightAnswers,
                incorrectAnswers
            }))
        }
    }, [selectedQuestionId])

    return (
        <div className="game">
            {
                activeGame ?
                    <Table setActiveGame={setActiveGame}/> :
                    <>
                        <h2 className="game__title">Hello {name}</h2>
                        <p className="game__desc">Welcome to Jeopardy Game</p>
                        <nav className="game__navbar">
                            <Link to="/statistics">
                                <Button variant="text" size="large">
                                    See Statistics
                                </Button>
                            </Link>
                            <Button
                                onClick={() => setActiveGame(true)}
                                variant="contained"
                                size="large"
                            >Start Game
                            </Button>
                            <Link to="/">
                                <Button onClick={() => {
                                    dispatch(logOut())
                                    dispatch(clearStatistics())
                                }} variant="outlined" size="large">
                                    Log Out
                                </Button>
                            </Link>
                        </nav>
                    </>
            }
        </div>
    );
};

export default Game;