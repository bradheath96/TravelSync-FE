export default function JoinItinerary({ isHidden, setIsHidden, setIsJoin }) {
  function handleClick() {
    if (isHidden) {
      setIsJoin(false);
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  }

  return (
    <button onClick={handleClick} className="styled-button CreateButton">
      Create Itinerary
    </button>
  );
}
