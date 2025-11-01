import { useState } from 'react';
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

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { ChatBubble, CheckCircle, Error, InfoSharp, PriceChangeOutlined, UploadFileRounded, VideoFileOutlined } from '@mui/icons-material';
import { DEFAULT_VIDEO_ELEMENT, VideoElement } from 'types/types';
import { CircularProgress, Option, Select, Snackbar } from '@mui/joy';
import Dropzone from 'react-dropzone';
import { uploadFile } from 'pages/api/fileServer';
import { createVideoElement } from 'pages/api/entities';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useCourses } from 'hooks/useBusiness';

const PLANS = [
  { id: 1, name: 'Diva desde Cero', price: 100 },
  { id: 2, name: 'Aprovecha tu sensualidad', price: 100 },
  { id: 3, name: 'Curves on fire (avanzando)', price: 100 },
];

type VideoElementFormProps = {
  videoElement?: VideoElement;
};

export default function VideoElementForm({ videoElement }: VideoElementFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { courses } = useCourses();
  const [maxChars, setMaxChars] = useState(500);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { user } = useUser();
  const router = useRouter();
  const [videoElementData, setVideoElementData] = useState<VideoElement>(
    videoElement || DEFAULT_VIDEO_ELEMENT
  );

  // Manejo de inputs de texto
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoElementData({
      ...videoElementData,
      [event.target.name]: event.target.value,
    });
  };

  // Manejo de textarea (con límite de 500 chars)
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    const updatedDescription = value.slice(0, 500);
    setVideoElementData({ ...videoElementData, description: updatedDescription });
    setMaxChars(500 - updatedDescription.length);
  };

  // Cambio de tipo de elemento
  const handleTypeChange = (event: React.SyntheticEvent | null, newValue: number | null) => {
    setVideoElementData({ ...videoElementData, element_type: newValue || 1 });
  };

  // Cambio de plan
  const handlePlanChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
    setVideoElementData({ ...videoElementData, plans: newValue || '' });
  };

  const uploadThumbnail = async (file: File) => {
    const data = await uploadFile(file, 'thumbnail', 'thumbnail');
    setVideoElementData({ ...videoElementData, thumbnail: data.url });
  }

  const uploadVideo = async (file: File) => {
    const data = await uploadFile(file, 'video'+Math.random().toString(36).substring(2, 15), 'video');
    return data.url;
  }

  const saveChanges = async () => {
    setIsSaving(true);
    if(file){
      const urlVideo = await uploadVideo(file);
      if(urlVideo){
        const videoElementDataToSave = {
          ...videoElementData,
          video_url: urlVideo,
          user: user?.id || '',
        }
        const data = await createVideoElement(videoElementDataToSave);
        if(data){
          setOpenSnackbar(true);
          setMessageSnackbar('Elemento creado correctamente');
          if(videoElementData.element_type === 1){
            router.push('/clientes/mis-videos');
          }else{
            router.push('/clientes/mis-cursos');
          }
        }
      }else{
        setOpenSnackbarError(true);
        setMessageSnackbar('No se ha subido ningún video');
      }
    }else{
      setOpenSnackbarError(true);
      setMessageSnackbar('No se ha subido ningún video');
    }
    setIsSaving(false);
  }

  return (
    <Stack spacing={2}>
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">Datos del elemento de videoteca</Typography>
          <Typography level="body-sm">
            Configura los datos del elemento.
          </Typography>
        </Box>
        <Divider />

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ my: 1 }}>
          {/* Miniatura */}
          <Box sx={{ position: 'relative', alignSelf: 'center' }}>
            <Typography level="title-md">Miniatura del elemento</Typography>
            <AspectRatio ratio="1" sx={{ width: 120, mx: 'auto', mt: 1 }}>
              {isUploading ? (
                <CircularProgress />
              ) : (
                <img src={videoElementData.thumbnail} loading="lazy" alt="Logo" />
              )}
            </AspectRatio>
            <IconButton
              aria-label="Subir la miniatura del elemento"
              size="sm"
              variant="outlined"
              color="neutral"
              disabled={isUploading}
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                transform: 'translate(50%, 50%)',
                zIndex: 2,
                borderRadius: '50%',
                boxShadow: 'sm',
                bgcolor: 'background.body',
              }}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = () => {
                  const file = input.files?.[0];
                  if (file) {
                    uploadThumbnail(file);
                    setOpenSnackbar(true);
                    setMessageSnackbar('Miniatura subida correctamente');
                  }
                };
                input.click();
              }}
            >
              <EditRoundedIcon />
            </IconButton>
          </Box>

          {/* Formulario */}
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Nombre del elemento</FormLabel>
                <Input
                  name="element_name"
                  startDecorator={<VideoFileOutlined />}
                  size="sm"
                  value={videoElementData.element_name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Descripción corta</FormLabel>
                <Input
                  name="short_description"
                  size="sm"
                  startDecorator={<ChatBubble />}
                  placeholder="Descripción corta"
                  value={videoElementData.short_description}
                  onChange={handleChange}
                />
              </FormControl>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel>Tipo de elemento</FormLabel>
                <Select
                  size="sm"
                  startDecorator={<InfoSharp />}
                  value={videoElementData.element_type}
                  onChange={handleTypeChange}
                >
                  <Option value={1}>Video suelto</Option>
                  <Option value={2}>Elemento de un curso</Option>
                </Select>
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                {videoElementData.element_type === 2 ? (
                  <>
                    <FormLabel>Seleccione el plan/curso</FormLabel>
                    <Select
                      size="sm"
                      startDecorator={<InfoSharp />}
                      value={videoElementData.plans || ''}
                      onChange={handlePlanChange}
                    >
                      {courses?.map((course) => (
                        <Option key={course.id} value={course.id}>
                          {course.course_name}
                        </Option>
                      ))}
                    </Select>
                  </>
                ) : (
                  <>
                    <FormLabel>Precio del video</FormLabel>
                    <Input
                      name="price"
                      type="number"
                      startDecorator={<PriceChangeOutlined />}
                      size="sm"
                      value={videoElementData.price}
                      onChange={handleChange}
                    />
                  </>
                )}
              </FormControl>
            </Stack>
          </Stack>
        </Stack>

        {/* Descripción + Upload */}
        <Stack spacing={2} sx={{ my: 1 }} direction={{ xs: 'column', sm: 'row' }}>
          <Box sx={{ flex: 1 }}>
            <Typography level="title-md">Descripción del elemento</Typography>
            <Textarea
              size="sm"
              minRows={4}
              value={videoElementData.description}
              onChange={handleDescriptionChange}
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
              {maxChars} caracteres restantes
            </FormHelperText>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography level="title-md">Subir video</Typography>
            <Dropzone onDrop={(acceptedFiles) => {
              setFile(acceptedFiles[0]);
            }}>
              {({ getRootProps, getInputProps, open }) => (
                <Box
                  {...getRootProps()}
                  sx={{
                    border: '1px dashed',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 4,
                    cursor: 'pointer',
                  }}
                >
                  {file && (
                    <Box>
                      <Typography level="title-md">Archivo seleccionado: {file.name}</Typography>
                      <Typography level="body-sm">Tamaño: {(file.size/1024/1024).toFixed(2)} MB</Typography>
                      <hr />
                    </Box>
                  )}
                  <Button size="sm" variant="outlined">
                    <UploadFileRounded />
                    Arrastra y suelta el video aquí o haz click para buscarlo
                  </Button>
                  <input {...getInputProps()} />
                </Box>
              )}
            </Dropzone>
          </Box>
        </Stack>

        {/* Footer */}
        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="sm" variant="solid" onClick={saveChanges} disabled={isSaving}>
              {isSaving ? 'Guardando cambios...' : 'Guardar cambios'}
            </Button>
          </CardActions>
        </CardOverflow>
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
      <Snackbar
        open={openSnackbarError}
        onClose={() => setOpenSnackbarError(false)}
        autoHideDuration={2000}
        color="danger"
        size="sm"
        variant="solid"
        startDecorator={<Error />}
      >
        {messageSnackbar}
      </Snackbar>
    </Stack>
  );
}