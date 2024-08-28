// DraggableList.jsx
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  getItineraryByItineraryID,
  getItineraryEvents,
  updateItineraryOrder,
} from "../utils/axios";

const ItineraryList = ({ itinerary_id }) => {
  const [events, setEvents] = useState([]);
  const [eventOrder, setEventOrder] = useState([]);

  useEffect(() => {
    getItineraryByItineraryID(itinerary_id)
      .then(({ itinerary_order }) => {
        setEventOrder(itinerary_order);
        return getItineraryEvents(itinerary_id);
      })
      .then((eventList) => {
        setEvents(eventList);
      })
      .catch((error) =>
        console.error("Error fetching itinerary details:", error)
      );
  }, [itinerary_id]);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.index === source.index) return;

    // Reorder the eventOrder array based on the drag-and-drop result
    const newEventOrder = Array.from(eventOrder);
    const [movedEventId] = newEventOrder.splice(source.index, 1);
    newEventOrder.splice(destination.index, 0, movedEventId);

    // Update state with the new order
    setEventOrder(newEventOrder);

    // update database
    updateItineraryOrder(itinerary_id, newEventOrder)
      .then((response) =>
        console.log("Itinerary order updated successfully:", response)
      )
      .catch((error) =>
        console.error("Error updating itinerary order:", error)
      );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              margin: "8px",
              backgroundColor: "var(--quad-color)",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            {eventOrder.map((eventId, index) => {
              const event = events.find((e) => e.id === eventId);
              if (!event) return null;

              return (
                <Draggable
                  key={event.id}
                  draggableId={String(event.id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: "none",
                        padding: "14px",
                        marginBottom: "12px",
                        backgroundColor: "var(--tertiary-color)",
                        border: "none",
                        borderRadius: "6px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {event.name}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

    </DragDropContext>
  );
};

export default ItineraryList;
