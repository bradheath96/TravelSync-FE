import React, { useState, useEffect, useContext } from "react";
import { ItineraryContext } from "../Context/ItineraryContextProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import {
  getItineraryByItineraryID,
  getItineraryEvents,
  updateItineraryOrder,
  deleteEventById,
} from "../../axios/index";

import globe from "../../assets/exploreGlobe.png";
import deleteBin from "../../assets/deleteBin.png";
import reshuffle from "../../assets/reshuffle.png";

const ItineraryList = () => {
  const [events, setEvents] = useState([]);
  const [eventOrder, setEventOrder] = useState([]);
  const { currentItinerary } = useContext(ItineraryContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const fetchItineraryData = () => {
    setIsLoading(true);
    if (currentItinerary) {
      getItineraryByItineraryID(currentItinerary.id)
        .then(({ itinerary_order }) => {
          console.log(itinerary_order);
          setEventOrder(itinerary_order);
          return getItineraryEvents(currentItinerary.id);
        })
        .then((eventList) => {
          setEvents(eventList);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchItineraryData();
  }, [currentItinerary]);

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

    updateItineraryOrder(currentItinerary.id, newEventOrder)
      .then((response) => console.log("Itinerary updated:", response))
      .catch((error) =>
        console.error("Error updating itinerary order:", error)
      );
  };

  function handleGoToMap() {
    navigate("/map");
  }

  return isLoading ? (
    "loading"
  ) : eventOrder.length === 0 ? (
    <div className="noLocations">
      <button onClick={handleGoToMap}>
        <p>You dont yet have any locations saved</p>
        <p>click here to add a location</p>
        <img src={globe} alt="" />
      </button>
    </div>
  ) : (
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
              width: "80%",
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
