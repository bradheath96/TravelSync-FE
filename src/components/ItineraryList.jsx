import { DragDropContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import Column from "./Column";
import { getItineraryEvents, getItineraryByItineraryID, updateItineraryOrder } from "../utils/axios";

const ItineraryList = ({ itinerary_id }) => {
	const [tablesData, setTablesData] = useState(null);
	const [itineraryOrder, setItineraryOrder] = useState([]);
	const [itineraryEvents, setItineraryEvents] = useState([]);
	const [itineraryEventsDisplay, setItineraryEventsDisplay] = useState([]);

	useEffect(() => {
		getItineraryByItineraryID(itinerary_id)
			.then((itinerary) => {
				setItineraryOrder(itinerary.itinerary_order);
				getItineraryEvents(itinerary_id).then((events) => {
					setItineraryEvents(events);
					const displayData = events.map((event) => {
						return {
                            name: event.name,
                            id: event.id
						};
					});
					setItineraryEventsDisplay(displayData);
				});
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	useEffect(() => {
		const data = {
			column: {
				id: itinerary_id,
				title: "Itinerary",
				event_ids: itineraryOrder,
			},
			events: itineraryEventsDisplay,
		};
		setTablesData(data);
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
        updateItineraryOrder(itinerary_id, newColumn.event_ids).then((itinerary) => {
            setItineraryOrder(itinerary.itinerary_order)
        });

		setTablesData((prevState) => ({
			...prevState,
			column: newColumn,
		}));
	}
    console.log(tablesData.column.event_ids, "<<< ids");
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Column
				key={tablesData.column.id}
				column={tablesData.column.id}
				events={tablesData.events}
			/>
		</DragDropContext>
	);
};

export default ItineraryList;
