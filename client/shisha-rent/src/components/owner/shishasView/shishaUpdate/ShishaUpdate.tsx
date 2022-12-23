import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { fetchShishas, updateShisha } from "../../../../app/slices/shishas";

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
        name: shishaToUpdate.name,
        description: shishaToUpdate.description,
        price: shishaToUpdate.price,
        show: shishaToUpdate.show,
        selectedFile: shishaToUpdate.selectedFile,
      });
  }, [shishaToUpdate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      console.log("Shisha sucessfully updated");
      navigate(-1);
    }
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <div style={{ marginTop: "50px" }}>
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
        <label htmlFor="price">Tel. Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <label htmlFor="show">Show</label>
        <input
          type="text"
          id="show"
          name="show"
          value={formData.show}
          onChange={handleChange}
        />
        <label htmlFor="selectedFile">Selected File</label>
        <input
          type="text"
          id="selectedFile"
          name="selectedFile"
          value={formData.selectedFile}
          onChange={handleChange}
        />
        <div>
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
