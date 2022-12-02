import React from "react";
import { Shisha as ShishaType } from "../../app/slices/shishas";

interface Props {
  passedShisha: ShishaType;
}

const Shisha: React.FC<Props> = ({ passedShisha }) => {
  return <div>Shisha</div>;
};

export default Shisha;
