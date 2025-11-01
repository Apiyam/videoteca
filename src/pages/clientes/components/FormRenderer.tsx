import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Checkbox,
    Typography,
    Snackbar,
    Stack
  } from '@mui/joy';
  import { useState } from 'react';
  import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
  
  export default function FormRenderer({ fields }: { fields: any[] }) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const values = Object.fromEntries(formData.entries());
      console.log("📨 Datos enviados:", values);
      setOpenSnackbar(true);
    };
  
    return (
      <Box>
        <Typography level="title-lg" mb={2}>🧪 Vista previa del formulario</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {fields.map((field, index) => (
              <FormControl key={index}>
                <FormLabel>{field.label}</FormLabel>
                {field.type === "textarea" ? (
                  <Textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    size="sm"
                  />
                ) : field.type === "checkbox" ? (
                  <Checkbox
                    name={field.name}
                    label={field.label}
                    required={field.required}
                  />
                ) : (
                  <Input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    size="sm"
                  />
                )}
              </FormControl>
            ))}
            <Button type="submit" variant="solid">Enviar</Button>
          </Stack>
        </Box>
  
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          color="success"
          startDecorator={<CheckCircleRoundedIcon />}
        >
          Formulario enviado correctamente
        </Snackbar>
      </Box>
    );
  }