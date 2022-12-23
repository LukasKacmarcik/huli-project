import React from "react";
import ListOfDeliveryHours from "./listOfDeliveryHours/ListOfDeliveryHours";
import NewDeliveryHour from "./newDeliveryHour/NewDeliveryHour";

const DeliveryHoursView: React.FC = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      <NewDeliveryHour />
      <ListOfDeliveryHours />
    </div>
  );
};

export default DeliveryHoursView;
