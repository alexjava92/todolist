import React from 'react';
import styled, {css} from "styled-components";
import {FilterValuesType} from "../App";


type PropsType = {
    name: string
    callBack: () => void
    filter?: FilterValuesType

}

export const Button = (props: PropsType) => {

    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <StyledButton name={props.name} onClick={onClickHandler} filter={props.filter}>
            {props.name}
        </StyledButton>
    );
};

const StyledButton = styled.button<{filter?: FilterValuesType}>`
  
  background: red;
${props => props.filter === "All" && css`
  background: green
`
}

${props => props.filter === "Active" && css`
  background: green
`
}

${props => props.filter === "Completed" && css`
  background: green
`
}
`
