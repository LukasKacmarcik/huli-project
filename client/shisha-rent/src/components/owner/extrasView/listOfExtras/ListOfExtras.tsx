import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { fetchExtras } from "../../../../app/slices/orders";
import ExtraRow from "./extraRow/ExtraRow";
import styles from "../../../forms/tableStyle.module.scss";

const ListOfExtras: React.FC = () => {
  const dispatch = useAppDispatch();
  const allExtras = useAppSelector((state) => state.orders.offeredExtras);
  const mapedAllExtras = allExtras?.map((extra) => {
    return <ExtraRow key={extra._id} extra={extra} />;
  });

  useEffect(() => {
    dispatch(fetchExtras());
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
        <tbody>{mapedAllExtras}</tbody>
      </table>
    </div>
  );
};

export default ListOfExtras;
