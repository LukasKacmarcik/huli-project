import React from "react";
import NewShishaForm from "../../forms/newShishaForm/NewShishaForm";
import OwnerListOfShishas from "./ownerListOfShishas/OwnerListOfShishas";

const ShishasView = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      <NewShishaForm />
      <OwnerListOfShishas />
    </div>
  );
};

export default ShishasView;
