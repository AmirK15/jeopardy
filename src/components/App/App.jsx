import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux";

import {getCategories} from "../../features/categories/categoriesSlice";

import AppRoutes from "../Routes/Routes";

const App = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {name} = useSelector(({users}) => users)

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    useEffect(() => {
        if (!name) {
            navigate("/")
        } else {
            navigate("/game")
        }
    }, [])

    return (
        <>
            <AppRoutes/>
        </>
    );
};

export default App;