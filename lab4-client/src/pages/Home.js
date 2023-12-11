import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import { observer } from 'mobx-react-lite';
import Container from '../components/Containers';
import About from '../components/About';

const Home = observer(() => {
    return (
      <Container>
        <marquee >♥♥♥WELCOME TO OUR CINEMA♥♥♥&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Use promocode "CULTUREFOREVER" to buy ticket's for any movie with 30% discount. Allowed only in ticket office since 18:00 to 23:00.</marquee>

        <h1>Home page</h1>
        <About/>
        <h2>Our partners</h2>
        <div class="partners">
            <a href = 'https://www.bsuir.by/ru/fksis'>FKSIS</a>
            <br/>
            <a href = 'https://www.bsuir.by/ru/fksis/studsovet'>SS FKSIS</a>
        </div>
      </Container>
      );
});

export default Home;
