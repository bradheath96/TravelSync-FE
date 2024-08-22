import React from "react";
import styled from "styled-components";
import Event from "./Event";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid black;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const EventList = styled.div`
  padding: 8px;
`;

function Column({ column, events }) {
    
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={String(column.id)}>
        {(provided) => (
          <EventList ref={provided.innerRef} {...provided.droppableProps}>
            {events.map((event, index) => {
              return (
								<Event
									key={event.id}
									eventId={event.id}
                  eventName={event.name}
                  eventRating={event.rating}
									index={index}
								/>
							);
            })}
            {provided.placeholder}
          </EventList>
        )}
      </Droppable>
    </Container>
  );
}

export default Column;
