import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import ShishaComponent from "../shisha/Shisha";
import { fetchShishas, Shisha } from "../../../app/slices/shishas";
import styles from "./ListOfShishas.module.scss";

const ListOfShishas: React.FC = () => {
  // const shishasToShow: Shisha[] = useAppSelector(
  //   (state) => state.shishas.shishas
  // ).filter((shisha) => shisha.show === true);
  // const listOfShishas = shishasToShow.map((shisha) => {
  //   return (
  //     <li key={shisha["_id"]}>
  //       <ShishaComponent passedShisha={shisha} />
  //     </li>
  //   );
  // });
  const shishasToShow: Shisha[] = [
    {
      _id: "1",
      name: "Oduman RS-Six Pack",
      description: `Kvalitná Turecká vodná fajka s kompaktnými rozmermi (cca 50cm) a nastaviteľným difuzorom v troch rôznych polohách. To hlavné, čím vodná fajka zaujme je konštrukcia v hornej časti tela, kde je 6 trubičiek prechádzajúcich cez tanierik a tak pri každom spätnom prefúknutí môžete sledovať jedinečnú dymovú show.`,
      price: 15,
      deposit: 50,
      selectedFile: '/img/oduman.jpg',
      shishaExtras: [],
      amount: 1,
      show: true,
    },
    {
      _id: "2",
      name: "Moze Breeze Two",
      description: `Vodná fajka nemeckej značky, precízne prepracovaná do každého detailu. Výška cca 45 cm. Vodná fajka je výnimočná prepracovaním detailov ako sú napríklad živicové vložky na tele a na náustku vodnej fajky, taktiež gravírovaný tanierik. Vodná fajka má piest s odnímateľným a reverzibilným difúzorom! Táto funkcia znamená, že necháte difúzor otvorený pre ľahké ťahanie alebo ho zatvoríte pre intenzívnejšie ťahanie. Poslednou a asi najzaujímavejšou funkciou je variabilný spätný ventil, ktorý viete zložiť na 6 rôznych spôsobov a v kombinácií s dvojitým tanierikom bude každé prefúknutie vodnej fajky zážitok.`,
      price: 15,
      deposit: 50,
      selectedFile: '/img/mozebrezetwo.jpg',
      shishaExtras: [],
      amount: 1,
      show: true,
    },
    {
      _id: "3",
      name: "Moze Breeze Two Blue",
      description: `Vodná fajka nemeckej značky, precízne prepracovaná do každého detailu. Výška cca 45 cm. Vodná fajka je výnimočná prepracovaním detailov ako sú napríklad živicové vložky na tele a na náustku vodnej fajky, taktiež gravírovaný tanierik. Vodná fajka má piest s odnímateľným a reverzibilným difúzorom! Táto funkcia znamená, že necháte difúzor otvorený pre ľahké ťahanie alebo ho zatvoríte pre intenzívnejšie ťahanie. Poslednou a asi najzaujímavejšou funkciou je variabilný spätný ventil, ktorý viete zložiť na 6 rôznych spôsobov a v kombinácií s dvojitým tanierikom bude každé prefúknutie vodnej fajky zážitok.`,
      price: 15,
      deposit: 50,
      selectedFile: '/img/mozebrezeblue.jpg',
      shishaExtras: [],
      amount: 1,
      show: true,
    },
  ]

  const listOfShishas = shishasToShow.map((shisha) => {
    return (
      <li key={shisha["_id"]}>
        <ShishaComponent passedShisha={shisha} />
      </li>
    );
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchShishas());
  }, [dispatch]);

  return <ul className={styles.listOfShisha}>{listOfShishas}</ul>;
};

export default ListOfShishas;
