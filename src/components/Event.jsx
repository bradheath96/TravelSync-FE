import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid black;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

function Event({ eventId, eventName, index }) {
  console.log(eventId);

  return (
    <Draggable draggableId={eventId} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
        >
          {eventName}
        </Container>
      )}
    </Draggable>
  );
}

export default Event;
