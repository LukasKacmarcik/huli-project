import React, { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { postNewExtra } from "../../../../app/slices/orders";

export interface NewExtraFormData {
  name: string;
  price: string;
}

const NewExtra: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<NewExtraFormData>({
    name: "",
    price: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postNewExtra(formData));
  };

  return (
    <div>
      <h1>New Extra</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          name="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewExtra;
