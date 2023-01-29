import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { fetchCities } from "../../../../app/slices/orders";
import CityRow from "./cityRow/CityRow";
import styles from "../../../forms/tableStyle.module.scss";

const ListOfCities: React.FC = () => {
  const dispatch = useAppDispatch();
  const allCities = useAppSelector((state) => state.orders.offeredCities);
  const mapedAllCities = allCities?.map((city) => {
    return <CityRow key={city._id} city={city} />;
  });

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{mapedAllCities}</tbody>
      </table>
    </div>
  );
};

export default ListOfCities;
