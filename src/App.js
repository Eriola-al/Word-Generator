import { useState, useEffect } from 'react';
import styled from 'styled-components';

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
    background-color: lightpink;
`


function App() {

  //written words in textarea
  const [input, setInput] = useState('');
  //number of times the iteration happens
  //const [counter, setCounter] = useState([1, 2, 3, 4, 5]);
  //index of a word from words
  const [index, setIndex] = useState(0);



  const handleChange = (e) => {
    setInput(e.target.value);
  };
 


  //event to trigger 'clear input' and start colorchange animation
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      document.getElementById("text").value = "";
    }
  };




  //show input seperate when divided
  const words = input.split(',');





  //show nothing if no input entered

  if(words.length !== 0) {
    words.pop()
  }
  console.log('input',input)
  console.log('word',words)




  //get random Index Value
  let randomIndex = words[Math.floor(Math.random() * words.length)];



  //timeout function to change color background as per counter accordingly
  useEffect(() => {
    const timeout = setTimeout(() => {
      //this will iterate to the next word[index] after 2 sec
     changeBgColor();
    }, 2000);

    return () => clearTimeout(timeout);
  },[{/*index,counter*/}]);
  


  //function changeWord iterate
  function changeBgColor() {
    if(index >=0 && index < words.length-1){
      document.getElementById('wordsContainer' + index).style.background = 'aqua';
    }
    setIndex(index + 1);
  };



  return (
    <Background>
      <Title thin={550}>Insert your words and seperate them by comma.
        <SubTitle small='20px'>Press Enter to see the chosen word of the day!</SubTitle>
      </Title>
      <Textarea rows='5' cols='70' placeholder='Write your words..' onKeyUp={handleKeyPress} id="text" onChange={handleChange} />
      <Tags id="wordsContainer">
        {words.map((word, index) => {
          console.log(word,index)
          return (
            <Tag key={index}>{word}</Tag>
          ) 
        }
        )}
      </Tags>
    </Background>
  )
}
export default App;
