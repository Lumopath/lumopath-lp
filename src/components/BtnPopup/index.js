'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import * as Dialog from '@radix-ui/react-dialog';
import Form from '../Form';
import Button from '../Button';
import Close from '@/assets/icons/close.svg';
import s from './BtnPopup.module.scss';

const BtnPopup = ({ label, handleClose, size, variant, className }) => {
  const [open, setOpen] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);

    if (isOpen) {
      setSubmitted(false);
    }
  };

  const closePopup = () => {
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <Button
          variant={variant}
          size={size}
          onClick={handleClose}
          className={className}
        >
          {label}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay}>
          <Dialog.Content aria-describedby={undefined} className={s.popup}>
            <Dialog.Title asChild>
              <div className={clsx('h4', s.popup_title)}>
                {submitted ? (
                  <div className={s.popup_success}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='28'
                      height='28'
                      fill='none'
                      className={s.popup_success_icon}
                    >
                      <rect
                        width='27'
                        height='27'
                        x='.5'
                        y='.5'
                        fill='#FFEFFB'
                        rx='13.5'
                      />
                      <rect
                        width='27'
                        height='27'
                        x='.5'
                        y='.5'
                        stroke='#FFC8E5'
                        rx='13.5'
                      />
                      <path
                        stroke='#AF0C70'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='1.5'
                        d='M19.33 10 12 17.33 8.67 14'
                      />
                    </svg>
                    Your request has been sent!
                  </div>
                ) : (
                  label
                )}

                <Dialog.Close asChild>
                  <button
                    type='button'
                    aria-label='Close'
                    className={s.popup_close}
                  >
                    <Close />
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Title>
            <Form
              button={label}
              handleClose={closePopup}
              onSuccess={() => setSubmitted(true)}
              className={s.popup_form}
            />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BtnPopup;
