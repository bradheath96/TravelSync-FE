import { DragDropContext } from "react-beautiful-dnd";
import dataMockForTables from "../utils/mockData";
import {useState} from "react"
import Column from "./Column"


const ItineraryPage = () => {

	const [tablesData, setTablesData] = useState(dataMockForTables)
	const column = tablesData.column
	const events = tablesData.events.map((event) => {
		return event
	})
	const key = column.id
	return (
		<Column key={key} column={column} events={events}/>
	);
};

export default ItineraryPage;
