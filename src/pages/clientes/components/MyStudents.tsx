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
import { AddBusinessRounded, AddCard, BusinessCenter, ChatBubble, CheckCircle, DeleteRounded, EditRounded, Facebook, Instagram, LinkedIn, OpenInBrowserOutlined, Person2, VideoCameraBack, WhatsApp, YouTube } from '@mui/icons-material';
import { ICompany, IService } from 'types/interfaces';
import { ISocial } from 'types/types';
import Tiktok from 'components/commons/Tiktok';
import HourSelector from './HourSelector';
import { CircularProgress, Sheet, Snackbar, Table } from '@mui/joy';  
import ProductForm from './ProductForm';
import { convertToFormatMoney } from 'utils/Utils';
import ConfirmationDialog from './ConfirmationDialog';
import { deleteOne } from 'pages/api/supabase';

export default function MyStudents() {
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<IService | null>(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<IService | null>(null);

  const [services, setServices] = useState<IService[]>();

  console.log(services);


  if(isLoading){
    return <LoadingInformation title="Cargando..." description="Espera un momento mientras se cargan los videos..." />
  }

 


  const confirmDelete = (service: IService) => {
    setServiceToDelete(service);
    setOpenConfirmationDialog(true);
  }

  const deleteService = async (id: number) => {
    await deleteOne('service', id);
    setOpenSnackbar(true);
    setMessageSnackbar('Producto o servicio eliminado correctamente');
    setOpenConfirmationDialog(false);
  }
  
  


  return (
  <Stack spacing={2}>

    <Card>
      <Box sx={{ mb: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}>
        <Stack>
          <Typography level="title-md">Listado de mis alumnas y clientes</Typography>
          <Typography level="body-sm">Información de tus alumnas y clientes de la plataforma.</Typography>
        </Stack>
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
              <th>Email</th>
              <th>Teléfono</th>
              <th>Fecha de registro</th>
              <th>Cursos comprados</th>
              <th>Videos comprados</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Stepfi Polestar</td>
              <td>stepfi@gmail.com</td>
              <td>1234567890</td>
              <td>2021-01-01</td>
              <td>1 (Curso de burlesqa)</td>
              <td>1 (Video de burlesqa)</td>
              <td>
                <IconButton sx={{ mr: 1 }} color="success" variant="soft" onClick={() => {}}>
                  <EditRounded />
                </IconButton>
                
                <IconButton color="danger" variant="soft" onClick={() => {}}>
                  <DeleteRounded />
                </IconButton>
              </td>
              </tr>
          </tbody>
        </Table>
      
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
   
    <ConfirmationDialog
      open={openConfirmationDialog}
      onCancel={() => setOpenConfirmationDialog(false)}
      onConfirm={() => {
        if(serviceToDelete){
          deleteService(serviceToDelete.id);
        }
      }}
      title="¿Estás seguro de querer eliminar este curso?"
      description="Esta acción no se puede deshacer."
    />
  </Stack>
  );
}