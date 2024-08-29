import React, { useState, useEffect, useContext } from "react";
import { GroupItineraryContext } from "./ItineraryContextProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  getItineraryByItineraryID,
  getItineraryEvents,
  updateItineraryOrder,
  deleteEventById,
} from "../utils/axios";

import deleteBin from "../assets/deleteBin.png";
import reshuffle from "../assets/reshuffle.png";

const ItineraryList = () => {
  const [events, setEvents] = useState([]);
  const [eventOrder, setEventOrder] = useState([]);
  const { currentItineraryId } = useContext(GroupItineraryContext);

  const fetchItineraryData = () => {
    if (currentItineraryId) {
      getItineraryByItineraryID(currentItineraryId)
        .then(({ itinerary_order }) => {
          setEventOrder(itinerary_order);
          return getItineraryEvents(currentItineraryId);
        })
        .then((eventList) => {
          setEvents(eventList);
        })
        .catch((error) =>
          console.error("Error fetching itinerary details:", error)
        );
    }
  };

  useEffect(() => {
    fetchItineraryData();
  }, [currentItineraryId]);

  function handleDeleteEvent(event_id) {
    deleteEventById(event_id)
      .then((response) => {
        console.log("Event deleted successfully:", response);
        fetchItineraryData();
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  }

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.index === source.index) return;

    const newEventOrder = Array.from(eventOrder);
    const [movedEventId] = newEventOrder.splice(source.index, 1);
    newEventOrder.splice(destination.index, 0, movedEventId);

    setEventOrder(newEventOrder);

    updateItineraryOrder(currentItineraryId, newEventOrder)
      .then((response) => console.log("Itinerary updated:", response))
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
              maxWidth: "700px",
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
                      <div className="itineraryEventContentContainer">
                        <button
                          onClick={() => {
                            handleDeleteEvent(event.id);
                          }}
                        >
                          <img
                            src={deleteBin}
                            className="binImg"
                            alt="delete button"
                          />
                        </button>
                        {event.name}
                        <img src={reshuffle} className="reshuffleImg" />
                      </div>
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
