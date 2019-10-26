import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import React from 'react'


export const AuthRoute = ({ children, ...rest })=>{

    //设置token来模拟账户登录的token校验
    const token = localStorage.getItem('token') || null
    return (
        <Route
            {...rest}
            render={
                ({location}) =>
                    token ? (children) : (
                        <Redirect to = '/login' />
                    )
                
            }           
        />
    )
}
