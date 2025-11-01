import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Typography from '@mui/joy/Typography';

export default function Search() {
  return (
    <div>
      <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
        <FormControl sx={{ flex: 1 }}>
          <Input
            placeholder="Buscar viajes por destino"
            value={''}
            startDecorator={<SearchRoundedIcon />}
            aria-label="Buscar viajes por destino"
          />
        </FormControl>
        <Button variant="solid" color="primary">
          Buscar
        </Button>
      </Stack>
      <Typography level="body-sm">232 viajes disponibles</Typography>
    </div>
  );
}
