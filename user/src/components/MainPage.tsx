import React, {useContext, useEffect} from 'react';
import Navbar from "./navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";
import AddClient from "./customer/AddCustomer";
import FindCustomer from "./customer/FindCustomer";
import Register from "./login/Register";
import GoodsList from "./goods_list/GoodsList";
import Workers from "./workers/Workers";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import GoodsPanel from "./goods_list/GoodsPanel";
import CustomerPage from "./customer/CustomerPage";

const MainPage = observer(() => {

    const {userStore} = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            userStore.checkAuth();
        }
    }, [])

    if (userStore.isLoading) {
        return (
            <>
                <div>Загрузка...</div>
            </>
        );
    }
    return (
        <>
            {/*{!user.isAuth ?*/}
            {/*    <>*/}
            {/*        <Routes>*/}
            {/*            <Route path={'/login'} element={<Login/>}/>*/}
            {/*            <Route path={'/register'} element={<Register/>}/>*/}
            {/*            <Route path={'/*'} element={<Login/>}/>*/}
            {/*        </Routes>*/}
            {/*    </>*/}
            {/*    :*/}
            <>
                <Navbar/>
                <Routes>
                    <Route path={'/findCustomer'} element={<FindCustomer/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/addclient'} element={<AddClient/>}/>
                    <Route path={'/goodslist'} element={<GoodsPanel/>}/>
                    <Route path={'/workers'} element={<Workers/>}/>
                    <Route path={'/customer'} element={<CustomerPage/>}/>
                    <Route path={'/*'} element={<Home/>}/>
                </Routes>
            </>
            {/*}*/}
        </>
    );
});

export default MainPage;