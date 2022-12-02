import React, { useState } from "react";
//// Solution from https://bobbyhadz.com/blog/typescript-could-not-find-a-declaration-file-for-module-react
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FileBase from "react-file-base64";
import { useAppDispatch } from "../../../app/hooks";
import { postNewShisha } from "../../../app/slices/shishas";

export interface NewShishaFormData {
  name: string;
  description: string;
  price: string;
  selectedFile: string;
}

const NewShishaForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<NewShishaFormData>({
    name: "",
    description: "",
    price: "",
    selectedFile: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postNewShisha(formData));
    console.log("handlling submit");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        name="description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="text"
        name="price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      <label htmlFor="file">File</label>
      <FileBase
        id="file"
        type="file"
        multiple={false}
        onDone={({ base64 }: any) =>
          setFormData({ ...formData, selectedFile: base64 })
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewShishaForm;
