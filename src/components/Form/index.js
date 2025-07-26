'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useForm as useFormspree } from '@formspree/react';
import { useForm } from 'react-hook-form';
import Field from './components/Field';
import Button from '../Button';
import s from './Form.module.scss';

const formFields = [
  {
    label: 'First name',
    type: 'text',
    placeholder: 'Enter your name',
    isRequired: true,
  },
  {
    label: 'Last name',
    type: 'text',
    placeholder: 'Enter your last name',
  },
  {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    isRequired: true,
  },
  {
    label: 'Phone',
    type: 'tel',
    placeholder: 'Enter your phone number',
  },
  {
    label: 'Message',
    type: 'textarea',
    placeholder: 'Optional',
  },
];

const Form = ({ button, className, handleClose }) => {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mrgrdbyv';

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    shouldUnregister: true,
    defaultValues: formFields.reduce(
      (acc, curr) => ({ ...acc, [curr.label.split(' ').join('_')]: '' }),
      {}
    ),
  });

  const [state, submitForm] = useFormspree(formspreeId);

  useEffect(() => {
    if (state.succeeded) {
      const timer = setTimeout(() => {
        handleClose?.();
        reset();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.succeeded, handleClose, reset]);

  const onSubmit = (data) => {
    submitForm(data);
  };

  return (
    <form
      autoComplete='off'
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(s.form, className)}
    >
      <div className={s.form_fields}>
        {formFields.map((item) => (
          <Field
            key={item.label}
            {...item}
            register={register}
            errors={errors}
            disabled={state.submitting || state.succeeded}
          />
        ))}
      </div>

      <Button
        variant='primary'
        type='submit'
        disabled={state.submitting || state.succeeded}
        className={clsx(s.form_btn, { [s.success]: state.succeeded })}
      >
        {state.succeeded ? 'Sent!' : button}
      </Button>
    </form>
  );
};

export default Form;
