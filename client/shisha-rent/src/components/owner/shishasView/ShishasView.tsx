import React from "react";
import NewShishaForm from "../../forms/newShishaForm/NewShishaForm";
import OwnerListOfShishas from "./ownerListOfShishas/OwnerListOfShishas";

const ShishasView = () => {
  return (
    <div>
      <NewShishaForm />
      <OwnerListOfShishas />
    </div>
  );
};

export default ShishasView;
