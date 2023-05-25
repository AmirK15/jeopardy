import React from 'react';
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom'
import Button from "@mui/material/Button";

import '../../styles/statistics.scss'

const Statistics = () => {

    const {name} = useSelector(({users}) => users)
    const {allPlayers} = useSelector(({statistics}) => statistics)

    return (
        <>
            <div className="statistics">
                <p className="statistics__name">Name: <span>{name}</span></p>
                {allPlayers.length ?
                    allPlayers.map((item, idx) => (
                    <ul key={idx} className="statistics__list">
                        <li>
                            Game: <span>{item.id}</span>
                        </li>
                        <li>
                            Count answers: <span>{item.selectedQuestionId.length}</span>
                        </li>
                        <li>
                            Right answers: <span>{item.rightAnswers.length}</span>
                        </li>
                        <li>
                            Incorrect answer: <span>{item.incorrectAnswers.length}</span>
                        </li>
                        <li>
                            Points: <span> {item.points}</span>
                        </li>
                    </ul>
                )) : ''}
                <Button className="statistics__btn" variant="contained" size="large" style={{marginTop: "15px"}}>
                    <Link to="/game">Back</Link>
                </Button>
            </div>
        </>
    );
};

export default Statistics;