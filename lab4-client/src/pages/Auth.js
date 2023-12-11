import React, {useContext, useEffect, useState} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import Container from '../components/Containers';
import {login, registration, googleAuth} from "../http/userAPI";
import {Context} from "../index";
import { NavLink } from 'react-router-dom';
import Row from '../components/Row';
import Button from '../components/Button'
import Form from '../components/Form';
import { observer } from 'mobx-react-lite';
import Input from '../components/Input';
import {GoogleLogin, useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === '/login'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [googleUser, setGoogleUser] = useState()


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setGoogleUser(codeResponse)
            console.log(codeResponse)
          },
          onError: (error) => console.log("Login Failed:", error)
    })


    useEffect(()=>{
        if(googleUser){
            console.log(1)
           axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googleUser.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          googleAuth(res.data)
        })
        }
    },[googleUser])


    const click = async () => {
        try {
            let data;
            console.log(1)
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            console.log(data)
            user.setUser(user)
            user.setIsAuth(true)
            console.log(11)

            return (<Navigate to={'/Movies'}/>)

        } catch (e) {
            console.log(111)
            alert(e.response.data.message)
        }


    }

    return (
      <Container>
        <h2>{isLogin ? 'Login' : "Registration"}</h2>
        <Form type='default'>
            <Input placeholder="Enter your email"
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   type='email'
                   />

            <Input placeholder="Enter your password"
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   type='password'/>

            <Row>
                {isLogin ?
                    <div>
                        Have no account? <NavLink to={'/reg'}>Sign-up here!</NavLink>
                    </div>
                    :
                    <div>
                        Already has an account? <NavLink to={'/login'}>Login here!</NavLink>
                    </div>
                }
            </Row>
                <Button onClick={click}>
                    {isLogin ? 'Login' : 'Registrate'}
                </Button>

                <Button onClick={login}>Authorize with Google</Button>
        </Form>
      </Container>
    );
});

export default Auth;
