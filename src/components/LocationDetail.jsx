import SmallMap from "./SmallMap";

const LocationDetail = () => {
  const location = history.state.usr.location;
  if (!location) {
    return <h1>404 Location Not Found</h1>;
  }
  return (
    <div>
      <h1>{location.name}</h1>
      <p>{location.description}</p>
      <h3>Rating: {location.rating}</h3>
      <h4>Opening Times: {location.openingTimes}</h4>
      <SmallMap location={location} />
    </div>
  );
};

export default LocationDetail;
