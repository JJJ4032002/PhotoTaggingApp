import styled from "styled-components";
const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1em;
  width: 95%;
  margin: 0 auto;
`;
const InstructionsDiv = styled.div`
  padding: 1.5em;
  text-align: center;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  width: 100%;

  background: #6c63ff;
  color: white;
  font-family: "Indie Flower";
`;
const ListItems = styled.li`
  list-style-position: inside;
`;
export { FlexContainer, InstructionsDiv, ListItems };
