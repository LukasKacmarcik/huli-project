import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { fetchShishas } from "../../../../app/slices/shishas";
import styles from "./OwnerListOfShishas.module.scss";
import ShishaRow from "./shishaRow/ShishaRow";

const OwnerListOfShishas: React.FC = () => {
  const dispatch = useAppDispatch();
  const allShishas = useAppSelector((state) => state.shishas.shishas);
  const mapedAllShishas = allShishas?.map((shisha) => {
    return <ShishaRow key={shisha._id} shisha={shisha} />;
  });

  useEffect(() => {
    dispatch(fetchShishas());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Show</th>
              <th>Selected File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{mapedAllShishas}</tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerListOfShishas;
