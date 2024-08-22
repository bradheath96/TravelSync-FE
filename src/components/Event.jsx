import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid black;
  border-radius: 6px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: pink;
`;

function Event({ eventId, eventName, eventRating, index }) {

  return (
		<Draggable draggableId={String(eventId)} index={index}>
			{(provided) => (
				<Container
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}>
					<h4>{eventName}</h4>
					<p>Rating: {eventRating}</p>
				</Container>
			)}
		</Draggable>
	);
}

export default Event;
