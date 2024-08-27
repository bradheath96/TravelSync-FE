import { DragDropContext } from "react-beautiful-dnd";
import dataMockForTables from "../utils/mockData";
import { useState } from "react";
import Column from "./Column";

const ItineraryList = (itinerary_id) => {
  const [tablesData, setTablesData] = useState(dataMockForTables);
  const column = tablesData.column;
  const events = column.event_ids.map((id) =>
    tablesData.events.find((event) => event.id === id)
  );
  const key = column.id;

  function onDragEnd(result) {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = tablesData.column;
    console.log(sourceColumn);

    const newEventIds = Array.from(sourceColumn.event_ids);

    newEventIds.splice(source.index, 1);
    newEventIds.splice(destination.index, 0, Number(draggableId));
    console.log(destination.index, "<<< index");

    const newColumn = {
      ...sourceColumn,
      title: "itinerary",
      event_ids: newEventIds,
    };
    console.log(newColumn, "<<<< new column");

    setTablesData((prevState) => ({
      ...prevState,
      column: newColumn,
    }));
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Column key={key} column={column} events={events} />
    </DragDropContext>
  );
};

export default ItineraryList;
