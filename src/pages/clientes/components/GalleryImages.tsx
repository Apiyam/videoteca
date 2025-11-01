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
import { AddBusinessRounded, AddCard, AddPhotoAlternateTwoTone, BusinessCenter, ChatBubble, CheckCircle, DeleteRounded, EditRounded, Facebook, Instagram, LinkedIn, OpenInBrowserOutlined, Person2, WhatsApp, YouTube } from '@mui/icons-material';
import { ICompany, IImage, IService } from 'types/interfaces';
import { ISocial } from 'types/types';
import Tiktok from 'components/commons/Tiktok';
import HourSelector from './HourSelector';
import { CircularProgress, Sheet, Snackbar, Table } from '@mui/joy';  
import ProductForm from './ProductForm';
import { convertToFormatMoney } from 'utils/Utils';
import ImageForm from './ImageForm';
import { ImageList, ImageListItem } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';
import { deleteOne } from 'pages/api/supabase';

export default function GalleryImages() {
  const { business, images: imagesBusiness, fetchImages } = useBusiness();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<IImage | null>(null);

  const [images, setImages] = useState<IImage[]>();

  console.log(images);

  useEffect(() => {
    if(imagesBusiness){
      setImages(imagesBusiness);
    }
  }, [imagesBusiness]);

  useEffect(() => {
    fetchImages();
  }, []);

  if(!images){
    return <LoadingInformation title="Cargando..." description="Espera un momento mientras se cargan las imágenes..." />
  }

  const confirmDelete = (image: IImage) => {
    setImageToDelete(image);
    setOpenConfirmationDialog(true);
  }

  const deleteImage = async (id: number) => {
    await deleteOne('slide', id);
    setOpenConfirmationDialog(false);
    setOpenSnackbar(true);
    setMessageSnackbar('Imagen eliminada correctamente');
    fetchImages();
  }
  return (
  <Stack spacing={2}>
    <Card>
      <Box sx={{ mb: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}>
        <Stack>
          <Typography level="title-md">Listado de mis imágenes</Typography>
          <Typography level="body-sm">Agrega, edita y elimina imágenes que quieras compartir.</Typography>
        </Stack>
        <Button sx={{ mt: { xs: 1, sm: 0 } }} color="success" startDecorator={<AddPhotoAlternateTwoTone />} size="sm" variant="solid" onClick={() => setOpenModal(true)}>Agregar imágenes</Button>
      </Box>
      <Divider />
      <Stack spacing={2} sx={{ my: 1 }}>
        
      <Sheet
      variant="outlined"
      sx={{
        overflow: 'auto',
        width: '100%',
        maxWidth: '100%',
        borderRadius: 'md',
        maxHeight: '80vh',
      }}
    >
      <ImageList variant="standard" cols={8}>
        {images.map((image) => (
          <ImageListItem key={image.id}>
            <img src={image.image_url} alt={image.image_url} />
            <IconButton color="danger" variant="soft" onClick={() => confirmDelete(image)} >
            <DeleteRounded />
              Eliminar
            </IconButton>
          </ImageListItem>
        ))}
      </ImageList>
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
    <ImageForm 
      open={openModal} 
      onClose={() => setOpenModal(false)} 
      onSave={() => {
          setOpenSnackbar(true);
          setMessageSnackbar('Imágenes agregadas correctamente');
          fetchImages();
      }}
    />
    <ConfirmationDialog
      open={openConfirmationDialog}
      onCancel={() => setOpenConfirmationDialog(false)}
      onConfirm={() => {
        if(imageToDelete && imageToDelete.id){
          deleteImage(imageToDelete.id);
        }
      }}
      title="¿Estás seguro de querer eliminar esta imagen?"
      description="Esta acción no se puede deshacer."
    />
  </Stack>
  );
}