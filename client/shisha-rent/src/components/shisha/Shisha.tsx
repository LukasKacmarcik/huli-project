import React from "react";
import { Shisha as ShishaType } from "../../app/slices/shishas";

interface Props {
  passedShisha: ShishaType;
}

const Shisha: React.FC<Props> = ({ passedShisha }) => {
  // passedShisha.
  return (
    <>
      <img src={passedShisha.selectedFile} alt="shisha" />
      <h2>{passedShisha.name}</h2>
      <p>{passedShisha.description}</p>
      <h4>{passedShisha.price}</h4>
    </>
  );
};

export default Shisha;
