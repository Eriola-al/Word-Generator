import { useState } from 'react';
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
const Title = styled.p`
    font-family: Arial, Helvetica, sans-serif;
    white-space: pre;
    font-size: ${props => props.small || '22px'};
    text-align: center;
    font-weight: ${props => props.thin || 'bold'};
`;

const SubTitle = styled(Title)`
    color: chocolate;
    margin-bottom: 0px;
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
`


function App() {

  const [tags, setTags] = useState('');
  const [changeColor, setChangeColor] = useState(false);


  const handleChange = (e) => {
    setTags(e.target.value);
  };

  const handleKeyPress = (e) => {
    // ,.preventDefault();
    if(e.key === 'Enter') {
      document.getElementById("text").value = "";
      setChangeColor(true);
    }
  }

  const displayWord = tags.split(/,/);

  if(displayWord.length !== 0) {
    displayWord.pop()
  }

    //get random Index Value
    let randomIndex = displayWord[Math.floor(Math.random() * displayWord.length)];



  return (
    <Background>
      <Title thin={550}>Insert your words and seperate them by comma.
        <SubTitle small='20px'>Press Enter to see the chosen word of the day!</SubTitle>
      </Title>
      <Textarea rows='5' cols='70' placeholder='Write your words..' onKeyUp={handleKeyPress} id="text" onChange={handleChange}/>
      <Tags>
        {displayWord.map((word, index) => <Tag key={index} style={{backgroundColor: changeColor && ((randomIndex === word) 
          ? 'blue' : 'orange') }}>
          {word}</Tag> )} 
      </Tags>
    </Background>
  )
}
export default App;
