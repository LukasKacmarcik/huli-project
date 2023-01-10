import React, { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { postNewTobacco } from "../../../../app/slices/orders";
import formStyles from "../../../forms/form.module.scss";

export interface NewTobaccoFormData {
  name: string;
  type: string;
  price: string;
}

const NewTobacco: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<NewTobaccoFormData>({
    name: "",
    type: "",
    price: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postNewTobacco(formData));
  };

  return (
    <div className={formStyles.formWrapper}>
      <h1>New Tobacco</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="tabacco">Tabacco</option>
          <option value="molasses">Molasses</option>
        </select>
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

export default NewTobacco;
