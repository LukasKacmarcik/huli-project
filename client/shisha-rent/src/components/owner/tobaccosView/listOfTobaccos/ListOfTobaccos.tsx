import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { fetchTobaccos } from "../../../../app/slices/orders";
import TobaccoRow from "./tobaccoRow/TobaccoRow";
import styles from "../../../forms/tableStyle.module.scss";

const ListOfTobaccos: React.FC = () => {
  const dispatch = useAppDispatch();
  const allTobaccos = useAppSelector((state) => state.orders.offeredTobaccos);
  const mapedAllTobaccos = allTobaccos?.map((tobacco) => {
    return <TobaccoRow key={tobacco._id} tobacco={tobacco} />;
  });

  useEffect(() => {
    dispatch(fetchTobaccos());
  }, [dispatch]);

  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{mapedAllTobaccos}</tbody>
      </table>
    </div>
  );
};

export default ListOfTobaccos;
