import React from "react";
import ListOfExtras from "./listOfExtras/ListOfExtras";
import NewExtra from "./newExtra/NewExtra";

const ExtrasView = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      <NewExtra />
      <ListOfExtras />
    </div>
  );
};

export default ExtrasView;
