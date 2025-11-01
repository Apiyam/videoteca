import { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useVideoElements } from 'hooks/useBusiness';
import LoadingInformation from './LoadingInformation';
import { CheckCircle, DeleteRounded, EditRounded, VideoCameraBack } from '@mui/icons-material';
import { VideoElement } from 'types/types';
import { Link, Sheet, Snackbar, Table } from '@mui/joy';  
import { convertToFormatMoney } from 'utils/Utils';
import ConfirmationDialog from './ConfirmationDialog';
import { deleteOne } from 'pages/api/supabase';


export default function MyVideos() {
  const { videoElements } = useVideoElements();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [videoElementToDelete, setVideoElementToDelete] = useState<VideoElement>();
  const [videoElementsToShow, setVideoElementsToShow] = useState<VideoElement[]>();

  useEffect(() => {
    if(videoElements){
      setVideoElementsToShow(videoElements);
    }
  }, [videoElements]);

  if(!videoElementsToShow){
    return <LoadingInformation title="Cargando..." description="Espera un momento mientras se cargan los videos..." />
  }





  const deleteVideoElement = async (id: number) => {
    await deleteOne('video_element', id);
    setOpenSnackbar(true);
    setMessageSnackbar('Video eliminado correctamente');
    setVideoElementsToShow(videoElementsToShow.filter((videoElement) => videoElement.id !== id));
    setOpenConfirmationDialog(false);
  }
  
  


  return (
  <Stack spacing={2}>

    <Card>
      <Box sx={{ mb: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}>
        <Stack>
          <Typography level="title-md">Listado de mis videos de Burlesqa</Typography>
          <Typography level="body-sm">Agrega, edita y elimina videos que ofrezcas.</Typography>
        </Stack>
        <Link href="/clientes/crear-curso">
        <Button sx={{ mt: { xs: 1, sm: 0 } }} color="success" startDecorator={<VideoCameraBack />} size="sm" variant="solid">
        Agregar video</Button>
        </Link>
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
      {videoElementsToShow.length > 0 ? (
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
              <th>Miniatura</th>
              <th>Nombre del video</th>
              <th>Descripción corta</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {videoElementsToShow.map((videoElement) => (
            <tr key={videoElement.id}>
              <td>
                <AspectRatio ratio="1" sx={{ width: 100 }}>
                  <img src={videoElement.thumbnail} alt="Burlesqa" />
                </AspectRatio>
              </td>
              <td>{videoElement.element_name}</td>
              <td>{videoElement.short_description}</td>
              <td>{convertToFormatMoney(videoElement.price)}</td>
              <td>
                <IconButton color="danger" variant="soft" onClick={() => {
                  setVideoElementToDelete(videoElement);
                  setOpenConfirmationDialog(true);
                }}>
                  <DeleteRounded />
                </IconButton>
              </td>
              </tr>
            ))}
            </tbody>
        </Table>
      
      ) : (
        <Typography level="body-md">No hay videos para mostrar, agrega uno para empezar.</Typography>
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
    <ConfirmationDialog
      open={openConfirmationDialog}
      onCancel={() => setOpenConfirmationDialog(false)}
      onConfirm={() => {
        if(videoElementToDelete && videoElementToDelete.id){
          deleteVideoElement(videoElementToDelete.id);
        }
      }}
      title="¿Estás seguro de querer eliminar este video?"
      description="Esta acción no se puede deshacer."
    />
  </Stack>
  );
}