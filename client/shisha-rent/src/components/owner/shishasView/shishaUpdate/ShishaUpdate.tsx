import React, { useEffect, useState } from "react";
//// Solution from https://bobbyhadz.com/blog/typescript-could-not-find-a-declaration-file-for-module-react
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FileBase from "react-file-base64";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { fetchShishas, updateShisha } from "../../../../app/slices/shishas";
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
    show: false,
    selectedFile: "",
  };
  const [formData, setFormData] = useState(defaultFormData);

  //// If page is reloaded we fetch orders so we can prefill form with actual data
  useEffect(() => {
    if (shishaStatus === "idle") {
      dispatch(fetchShishas());
    }
  }, [dispatch, shishaStatus]);

  useEffect(() => {
    if (shishaToUpdate !== undefined)
      setFormData({
        _id: shishaToUpdate._id,
        name: shishaToUpdate.name ? shishaToUpdate.name : "",
        description: shishaToUpdate.description
          ? shishaToUpdate.description
          : "",
        price: shishaToUpdate.price ? shishaToUpdate.price : "",
        show: shishaToUpdate.show === true ? shishaToUpdate.show : false,
        selectedFile: shishaToUpdate.selectedFile
          ? shishaToUpdate.selectedFile
          : "",
      });
  }, [shishaToUpdate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
        <input
          type="text"
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
        <label htmlFor="show">Show</label>
        {/* <input
          type="text"
          id="show"
          name="show"
          value={formData.show}
          onChange={handleChange}
        /> */}
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
    </div>
  );
};

export default ShishaUpdate;
