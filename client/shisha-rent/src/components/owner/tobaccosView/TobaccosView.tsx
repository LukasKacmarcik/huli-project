import React from "react";
import ListOfTobaccos from "./listOfTobaccos/ListOfTobaccos";
import NewTobacco from "./newTobacco/NewTobacco";

const TobaccosView = () => {
  return (
    <div>
      <NewTobacco />
      <ListOfTobaccos />
    </div>
  );
};

export default TobaccosView;
