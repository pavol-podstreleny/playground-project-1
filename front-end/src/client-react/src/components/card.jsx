import styled from "styled-components";

export const StyledCard = styled.div`
  border-radius: 4px;
  box-shadow: -2px 2px 3px 3px rgba(0, 0, 0, 0.07); ;
`;

export const Card = (props) => {
  return <StyledCard>{props.children}</StyledCard>;
};
