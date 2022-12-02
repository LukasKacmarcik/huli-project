import React from "react";
import { useAppSelector } from "../../app/hooks";
import ShishaComponent from "../shisha/Shisha";
import { Shisha } from "../../app/slices/shishas";

const ListOfShishas: React.FC = () => {
  const shishas: Shisha[] = useAppSelector((state) => state.shishas.shishas);
  const listOfShishas = shishas.map((shisha) => {
    return (
      <li key={shisha.selectedFile}>
        <ShishaComponent passedShisha={shisha} />;
      </li>
    );
  });

  return <ul>{listOfShishas}</ul>;
};

export default ListOfShishas;
