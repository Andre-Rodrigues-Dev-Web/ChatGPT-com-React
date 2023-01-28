import styled from 'styled-components';

const Wrap = styled.div`
    background-color: #1c1a1a;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Content = styled.div`
    background-color: #333;
    border-radius: 10px;
    min-height: 300px;
    padding: 20px;
    width: 500px;
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
    padding: 8px 20px;
`;

export {
    Wrap,
    Content,
    Respostas
}