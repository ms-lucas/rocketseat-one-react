import styled from "styled-components"

export const CountDownWrapper = styled.div`
    display: flex;
    gap: 1rem;
    
    font-family: "Roboto Mono", monospace;
    font-size: 10rem; 
    line-height: 8rem;
    color: ${props => props.theme["gray-100"]};

    span {
        background: ${props => props.theme["gray-700"]};
        padding: 2rem 1rem;
        border-radius: 8px;
    }

`
export const CountDownSeparator = styled.div`
    padding: 2rem 0;
    color: ${props => props.theme["green-500"]};

    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
`