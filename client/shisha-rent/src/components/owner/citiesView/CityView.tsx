import React from "react";
import ListOfCities from "./listOfCities/ListOfCities";
import NewCity from "./newCity/NewCity";

const CityView = () => {
  return (
    <div>
      <NewCity />
      <ListOfCities />
    </div>
  );
};

export default CityView;
