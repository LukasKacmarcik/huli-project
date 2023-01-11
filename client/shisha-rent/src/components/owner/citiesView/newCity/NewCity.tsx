import React, { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { postNewCity } from "../../../../app/slices/orders";
import formStyles from "../../../forms/form.module.scss";

export interface NewCityFormData {
  name: string;
  price: string;
}

const NewCity: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<NewCityFormData>({
    name: "",
    price: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postNewCity(formData));
  };

  return (
    <div className={formStyles.formWrapper}>
      <h1>New City</h1>
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

export default NewCity;
