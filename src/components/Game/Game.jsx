import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import Button from '@mui/material/Button';

import Table from "../Table/Table"

import {logOut} from "../../features/users/usersSlice";
import {clearStatistics} from "../../features/statistics/statisticsSlice";

import '../../styles/game.scss'

const Game = () => {

    const dispatch = useDispatch()
    const {data} = useSelector(({categories}) => categories)
    const {name, selectedQuestionId} = useSelector(({users}) => users)

    const [activeGame, setActiveGame] = useState(false)

    useEffect(() => {
        if (selectedQuestionId.length === (data.length * data[0].clues.length)) {
            setActiveGame(false)
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
                        <div className="game__block">
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
                        </div>
                    </>
            }
        </div>
    );
};

export default Game;