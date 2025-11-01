import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormLabel,
    Input,
    Select,
    Option,
    Checkbox,
    Stack,
    Typography,
    IconButton
  } from '@mui/joy';
  import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
  import { useState } from 'react';
  
  const fieldTypes = [
    {
        label: "Calificación (1-5)",
        value: "rating"
    },
    {
        label: "Texto",
        value: "text"
    },
    {
        label: "Correo",
        value: "email"
    },
    {
        label: "Teléfono",
        value: "phone"
    },
    {
        label: "Fecha",
        value: "date"
    },
    {
        label: "Selección",
        value: "checkbox"
    }
  ];
  
  export default function FormBuilder({ onChange }: { onChange: (fields: any[]) => void }) {
    const [fields, setFields] = useState<any[]>([]);
  
    const addField = () => {
      const newField = {
        type: "text",
        label: "",
        name: `field_${fields.length}`,
      };
      const updated = [...fields, newField];
      setFields(updated);
      onChange(updated);
    };
  
    const updateField = (index: number, key: string, value: any) => {
      const updated = [...fields];
      updated[index][key] = value;
      setFields(updated);
      onChange(updated);
    };
  
    const removeField = (index: number) => {
      const updated = fields.filter((_, i) => i !== index);
      setFields(updated);
      onChange(updated);
    };
  
    return (
      <Box>
        <Typography level="title-md" mb={2}>🛠️ Constructor de Formulario</Typography>
        <Stack spacing={2}>
          {fields.map((field, index) => (
            <Card key={index} variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>Tipo</FormLabel>
                      <Select
                        value={field.type}
                        onChange={(_, value) => updateField(index, "type", value)}
                        sx={{ minWidth: '170px' }}
                      >
                        {fieldTypes.map((type) => (
                          <Option key={type.value} value={type.value}>{type.label}</Option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Descripción/Pregunta/Etiqueta</FormLabel>
                      <Input
                        value={field.label}
                        onChange={(e) => updateField(index, "label", e.target.value)}
                        sx={{ minWidth: '400px' }}
                      />
                    </FormControl>
                    <FormControl sx={{ display: 'none' }}>
                      <FormLabel>Nombre</FormLabel>
                      <Input
                        type="hidden"
                        value={field.name}
                        onChange={(e) => updateField(index, "name", e.target.value)}
                      />
                    </FormControl>
                    <IconButton color="danger" onClick={() => removeField(index)} variant="soft">
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
          <Button variant="soft" onClick={addField}>➕ Añadir campo</Button>
        </Stack>
      </Box>
    );
  }