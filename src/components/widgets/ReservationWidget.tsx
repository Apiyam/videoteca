import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { BusAlert, BusAlertSharp, ChairSharp, Phone } from '@mui/icons-material';
import { Select, Option, Modal, ModalDialog, Alert } from '@mui/joy';
import SeatTripSelector from './SeatTripSelector';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { convertToFriendlyUrl } from 'utils/Utils';
import { useAppContext } from '../../AppContext';
import { AlertTitle } from '@mui/material';

export default function ReservationWidget({trip}: any) {
  const [url, setUrl] = useState('');
  //const { bookingData, setBookingData } = useAppContext();
  const [bookingData, setBookingData] = useState({ seats: 0, phone: '' });


  useEffect(() => {
    setUrl(`/${convertToFriendlyUrl("Saga tours")}/${convertToFriendlyUrl(trip.title)}/reservacion`);
  }, [trip]);

  const handleSeatsChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
    setBookingData({ ...bookingData, seats: parseInt(newValue || '0') });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({ ...bookingData, phone: e.target.value });
  };

  console.log(bookingData)

  return (
    <Card
      variant="soft"
      color="primary"
      sx={{
        maxHeight: 'max-content',
        width: '100%'
      }}
    >
      <Typography level="title-lg" startDecorator={<BusAlert />}>
        ¡Reserva tu viaje ya!
      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
        }}
      >
        <FormControl >
          <FormLabel>Número de asientos</FormLabel>
          <Select endDecorator={<ChairSharp />} onChange={handleSeatsChange} defaultValue={bookingData.seats+''} >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Teléfono de contacto</FormLabel>
          <Input endDecorator={<Phone />} onChange={(e) => handlePhoneChange(e)} defaultValue={bookingData.phone} />
        </FormControl>

        <CardActions sx={{ gridColumn: '1/-1' }}>

          {bookingData.seats > 0 && bookingData.phone!='' ? <Link href={url}>
              <Button  variant="solid" color="primary">
                <BusAlertSharp /> &nbsp;
                Continuar con la selección
            </Button>
          </Link> : <Alert variant="soft" color="warning">
            Selecciona al menos un asiento y un teléfono de contacto para reservar.
          </Alert>}
        </CardActions>
      </CardContent>
    </Card>
  );
}