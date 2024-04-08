import logo from './logo.svg';
import './App.css';

import axios from 'axios';

import { useState, useEffect } from 'react';
// import styles from '../styles/Home.module.css';

const App = () => {

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
    const [chapter,verse] = generatePathVariables();
    const apiUrl = `https://bhagavadgitaapi.in/slok/${chapter}/${verse}/`;
    const response = await axios.get(apiUrl);
    const verseData = response.data.san.et;
    setRandomVerse(JSON.stringify(verseData));
  }

  useEffect(() => {
    generateQuote();
  }, []); 
  
  return (
    <div>{randomVerse}</div>
  )
};



export default App;
