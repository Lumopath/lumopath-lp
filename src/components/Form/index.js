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
    label: 'Name',
    type: 'text',
    placeholder: 'Enter your name',
    isRequired: true,
  },
  {
    label: 'Company name',
    type: 'text',
    placeholder: 'Enter your company name',
    isRequired: true,
  },
  {
    label: 'Team size',
    type: 'text',
    placeholder: 'Enter your team size',
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
    placeholder: 'You can leave your message here',
  },
];

const Form = ({ button, className, handleClose, onSuccess }) => {
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

  const onSubmit = (data) => {
    submitForm(data);
  };

  const handleSuccessAction = () => {
    handleClose?.();
    reset();
  };

  useEffect(() => {
    if (state.succeeded) {
      onSuccess?.();
    }
  }, [state.succeeded, onSuccess]);

  return (
    <>
      {state.succeeded ? (
        <div className={clsx(s.form_success, className)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='48'
            height='48'
            fill='none'
            className={s.form_success_icon}
          >
            <rect
              width='47'
              height='47'
              x='.5'
              y='.5'
              fill='#FFEFFB'
              rx='23.5'
            />
            <rect
              width='47'
              height='47'
              x='.5'
              y='.5'
              stroke='#FFC8E5'
              rx='23.5'
            />
            <path
              stroke='#AF0C70'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='M29.33 20 22 27.33 18.67 24'
            />
          </svg>
          <p className={s.form_success_descr}>
            We’ll get back to you shortly, or you can schedule a call now.
          </p>
          <Button
            variant='primary'
            href='https://cal.com/mikey/lumopath-introduction'
            onClick={handleSuccessAction}
            className={s.form_success_btn}
          >
            Schedule a Call
          </Button>
        </div>
      ) : (
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
                disabled={state.submitting}
              />
            ))}
          </div>

          <Button variant='primary' type='submit' disabled={state.submitting}>
            {button}
          </Button>
        </form>
      )}
    </>
  );
};

export default Form;
