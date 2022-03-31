import { useState,  useRef } from 'react';
import styled, { css } from 'styled-components';

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    background-color: lightblue;
`
const Title = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    white-space: pre;
    font-size: ${props => props.small || '22px'};
    text-align: center;
    font-weight: ${props => props.thin || 'bold'};
`;

const SubTitle = styled(Title)`
    color: chocolate;
    margin-top: 5px;
    margin-bottom: 20px;
`;

const Textarea = styled.textarea`
    box-shadow: 0 0 5px 5px lightgrey;
    border: none;
`;

const Tags = styled.div`
    margin-top: 20px;
    margin-left: 7px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    gap: 5px;
    width: 35%
`
const Tag = styled.span.attrs()`
    border: 1px solid grey;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    gap: 5px;
    background-color: white;
    font-weight: bold;
    ${props => props.active && css`
      background-color: chocolate;
    `}
`
const getRandomWord = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
};

function App() {

  const ref = useRef({});

  const [input, setInput] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const words = input.split(',');
  
  //recursive function to iterate all over written words as per ms set in timeout 
  const iterateWords = (index = 0, count) => {
    if (count > ref.current.maxCount) return

    if(index === words.length) index = 0;

    setTimeout(() => {
      setActiveIndex(index);
      iterateWords(index + 1, count + 1);
    }, 200);
  };

  //function to stop at a random word index 
  const changeColorHandler = () => {
    ref.current.maxCount = getRandomWord(1,10);
    iterateWords(0, activeIndex);
  }
    

  return (
    <Background>
      <Title thin={550}>Insert your words and seperate them by comma.
        <SubTitle small='20px'>Press Enter to see the chosen word of the day!</SubTitle>
      </Title>
      <Textarea rows='5' cols='70' placeholder='Write your words..' onKeyDown={changeColorHandler} id="text" onChange={handleChange} />
      <Tags id="wordsContainer">
        {words.map((word, index) => {
          if (word === '') return;
          return <Tag active={index === activeIndex} key={index}>{word}</Tag>
          }
        )}
      </Tags>
    </Background>
  )
}
export default App;
