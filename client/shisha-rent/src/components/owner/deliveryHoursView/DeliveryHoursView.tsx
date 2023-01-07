import React from "react";
import ListOfDeliveryHours from "./listOfDeliveryHours/ListOfDeliveryHours";
import NewDeliveryHour from "./newDeliveryHour/NewDeliveryHour";

const DeliveryHoursView: React.FC = () => {
  return (
    <div>
      <NewDeliveryHour />
      <ListOfDeliveryHours />
    </div>
  );
};

export default DeliveryHoursView;
