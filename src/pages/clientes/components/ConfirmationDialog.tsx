import * as React from 'react';
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Button,
  Stack,
} from '@mui/joy';

type ConfirmationDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationDialog({
  open,
  title = '¿Estás seguro?',
  description = 'Esta acción no se puede deshacer.',
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} sx={{ zIndex: 999999, overflow: 'visible' }}>
      <ModalDialog>
        <ModalClose />
        <Typography level="h4">{title}</Typography>
        <Typography level="body-md" sx={{ mt: 1, mb: 2 }}>
          {description}
        </Typography>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button variant="plain" color="neutral" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="solid" color="danger" onClick={onConfirm}>
            Confirmar
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}