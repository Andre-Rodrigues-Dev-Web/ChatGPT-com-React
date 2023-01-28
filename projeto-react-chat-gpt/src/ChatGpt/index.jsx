import React, { useState } from 'react';
import axios from 'axios';
import { Content, Wrap, Respostas } from './style'

const ChatGpt = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  const envPergunta = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
        prompt: input,
        max_tokens: 1024
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`
        }
      });
      setOutput(response.data.choices[0].text);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
  return (
    <Wrap>
        <Content>
            <h1><span>React</span><span>ChatGPT</span></h1>
            <Respostas>{isLoading ? <p>Carregando...</p> : <p>{output}</p>}</Respostas>
            <form onSubmit={envPergunta}>
                <textarea value={input} onChange={handleInputChange} rows="8"></textarea>
                <button type='submit'>Perguntar</button>
            </form>
        </Content>
    </Wrap>
  )
}
export default ChatGpt