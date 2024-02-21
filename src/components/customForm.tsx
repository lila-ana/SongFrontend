import React, { useState } from "react";
import { Button, Form, FormInstance, Input } from "antd";

export interface FormField {
  name: string;
  label?: string;
  placeholder: string;
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "textarea"
    | "checkbox"
    | "select"
    | "radio"
    | "date"
    | "time"
    | "file";
  className?: string;
  rules?: any[];
  prefixIcon?: JSX.Element;
}

interface FormProps {
  onSubmit: (values: any) => void;
  fields: FormField[];
  buttonText: string;
  buttonClassName?: string;
}

const CustomForm: React.FC<FormProps> = ({
  onSubmit,
  fields,
  buttonText,
  buttonClassName,
}) => {
  const [form] = Form.useForm<FormInstance>();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const onFinish = async (values: FormInstance<any>) => {
    try {
      await form.validateFields();
      onSubmit(values);
    } catch (errors: any) {
      const errorMap: { [key: string]: string } = {};
      errors.errorFields.forEach((errorField: any) => {
        errorMap[errorField.name[0]] = errorField.errors[0];
      });
      setFormErrors(errorMap);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      {fields.map((field, index) => (
        <Form.Item
          key={index}
          name={field.name}
          label={field.label}
          rules={field.rules}
          validateStatus={formErrors[field.name] ? "error" : ""}
          help={formErrors[field.name]}
        >
          {field.type === "textarea" ? (
            <Input.TextArea />
          ) : (
            <Input type={field.type} />
          )}
        </Form.Item>
      ))}
      <Form.Item>
        <Button className={buttonClassName} htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
