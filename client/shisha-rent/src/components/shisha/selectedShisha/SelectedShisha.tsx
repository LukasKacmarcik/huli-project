import SelectedShishaPreview from "./selectedShishaPreview/SelectedShishaPreview";
import NewOrderForm from "../../forms/newOrderForm/NewOrderForm";
import styles from "./SelectedShisha.module.scss";

const SelectedShisha: React.FC = () => {
  return (
    <div id="selectedShisha" className={styles.selectedShisha}>
      <SelectedShishaPreview />
      <NewOrderForm />
    </div>
  );
};

export default SelectedShisha;
