import { useAppSelector } from "../../../app/hooks";
import ListOfShishas from "../listOfShishas/ListOfShishas";
import SelectedShisha from "../shisha/selectedShisha/SelectedShisha";
import heroImage from "../../../images/background-smoke.jpg";

export default function Home() {
  const selectedShisha = useAppSelector(
    (state) => state.shishas.selectedShisha
  );

  return (
    <>
      <div style={{ maxWidth: "100vw" }}>
        <img src={heroImage} alt="hero baner" width="100%" />
      </div>
      <ListOfShishas />
      {selectedShisha ? <SelectedShisha /> : null}
    </>
  );
}
