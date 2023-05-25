import React from 'react';
import { Route, Routes } from "react-router-dom";

import { ROUTES } from '../../utils/routes'

import Login from "../Login/Login";
import Game from "../Game/Game";
import Statistics from "../Statistics/Statistics";


const AppRoutes = () => (
    <Routes>
        <Route index element={<Login/>}/>
        <Route path={ROUTES.GAME} element={<Game/>}/>
        <Route path={ROUTES.STATISTICS} element={<Statistics/>}/>
    </Routes>
)

export default AppRoutes;