import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import AspectRatio from '@mui/joy/AspectRatio';
import FormControl, { FormControlProps } from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { Star } from '@mui/icons-material';

export default function StatesSelectorWidget(props: FormControlProps) {
  const { sx, ...other } = props;
  return (
    <FormControl {...other} sx={sx}>
      <FormLabel>Estado de destino</FormLabel>
      <Autocomplete
        autoHighlight
        isOptionEqualToValue={(option, value) => option.code === value.code}
        defaultValue={states[0] as any}
        options={states}
        renderOption={(optionProps, option) => (
          <AutocompleteOption {...optionProps}>
            <ListItemDecorator>
              <AspectRatio ratio="1" sx={{ minWidth: 20, borderRadius: '50%' }}>
                <Star />
              </AspectRatio>
            </ListItemDecorator>
            {option.label}
          </AutocompleteOption>
        )}
        slotProps={{
          input: {
            autoComplete: 'off', // disable autocomplete and autofill
          },
        }}
      />
    </FormControl>
  );
}

interface StateType {
  code: string;
  label: string;
}

const states: readonly StateType[] = [
  { code: 'AGS', label: 'Aguascalientes' },
  { code: 'BC', label: 'Baja California' },
  { code: 'BCS', label: 'Baja California Sur' },
  { code: 'CAMP', label: 'Campeche' },
  { code: 'CHIS', label: 'Chiapas' },
  { code: 'CHIH', label: 'Chihuahua' },
  { code: 'CDMX', label: 'Ciudad de México' },
  { code: 'COAH', label: 'Coahuila' },
  { code: 'COL', label: 'Colima' },
  { code: 'DGO', label: 'Durango' },
  { code: 'GTO', label: 'Guanajuato' },
  { code: 'GRO', label: 'Guerrero' },
  { code: 'HGO', label: 'Hidalgo' },
  { code: 'JAL', label: 'Jalisco' },
  { code: 'MEX', label: 'Estado de México' },
  { code: 'MICH', label: 'Michoacán' },
  { code: 'MOR', label: 'Morelos' },
  { code: 'NAY', label: 'Nayarit' },
  { code: 'NL', label: 'Nuevo León' },
  { code: 'OAX', label: 'Oaxaca' },
  { code: 'PUE', label: 'Puebla' },
  { code: 'QRO', label: 'Querétaro' },
  { code: 'QROO', label: 'Quintana Roo' },
  { code: 'SLP', label: 'San Luis Potosí' },
  { code: 'SIN', label: 'Sinaloa' },
  { code: 'SON', label: 'Sonora' },
  { code: 'TAB', label: 'Tabasco' },
  { code: 'TAMPS', label: 'Tamaulipas' },
  { code: 'TLAX', label: 'Tlaxcala' },
  { code: 'VER', label: 'Veracruz' },
  { code: 'YUC', label: 'Yucatán' },
  { code: 'ZAC', label: 'Zacatecas' }
];
