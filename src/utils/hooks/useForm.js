import { useState } from 'react';

const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return onSubmit(values);
  };

  return { values, handleChange, resetForm, handleSubmit };
};

export default useForm;
