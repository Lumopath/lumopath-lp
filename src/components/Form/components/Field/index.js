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
    const baseRules = {
      required: !!isRequired && '*required',
      validate: (value) => !isRequired || value.trim() !== '' || '*required',
    };

    if (type === 'email') {
      return {
        ...baseRules,
        pattern: {
          value: emailPattern,
          message: '*invalid format',
        },
      };
    }

    if (type === 'tel') {
      return {
        ...baseRules,
        pattern: {
          value: telPattern,
          message: '*invalid format',
        },
      };
    }

    return baseRules;
  };

  return (
    <div className={s.field}>
      <label htmlFor={name} className={s.field_label}>
        {label}{' '}
        {!isRequired && <span className={s.field_hint}>(Optional)</span>}
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
