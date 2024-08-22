import React from "react"
import styled from "styled-components"

const Container = styled.div`
    border: 1px solid black;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
`

function Event({eventId, eventName}){
    console.log(eventName)

        return (
            <Container>
                {eventName}
            </Container>
        )
}

export default Event


