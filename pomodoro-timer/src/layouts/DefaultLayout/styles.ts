import styled from 'styled-components'

export const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    max-width: 74rem;
    height: calc(100vh - 10rem);
    margin: 5rem auto;
    padding: 2.5rem;

    background: ${(props) => props.theme['gray-800']};
    border-radius: 8px;

    
`