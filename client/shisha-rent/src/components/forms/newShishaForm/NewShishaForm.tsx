import React, { useEffect, useState } from "react";
//// Solution from https://bobbyhadz.com/blog/typescript-could-not-find-a-declaration-file-for-module-react
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FileBase from "react-file-base64";
import { useAppDispatch } from "../../../app/hooks";
import { postNewShisha, ShishaExtra } from "../../../app/slices/shishas";
import formStyles from "../form.module.scss";

export interface NewShishaFormData {
  name: string;
  description: string;
  price: string;
  deposit: string;
  selectedFile: string;
  shishaExtras: ShishaExtra[];
  amount: string;
}

const NewShishaForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<NewShishaFormData>({
    name: "",
    description: "",
    price: "",
    deposit: "",
    selectedFile: "",
    shishaExtras: [],
    amount: "0",
  });
  const [shishaExtras, setShishaExtras] = useState<ShishaExtra[]>([]);
  const [shishaExtrasForm, setShishaExtrasForm] = useState({
    name: "",
    price: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postNewShisha(formData));
  };

  const handleAddExtra = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`name: `, shishaExtrasForm.name);

    setShishaExtras((ps: ShishaExtra[]) => [
      ...ps,
      {
        name: shishaExtrasForm.name,
        price: parseFloat(shishaExtrasForm.price),
      },
    ]);
  };

  const rowsOfShishaExtras = shishaExtras.map((shishaExtra) => {
    return (
      <tr key={shishaExtra.name}>
        <td>{shishaExtra.name}</td>
        <td>{shishaExtra.price}</td>
      </tr>
    );
  });

  useEffect(() => {
    setFormData((ps) => {
      return { ...ps, shishaExtras: shishaExtras };
    });
  }, [shishaExtras]);

  return (
    <div className={formStyles.formWrapper}>
      <h1>New Shisha</h1>
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
        <textarea
          id="description"
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
        <label htmlFor="deposit"> Deposit</label>
        <input
          id="deposit"
          type="text"
          name="deposit"
          value={formData.deposit}
          onChange={(e) =>
            setFormData({ ...formData, deposit: e.target.value })
          }
        />
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="text"
          name="amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
      <div>
        <h2>ShishaExtras:</h2>
        {shishaExtras && (
          <div className={formStyles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Extra Name</th>
                  <th>Extra Price</th>
                </tr>
              </thead>
              <tbody>{rowsOfShishaExtras}</tbody>
            </table>
          </div>
        )}
        <form onSubmit={handleAddExtra}>
          <fieldset>
            <legend>Add New Extra</legend>
            <label htmlFor="name">Extra Name</label>
            <br />
            <input
              id="name"
              type="text"
              name="name"
              value={shishaExtrasForm.name}
              onChange={(e) =>
                setShishaExtrasForm({
                  ...shishaExtrasForm,
                  name: e.target.value,
                })
              }
            />
            <br />
            <label htmlFor="price">Extra Price</label>
            <br />
            <input
              id="price"
              type="text"
              name="price"
              value={shishaExtrasForm.price}
              onChange={(e) =>
                setShishaExtrasForm({
                  ...shishaExtrasForm,
                  price: e.target.value,
                })
              }
            />
            <button>Add new extra</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default NewShishaForm;
