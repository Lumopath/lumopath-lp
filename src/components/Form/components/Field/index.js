import React from 'react';
import clsx from 'clsx';
import s from './Field.module.scss';

const emailPattern = /[a-z0-9._%+]+@[a-z0-9.]+\.[a-z]{2,}/;
const telPattern = /^[+]?[\d() -]*\d[\d() -]*$/;

const Field = ({
  label,
  type,
  isRequired,
  placeholder,
  register,
  errors,
  disabled,
}) => {
  const name = label.split(' ').join('_');

  const validationRules = () => {
    if (type === 'email')
      return {
        required: !!isRequired && '*required',
        pattern: {
          value: emailPattern,
          message: '*invalid format',
        },
      };

    if (type === 'tel')
      return {
        required: !!isRequired && '*required',
        pattern: {
          value: telPattern,
          message: '*invalid format',
        },
      };

    return {
      required: !!isRequired && '*required',
    };
  };

  return (
    <div className={s.field}>
      <label htmlFor={name} className={s.field_label}>
        {label}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          placeholder={placeholder}
          aria-invalid={errors[name] ? 'true' : 'false'}
          disabled={disabled}
          {...register(name, validationRules())}
          className={s.field_input}
        />
      ) : (
        <input
          id={name}
          type={type || 'text'}
          placeholder={placeholder}
          aria-invalid={errors[name] ? 'true' : 'false'}
          disabled={disabled}
          {...register(name, validationRules())}
          className={s.field_input}
        />
      )}

      <p className={clsx(s.field_error, { [s.show]: errors[name] })}>
        {errors[name]?.message}
      </p>
    </div>
  );
};

export default Field;
