import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React, { useCallback, useState, useEffect, useContext } from "react";

//хук управления формой
export function useForm() {
  const [values, setValues] = React.useState({});


  const handleSubmit = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleSubmit, setValues };
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  // const currentUser = useContext(CurrentUserContext);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });


    setErrors({ ...errors, [name]: target.validationMessage });
    if (name === 'name') {
      if (target.validity.patternMismatch) {
        setErrors({ ...errors, [name]: "Имя может содержать только буквы русского и английского алфавита, пробел, дефис." });
      }
    }

    if (name === 'email') {
      if (target.validity.patternMismatch) {
        console.log(target.validity)
        setErrors({ ...errors, [name]: "Е-mail должен соответствовать шаблону электронной почты" });
      }
    }

    setIsValid(target.closest("form").checkValidity());
  };


  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}