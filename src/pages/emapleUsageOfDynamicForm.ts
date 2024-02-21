import React from "react";
import { useDispatch } from "react-redux";
import DynamicForm from "./DynamicForm";
import { createUser, updateUser } from "./userSlice";

const UserFormContainer: React.FC<{ userData?: any }> = ({ userData }) => {
  const dispatch = useDispatch();

  const handleSubmit = (formData: any) => {
    if (userData) {
      // If userData exists, it means we're updating an existing user
      dispatch(updateUser({ id: userData.id, ...formData })); // Assuming updateUser action updates the user data
    } else {
      // Otherwise, we're creating a new user
      dispatch(createUser(formData)); // Assuming createUser action creates a new user
    }
  };

  const fields = [
    { id: "name", label: "Name", type: "text" },
    { id: "age", label: "Age", type: "number" },
    // Add more fields as needed
  ];

  return (
    <DynamicForm fields={fields} onSubmit={handleSubmit} userData={userData} />
  );
};

export default UserFormContainer;
