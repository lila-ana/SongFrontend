import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

interface FormField {
  id: string;
  label: string;
  type: string;
}

interface FormData {
  [key: string]: string;
}

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (formData: FormData) => void;
  userData?: FormData;
  submitButtonText?: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  userData,
  submitButtonText = "Submit",
}) => {
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    setFormData(userData || {});
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id}>{field.label}:</label>
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            value={formData[field.id] || ""}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">{submitButtonText}</button>
    </form>
  );
};

export default DynamicForm;
