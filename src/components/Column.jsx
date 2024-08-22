import React from "react";
import styled from "styled-components"
import Event from "./Event";

const Container = styled.div`
    margin: 8px;
    border: 1px solid black;
    border-radius: 2px;
`

const Title = styled.h3`
    padding: 8px;
`

const EventList = styled.div`
    padding: 8px;
`

function Column({column, events}){
    return (
        <Container>
            <Title>{column.title}</Title>
            <EventList>{events.map((event) => {
                return <Event key={event.id} eventName={event.name}/>
            })}</EventList>
        </Container>
        
    )
}

export default Column;