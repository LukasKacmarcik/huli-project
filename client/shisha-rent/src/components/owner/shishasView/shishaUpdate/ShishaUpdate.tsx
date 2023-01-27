import React, { useEffect, useState } from "react";
//// Solution from https://bobbyhadz.com/blog/typescript-could-not-find-a-declaration-file-for-module-react
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FileBase from "react-file-base64";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  fetchShishas,
  ShishaExtra,
  updateShisha,
} from "../../../../app/slices/shishas";
import formStyles from "../../../forms/form.module.scss";

const ShishaUpdate: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errMessages = useAppSelector((state) => state.shishas.messages);

  const shishaStatus = useAppSelector((state) => state.shishas.status);
  let shishaToUpdate = useAppSelector((state) => state.shishas.shishas)?.find(
    (shisha) => shisha._id === params.shishaId
  );

  const defaultFormData: any = {
    _id: "",
    name: "",
    description: "",
    price: "",
    deposit: "",
    amount: "0",
    show: false,
    selectedFile: "",
    shishaExtras: [],
  };
  const [formData, setFormData] = useState(defaultFormData);

  const [shishaExtrasForm, setShishaExtrasForm] = useState({
    name: "",
    price: "",
  });
  //// If page is reloaded we fetch shishas so we can prefill form with actual data
  useEffect(() => {
    if (shishaStatus === "idle") {
      dispatch(fetchShishas());
    }
  }, [dispatch, shishaStatus]);

  useEffect(() => {
    if (shishaToUpdate !== undefined) {
      setFormData({
        _id: shishaToUpdate._id,
        name: shishaToUpdate.name ? shishaToUpdate.name : "",
        description: shishaToUpdate.description
          ? shishaToUpdate.description
          : "",
        price: shishaToUpdate.price ? shishaToUpdate.price : "",
        deposit: shishaToUpdate.deposit ? shishaToUpdate.deposit : "",
        amount: shishaToUpdate.amount ? shishaToUpdate.amount : "0",
        show: shishaToUpdate.show === true ? shishaToUpdate.show : false,
        selectedFile: shishaToUpdate.selectedFile
          ? shishaToUpdate.selectedFile
          : "",
        shishaExtras: shishaToUpdate.shishaExtras,
      });
    }
  }, [shishaToUpdate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((ps: any) => {
      return {
        ...ps,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(updateShisha(formData));
    if (Object.keys(errMessages).length === 0) {
      navigate(-1);
    }
  };

  const onCancel = () => {
    navigate(-1);
  };

  const handleAddExtra = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData((ps: any) => {
      return {
        ...ps,
        shishaExtras: [
          ...ps.shishaExtras,
          {
            name: shishaExtrasForm.name,
            price: parseFloat(shishaExtrasForm.price),
          },
        ],
      };
    });
  };

  const rowsOfShishaExtras = formData.shishaExtras.map(
    (shishaExtra: ShishaExtra) => {
      return (
        <tr key={shishaExtra.name}>
          <td>{shishaExtra.name}</td>
          <td>{shishaExtra.price}</td>
          <td>
            <button
              onClick={() =>
                setFormData((ps: any) => {
                  const filteredExtras = ps.shishaExtras.filter(
                    (extra: any) => extra.name !== shishaExtra.name
                  );
                  return { ...ps, shishaExtras: filteredExtras };
                })
              }
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
  );

  return (
    <div className={formStyles.formWrapper}>
      <h1>Update Shisha</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <label htmlFor="deposit">Deposit</label>
        <input
          type="text"
          id="deposit"
          name="deposit"
          value={formData.deposit}
          onChange={handleChange}
        />
        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <label htmlFor="show">Show</label>
        <select
          name="show"
          id="show"
          value={formData.show}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label htmlFor="selectedFile">Selected File</label>
        <FileBase
          id="file"
          type="file"
          multiple={false}
          onDone={({ base64 }: any) =>
            setFormData({ ...formData, selectedFile: base64 })
          }
        />
        <div className={formStyles.actions}>
          <button>Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
      <div>
        <h2>ShishaExtras:</h2>
        {formData.shishaExtras && (
          <div className={formStyles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Extra Name</th>
                  <th>Extra Price</th>
                  <th>Action</th>
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

export default ShishaUpdate;
