import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import ModalClose from '@mui/joy/ModalClose';
import Stack from '@mui/joy/Stack';
import Slider, { sliderClasses } from '@mui/joy/Slider';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import StatesSelector from '../../../components/widgets/StatesSelectorWidget';
import OrderSelector from './OrderSelector';
import Typography from '@mui/joy/Typography';

function valueText(value: number) {
  return `$${value.toLocaleString('en-US')}`;
}

export default function Filters() {
  const [open, setOpen] = React.useState(false);
  return (
    <Stack
      useFlexGap
      direction="row"
      spacing={{ xs: 0, sm: 2 }}
      sx={{ justifyContent: { xs: 'space-between' }, flexWrap: 'wrap', minWidth: 0 }}
    >
      <div></div>
      {
        /*
        <Button
        variant="outlined"
        color="neutral"
        startDecorator={<FilterAltOutlined />}
        onClick={() => setOpen(true)}
      >
        Filtros
      </Button>
        */
      }
      <OrderSelector  />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Stack useFlexGap spacing={3} sx={{ p: 2 }}>
        <br /><br />
          <DialogTitle>Filtros de viajes</DialogTitle>
          <Typography level="body-md">Establece los filtros de acuerdo a tus preferencias</Typography>
          <ModalClose />
          <StatesSelector />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gridTemplateRows: 'auto auto',
              gap: 1,
            }}
          >
            <FormLabel htmlFor="filters-start-date">Fecha de inicio</FormLabel>
            <div />
            <FormLabel htmlFor="filters-end-date">Fecha de fin</FormLabel>

            <Input
              id="filters-start-date"
              type="date"
              placeholder="Jan 6 - Jan 13"
              aria-label="Date"
            />
            <Box sx={{ alignSelf: 'center' }}>-</Box>
            <Input
              id="filters-end-date"
              type="date"
              placeholder="Jan 6 - Jan 13"
              aria-label="Date"
            />
          </Box>
          <FormControl>
            <FormLabel>Precio por persona</FormLabel>
            <Slider
              defaultValue={[0, 1000]}
              step={100}
              min={0}
              max={2000}
              getAriaValueText={valueText}
              valueLabelDisplay="auto"
              valueLabelFormat={valueText}
              marks={[
                { value: 0, label: '$0' },
                  { value: 400, label: '$400' },
                  { value: 800, label: '$800' },
                  { value: 1200, label: '$1,200' },
                  { value: 1600, label: '$1,600' },
                  { value: 2000, label: '+$2,000' },
              ]}
              sx={{
                [`& .${sliderClasses.markLabel}[data-index="0"]`]: {
                  transform: 'none',
                },
                [`& .${sliderClasses.markLabel}[data-index="2"]`]: {
                  transform: 'translateX(-100%)',
                },
              }}
            />
          </FormControl>
        </Stack>
      </Drawer>
    </Stack>
  );
}
