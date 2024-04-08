import logo from './logo.svg';
import './App.css';

import axios from 'axios';

import { useState, useEffect } from 'react';

import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import MoonIcon from "./components/icons/MoonIcon";
import SunIcon from "./components/icons/SunIcon";
import Switch from "./components/Switch";

const StyledApp = styled.div`
  min-height: 100vh;
  text-align: center;
  padding-top: 10rem;
  background-color: ${(props) => props.theme.body};
  transition: all 0.25s ease;
`;

const Name = styled.h1`
  margin: 1rem;
  color: ${(props) => props.theme.title};
`;
const Info = styled.p`
  margin: 1rem;
  color: ${(props) => props.theme.subtitle};
`;

const darkTheme = {
  body: "#57501h",
  title: "#fff",
  subtitle: "#b6b6b6",
  icon: "#b6b6b6",
};
const lightTheme = {
  body: "#ffca7a",
  title: "#1c1c1c",
  icon: "#1c1c1c",
  subtitle: "#333",
};

// import styles from '../styles/Home.module.css';

const App = () => {

  const [theme, setTheme] = useState("dark");
  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  const [randomVerse, setRandomVerse] = useState('');

  const verseNumbers = {
    1: 46,2: 72,3: 43,4: 42,5: 29,6: 47,7: 30,8: 28,9: 34,
    10: 42,11: 55,12: 20,13: 35,14: 27,15: 20,16: 24,17: 28,
    18: 78,
    };

  function generatePathVariables() {
    const firstVariable = Math.floor(Math.random() * 18) + 1;
    const secondVariableRange = verseNumbers[firstVariable];
    const secondVariable = Math.floor(Math.random() * secondVariableRange) + 1;
    return [firstVariable, secondVariable];
  }

  

  async function generateQuote() {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const [chapter,verse] = generatePathVariables();
    const apiUrl = `https://bhagavadgitaapi.in/slok/${chapter}/${verse}/`;
    const response = await axios.get(apiUrl);
    const verseData = response.data.san.et;
    setRandomVerse(JSON.stringify(verseData));
    await sleep(2000);
  }

  useEffect(() => {
    generateQuote();
  }, []); 
  
  return (
    
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <StyledApp>
          <SunIcon />
          <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
          <MoonIcon />
          <p className='verse-text'>
            {randomVerse}
          </p>
          <div className='conch-button'>
            <button onClick={generateQuote} className='conch'> 
            </button>
          </div>
        </StyledApp>
      </ThemeProvider>
  )
};



export default App;
