import React from "react";
import SelectedShishaPreview from "./selectedShishaPreview/SelectedShishaPreview";
import ShishasDatePicker from "./shishasDatePicker/ShishasDatePicker";

const SelectedShisha: React.FC = () => {
  return (
    <div>
      <SelectedShishaPreview />
      <ShishasDatePicker />
    </div>
  );
};

export default SelectedShisha;
