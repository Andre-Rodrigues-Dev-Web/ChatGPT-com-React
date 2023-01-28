# ChatGPT-com-React

A ideia desse projetinho é entender como a API do ChatGPT se comporta em uma biblioteca de componentização, iremos poder fazer diversas perguntas (dentro das regras do algoritmo do ChatGPT).

## Breve história sobre o ChatGPT

O ChatGPT foi desenvolvido em 2022 pela OpenA, ele é um protótipo de um chatbot com inteligência artificial especializado em diálogo, seu algotimo está limitado em um conhecimento até o ano de 2021. Mesmo com essa limitação, o ChatGPT vem surpreendendo a todos com sua agilidade em resolver diversos problemas, mas vale destacar também que o mesmo consegue errar em diversas situações, por isso não confie 100% no algoritmo dele. 

## Iniciando o desafio (estilizando nosso componente)

Nosso pçrimeiro passo nessa brincadeira será criar uma conta no site da OpenAI, você pode entrar no seguinte link: https://openai.com/api/, após cadastrado vá direto nesse outro link: https://beta.openai.com/account/api-keys, na sessão API keys gere uma chave para você (copie e cole elaem um bloco de notas). Agora vamos aos próximos passos, onde iremos codar.

### Criando nossa estrututa React

Para baixar os pacotes do React, utilize o seguinte comando: npx create-react-app projeto-react-chat-gpt, vale destacar que eu coloquei o nome "projeto-react-gpt", mas fique a vontade para colocar qualquer nome em seu projeto.

### Instalando o Styled Components

Para estilizar nossos components, iremos adotar a lib Styled Components, com isso poderemos separar nossas regras de lógica de estilização. O comando para baixarmos o pacote é este: npm install styled-components

### Deixando apenas o necessário 

Ao abrirmos a pasta src da nossa aplicação, observamos que existem alguns arquivos que vem como padrão, são eles: App.js, App.css, App.test.js index.css, index.js, index.css, logo.svg,  reportWebVitals.js e setupTest.js. Iremos excluir: App.css e logo.svg, o motivo é que não vamos usa-los em nossa aplicação, exclua também o código escrito dentro de App.js.

### Customizando nosso componente

Nosso primeiro passo na customização é abrirmos nosso arquivo App.js, nele iremos inserir o seguinte código:

```javascript
import React from'react'

constApp= () => {

  return (

    <div></div>

  )

}

export default App
```

Vamos desenvolver nosso componente para o ChatGPT, crie um diretório chamado: ChatGpt, dentro crie dois arquivos, um chamado index.jsx e outro style.js, feito isso copie a estrutura de componentes App.js (afinal somos espertos e queremos reduzir nosso tempo de códificação). A primeira parte do nosso código index.jsx deverá ficar assim:

```javascript
import React from 'react'

const ChatGpt = () => {
  return (
    <div></div>
  )
}
export default ChatGpt
```

Perceba que apenas renomeamos por hora nosso componente, mas agora iremos customiza-lo totalmente, iremos criar alguns containers e nosso formulario, abra o style.js e escreva os seguintes trechos:

```javascript
import styled from 'styled-components';

const Wrap = styled.div`
    background-color: #f5f5f5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Content = styled.div`
    background-color: #333;
    border-radius: 10px;
    padding: 20px;
    width: 500px;
`;

export {
    Wrap,
    Content
}
```

Agora criamos nossos primeiros containers, precisamos importa-los em nosso index.js, mas para poupar tempo, abaixo está o index.jsx com as importações e os componentes na ordem correta.

```javascript
import React from 'react'
import { Content, Wrap } from './style'

const ChatGpt = () => {
  return (
    <Wrap>
        <Content>
            <h1>Chat GPT</h1>
        </Content>
    </Wrap>
  )
}
export default ChatGpt
```

Para fechamos a parte de componentes visuais, adicione em seu código style.js, o seguinte código:

```javascript
const Content = styled.div
    ...
    h1{
        box-shadow: 0 0 10px #00000040;
        color: #fff;
        width: 260px;
        span{
            display: inline-block;
            padding-top: 6px;
            padding-bottom: 6px;
            &:first-child{
                background-color: #2196f3;
                padding-left: 20px;
                padding-right: 5px;
            }
            &:last-child{
                background-color: #4caf50;
                padding-left: 1px;
                padding-right: 20px;
            }
        }
    }
    form{
        width: 100%;
        button{
            background-color: #2196f3;
            border: none;
            border-radius: 5px;
            color: #fff;
            cursor: pointer;
            display: block;
            font-size: 16px;
            margin-top: 20px;
            padding: 10px;
            width: 100%;
        }
        textarea{
            background-color: #333;
            color: #fff;
            outline: none;
            width: 100%;
        }
    }
`;
const Respostas = styled.div`
    background-color: #222;
    color: #fff;
    margin-bottom: 20px;
    min-height: 200px;
`;

export {
    ...,
    Respostas
}
```

Com todo o código acima fechamos a parte de estilização do nosso css, agora nos resta adaptar o nosso index.jsx com os novos componentes, confira o código abaixo.

```javascript
import React from 'react'
import { Content, Wrap, Respostas } from './style'

const ChatGpt = () => {
  return (
    <Wrap>
        <Content>
            <h1><span>React</span><span>ChatGPT</span></h1>
            <Respostas></Respostas>
            <form>
                <textarea rows="8"></textarea>
                <button type='submit'>Perguntar</button>
            </form>
        </Content>
    </Wrap>
  )
}
export default ChatGpt
```

## Criando a lógica de nosso componente

Chegou a hora de vermos a mágica de fato acontecer, vamos codar toda a lógica de nossa aplicação, mas antes de vermos toda essa magia, precisamos baixar um pacote, seu nome é Axios. O Axios será responsável por trazer os serviços da API para nossa aplicação, e para baixa-lo basta apenas digitar o seguinte comando: npm install axios.

### Consumindo a API ChatGPT

No arquivo index.jsx, edite a linha de importação do React para o seguinte: 

```javascript
import React, { useState } from 'react';
```

Após a edição, adicionamos o import do axios.

```javascript
import axios from 'axios';
```

Vamos então pegar o estado de nosso formulário com as informações para envio das perguntas, o código deve ser inserido dentro da função do componente.

```javascript
const [input, setInput] = useState('');
const [output, setOutput] = useState('');
const [isLoading, setIsLoading] = useState(false);

const handleInputChange = (event) => {setInput(event.target.value);}
```

Depois de adicionarmos o controle de estado de nosso formulário, chegou a hora de usarmos o axios para consumirmos a API, abaixo do código anterior, adicione os seguintes trechos:

```javascript
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
          'Authorization': `Bearer sua-chave`
        }
      });
      setOutput(response.data.choices[0].text);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
```

Dentro de headers adicione sua chave da API, com a chave adicionada agora adaptamos nosso formulário, o código final ficará assim:

```javascript
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
```

Com isso concluímos todo nosso código, agora basta fazer suas perguntas e ver as respostas chegarem. Mas existe um detalhe importante, esse nosso projetinho não está com as resposta formatadas, por isso elas vão vir grudadas (fique a vontade para formatar os textos). Bom espero que tenha gostado, e até o próximo projetinho.
