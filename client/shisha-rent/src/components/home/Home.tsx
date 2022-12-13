import { useAppSelector } from "../../app/hooks";
import NewShishaForm from "../forms/newShishaForm/NewShishaForm";
import ListOfShishas from "../listOfShishas/ListOfShishas";
import SelectedShisha from "../shisha/selectedShisha/SelectedShisha";

export default function Home() {
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
}
