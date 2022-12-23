import React, { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { postNewDeliveryHour } from "../../../../app/slices/orders";

export interface NewDeliveryHourFormData {
  hour: string;
}

const NewDeliveryHour: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<NewDeliveryHourFormData>({
    hour: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postNewDeliveryHour(formData));
  };

  return (
    <div>
      <h1>New Delivery Hour (0 - 23)</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="deliveryHour">DeliveryHour</label>
        <input
          id="deliveryHour"
          type="text"
          name="deliveryHour"
          value={formData.hour}
          onChange={(e) => setFormData({ ...formData, hour: e.target.value })}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewDeliveryHour;
