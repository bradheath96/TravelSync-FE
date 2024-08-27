import { DragDropContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import Column from "./Column";
import { getItineraryEvents } from "../utils/axios";

const ItineraryList = () => {
	const [tablesData, setTablesData] = useState(null);

	useEffect(() => {
		const fetchData = () => {
			getItineraryEvents(1) // will change when the itinerary id is updated
				.then((events) => {
					const eventIds = events.map((event) => event.id);
					const data = {
						column: {
							id: "column-1",
							title: "Itinerary",
							event_ids: eventIds,
						},
						events: events,
					};
					setTablesData(data);
				})
				.catch((error) => {
					console.error("Error fetching data:", error);
				});
		};

		fetchData();
	}, []);

	if (!tablesData) {
		return <div>Loading...</div>;
	}
	function onDragEnd(result) {
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
		console.log(sourceColumn.event_ids, "<<< original position");

		const newEventIds = Array.from(sourceColumn.event_ids);

		newEventIds.splice(source.index, 1);
		newEventIds.splice(destination.index, 0, Number(draggableId));
		console.log(destination.index, "<<< index");

		const newColumn = {
			...sourceColumn,
			title: "itinerary",
			event_ids: newEventIds,
		};
		console.log(newColumn.event_ids, "<<<< new position");

		setTablesData((prevState) => ({
			...prevState,
			column: newColumn,
		}));
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Column
				key={tablesData.column.event_ids}
				column={tablesData.column.id}
				events={tablesData.events}
			/>
		</DragDropContext>
	);
};

export default ItineraryList;
