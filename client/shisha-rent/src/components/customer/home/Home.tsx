import { useAppSelector } from "../../../app/hooks";
import ListOfShishas from "../listOfShishas/ListOfShishas";
import SelectedShisha from "../shisha/selectedShisha/SelectedShisha";

export default function Home() {
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );

  return (
    <>
      <div style={{ maxWidth: "100vw", minHeight: "100vh" }}></div>
      <ListOfShishas />
      {selectedShisha ? <SelectedShisha /> : null}
    </>
  );
}
