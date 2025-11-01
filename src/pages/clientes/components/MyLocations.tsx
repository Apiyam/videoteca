import { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useBusiness } from 'hooks/useBusiness';
import LoadingInformation from './LoadingInformation';
import { AddBusinessRounded, AddCard, BusinessCenter, ChatBubble, CheckCircle, DeleteRounded, EditRounded, Facebook, Instagram, LinkedIn, OpenInBrowserOutlined, Person2, WhatsApp, YouTube } from '@mui/icons-material';
import { ICompany, IService } from 'types/interfaces';
import { ILocation, ISocial } from 'types/types';
import Tiktok from 'components/commons/Tiktok';
import HourSelector from './HourSelector';
import { CircularProgress, Sheet, Snackbar, Table } from '@mui/joy';  
import ProductForm from './ProductForm';
import { convertToFormatMoney } from 'utils/Utils';
import ConfirmationDialog from './ConfirmationDialog';
import { deleteOne } from 'pages/api/supabase';
import LocationForm from './LocationForm';

export default function MyLocations() {
  const { business, locations } = useBusiness();
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [locationToEdit, setLocationToEdit] = useState<ILocation | null>(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<ILocation | null>(null);

  const [locationsBusiness, setLocationsBusiness] = useState<ILocation[]>([]);

  console.log(locations);

  useEffect(() => {
    if(locations){
      setLocationsBusiness(locations);
      setIsLoading(false);
    }
  }, [locations]);

  if(isLoading){
    return <LoadingInformation title="Cargando..." description="Espera un momento mientras se cargan las ubicaciones..." />
  }

  if(!locations){
    return <LoadingInformation />
  }


  const confirmDelete = (location: ILocation) => {
    setLocationToDelete(location);
    setOpenConfirmationDialog(true);
  }

  const deleteLocation = async (id: number) => {
    await deleteOne('location', id);
    setOpenSnackbar(true);
    setMessageSnackbar('Ubicación eliminada correctamente');
    setLocationsBusiness(locationsBusiness.filter((location) => location.id !== id));
    setOpenConfirmationDialog(false);
  }
  
  


  return (
  <Stack spacing={2}>

    <Card>
      <Box sx={{ mb: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}>
        <Stack>
          <Typography level="title-md">Listado de mis ubicaciones</Typography>
          <Typography level="body-sm">Agrega, edita y elimina ubicaciones de tu negocio.</Typography>
        </Stack>
        <Button sx={{ mt: { xs: 1, sm: 0 } }} color="success" startDecorator={<AddBusinessRounded />} size="sm" variant="solid" onClick={() => setOpenModal(true)}>Agregar ubicación</Button>
      </Box>
      <Divider />
      <Stack spacing={2} sx={{ my: 1 }}>
        
      <Sheet
      sx={{
        overflow: 'auto',
        width: '100%',
        maxWidth: '100%',
        borderRadius: 'md',
        maxHeight: '80vh',
      }}
    >
      {locationsBusiness.length > 0 ? (
      <Table
        stickyHeader
        variant="outlined"
        stripe="even"
        sx={{
          minWidth: 800,
        }}
      >
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Página web</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {locationsBusiness?.map((location) => (
              <tr key={location.id}>
                <td>{location.name}</td>
                <td>{location.street}</td>
                <td>{location.phone}</td>
                <td>{location.email}</td>
                <td>{location.website}</td>
                <td>
                <IconButton sx={{ mr: 1 }} color="success" variant="soft" onClick={() => {setLocationToEdit(location); setOpenModal(true)}}>
                  <EditRounded />
                </IconButton>
                
                <IconButton color="danger" variant="soft" onClick={() => confirmDelete(location)}>
                  <DeleteRounded />
                </IconButton>
              </td>
            </tr>
            ))}
          </tbody>
        </Table>
      
      ) : (
        <Typography level="body-md">No hay ubicaciones para mostrar, agrega una para empezar.</Typography>
      )}
      </Sheet>
        </Stack>
    </Card>
    
    {/* Snackbar */}
    <Snackbar
      open={openSnackbar}
      onClose={() => setOpenSnackbar(false)}
      autoHideDuration={2000}
      color="success"
      size="sm"
      variant="solid"
      startDecorator={<CheckCircle />}
    >
      {messageSnackbar}
    </Snackbar>
    <LocationForm 
      location={locationToEdit} 
      open={openModal} 
      onClose={() => setOpenModal(false)} 
      onSave={(data, isNew) => {
        if(data){
          setOpenSnackbar(true);
          setMessageSnackbar('Ubicación agregada correctamente');
          if(isNew){
            setLocationsBusiness([...locationsBusiness, data]);
          }else{
            setLocationsBusiness(locationsBusiness.map((location) => location.id === data.id ? data : location));
          }
        }
      }}
    />
    <ConfirmationDialog
      open={openConfirmationDialog}
      onCancel={() => setOpenConfirmationDialog(false)}
      onConfirm={() => {
        if(locationToDelete){
          deleteLocation(locationToDelete.id);
        }
      }}
      title="¿Estás seguro de querer eliminar esta ubicación?"
      description="Esta acción no se puede deshacer."
    />
  </Stack>
  );
}