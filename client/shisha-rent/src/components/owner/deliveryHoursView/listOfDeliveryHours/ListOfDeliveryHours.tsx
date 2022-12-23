import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { fetchDeliveryHours } from "../../../../app/slices/orders";
import DeliveryHourRow from "./deliveryHourRow/DeliveryHourRow";
import styles from "./ListOfDeliveryHours.module.scss";

const ListOfDeliveryHours: React.FC = () => {
  const dispatch = useAppDispatch();
  const allDeliveryHours = useAppSelector(
    (state) => state.orders.deliveryHours
  );
  const mapedAllDeliveryHours = allDeliveryHours?.map((deliveryHour) => {
    return (
      <DeliveryHourRow key={deliveryHour._id} deliveryHour={deliveryHour} />
    );
  });

  useEffect(() => {
    dispatch(fetchDeliveryHours());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Hour</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{mapedAllDeliveryHours}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOfDeliveryHours;
