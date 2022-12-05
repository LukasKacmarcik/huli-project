import React from "react";
import NewShishaForm from "./components/forms/newShishaForm/NewShishaForm";
import ListOfShishas from "./components/listOfShishas/ListOfShishas";
import SelectedShisha from "./components/shisha/selectedShisha/SelectedShisha";
import { useAppSelector } from "./app/hooks";

const App: React.FC = () => {
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );

  return (
    <>
      <h1>Hi</h1>
      <NewShishaForm />
      <ListOfShishas />
      {selectedShisha ? <SelectedShisha /> : null}
    </>
  );
};
export default App;
