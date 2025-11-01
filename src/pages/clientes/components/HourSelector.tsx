import { useEffect, useState } from 'react';
import {
  Card, Box, Typography, Divider, Stack,
  CardOverflow, CardActions, Button, Input, 
  Checkbox
} from '@mui/joy';
import { IHour } from 'types/types';
import { useBusiness } from 'hooks/useBusiness';

interface TimeSlotProps {
    hour: IHour;
    index: number;
    handleChange: (index: number, field: keyof IHour, value: string | boolean) => void;
}

const TimeSlot = ({hour, index, handleChange}: TimeSlotProps) =>{
    return (
        <Stack key={index} direction="row" spacing={1} alignItems="center" p={0} mt={0}>
            <Checkbox
              checked={hour.isOpen}
              onChange={(e) => handleChange(index, 'isOpen', e.target.checked)}
            />
            <Typography level="body-sm" sx={{ width: 80 }}>{hour.day}</Typography>
            {hour.isOpen ? (
              <>
                <Input
                  type="time"
                  value={hour.start || ''}
                  sx={{minHeight: 20}}
                  onChange={(e) => handleChange(index, 'start', e.target.value)}
                />
                <Input
                  type="time"
                  value={hour.end || ''}
                  sx={{minHeight: 20}}
                  onChange={(e) => handleChange(index, 'end', e.target.value)}
                />
              </>
            ) : (
              <Typography level="body-sm" sx={{ width: 150 }}>Cerrado</Typography>
            )}
          </Stack>
    );
}


function HourSelector() {
  const { businessHours, updateBusinessHours, defaultHours } = useBusiness();
  const [isSaving, setIsSaving] = useState(false);
  const [hours, setHours] = useState<IHour[]>(defaultHours);
  useEffect(() => {
    if(businessHours){
      setHours(businessHours.hours);
    }
  }, [businessHours]);

  const handleChange = (index: number, field: keyof IHour, value: string | boolean) => {
    const updated = [...hours];
    updated[index][field] = value as never;
    setHours(updated);
  };

  const updateBusinessHoursData = async () => {
    setIsSaving(true);
    if(businessHours){
      await updateBusinessHours({...businessHours, hours});
      setIsSaving(false);
    }
  }
  return (
    <Card>
      <Box sx={{ mb: 1 }}>
        <Typography level="title-md">Horarios</Typography>
        <Typography level="body-sm">Agrega tus horarios de atención. Si el día no está disponible, cierra el horario.</Typography>
      </Box>
      <Divider />
      <Stack spacing={2} sx={{ my: 1 }}>
        {hours.map((hour, index) => (
          <TimeSlot key={index} hour={hour} index={index} handleChange={handleChange} />
        ))}
      </Stack>
      <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
          <Button size="sm" variant="solid" onClick={updateBusinessHoursData} disabled={isSaving}>
            {isSaving ? 'Guardando cambios...' : 'Guardar cambios'}
          </Button>
        </CardActions>
      </CardOverflow>
    </Card>
  );
}

export default HourSelector;