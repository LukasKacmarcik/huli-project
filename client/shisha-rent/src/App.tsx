import React from "react";
import NewShishaForm from "./components/forms/newShishaForm/NewShishaForm";
import ListOfShishas from "./components/listOfShishas/ListOfShishas";

const App: React.FC = () => {
  return (
    <>
      <h1>Hi</h1>
      <NewShishaForm />
      <ListOfShishas />
    </>
  );
};
export default App;
