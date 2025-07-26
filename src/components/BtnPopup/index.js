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

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {variant ? (
          <Button
            variant={variant}
            size={size}
            onClick={handleClose}
            className={className}
          >
            {label}
          </Button>
        ) : (
          <button onClick={handleClose} className={className}>
            {label}
          </button>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay}>
          <Dialog.Content aria-describedby={undefined} className={s.popup}>
            <Dialog.Title asChild>
              <div className={clsx('h4', s.popup_title)}>
                {label}

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
              handleClose={() => setOpen(false)}
              className={s.popup_form}
            />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BtnPopup;
