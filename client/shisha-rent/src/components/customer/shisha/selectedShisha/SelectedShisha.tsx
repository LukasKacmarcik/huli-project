import SelectedShishaPreview from "./selectedShishaPreview/SelectedShishaPreview";
import NewOrderForm from "../../../forms/newOrderForm/NewOrderForm";
import styles from "./SelectedShisha.module.scss";
var Scroll = require("react-scroll");
var Element = Scroll.Element;

const SelectedShisha: React.FC = () => {
  return (
    <div id="selectedShisha" className={styles.selectedShisha}>
      <h1 className={styles.title}>OBJEDNÁVKA</h1>
      <Element name="selectedShishaElement"></Element>
      <SelectedShishaPreview />
      <NewOrderForm />
    </div>
  );
};

export default SelectedShisha;
