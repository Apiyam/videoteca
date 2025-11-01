import { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useCourses, useVideoElements } from 'hooks/useBusiness';
import LoadingInformation from './LoadingInformation';
import { CheckCircle, DeleteRounded, EditRounded, VideoCameraBack } from '@mui/icons-material';
import { DEFAULT_VIDEO_COURSE, VideoCourse, VideoElement } from 'types/types';
import { Link, Sheet, Snackbar, Table } from '@mui/joy';  
import { convertToFormatMoney } from 'utils/Utils';
import ConfirmationDialog from './ConfirmationDialog';
import { deleteOne } from 'pages/api/supabase';
import ProductForm from './ProductForm';


export default function MyCourses() {
  const { courses } = useCourses();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<VideoCourse>();
  const [coursesToShow, setCoursesToShow] = useState<VideoCourse[]>();
  const [courseToEdit, setCourseToEdit] = useState<VideoCourse>();
  useEffect(() => {
    if(courses){
      setCoursesToShow(courses);
    }
  }, [courses]);

  if(!coursesToShow){
    return <LoadingInformation title="Cargando..." description="Espera un momento mientras se cargan los cursos..." />
  }





  const deleteCourse = async (id: number) => {
    await deleteOne('video_course', id);
    setOpenSnackbar(true);
    setMessageSnackbar('Curso eliminado correctamente');
    setCoursesToShow(coursesToShow.filter((course) => course.id !== id));
    setOpenConfirmationDialog(false);
  }
  
  


  return (
  <Stack spacing={2}>

    <Card>
      <Box sx={{ mb: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}>
        <Stack>
          <Typography level="title-md">Listado de mis cursos de Burlesqa</Typography>
          <Typography level="body-sm">Agrega, edita y elimina cursos que ofrezcas.</Typography>
        </Stack>
        <Button
        onClick={() => setCourseToEdit(DEFAULT_VIDEO_COURSE)}
        sx={{ mt: { xs: 1, sm: 0 } }} color="success" startDecorator={<VideoCameraBack />} size="sm" variant="solid">
        Agregar curso</Button>
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
      {coursesToShow.length > 0 ? (
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
              <th>Nombre del curso</th>
              <th>Descripción</th>
              <th>Videos</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {coursesToShow.map((course) => (
            <tr key={course.id}>
              <td>
                <AspectRatio ratio="1" sx={{ width: 100 }}>
                  <img src={course.thumbnail} alt="Burlesqa" />
                </AspectRatio>
              </td>
              <td>{course.course_name}</td>
              <td>{course.short_description}</td>
              <td>{course.videos.length}</td>
              <td>{convertToFormatMoney(course.price)}</td>
              <td>
                <IconButton color="primary" variant="soft" onClick={() => {
                  setCourseToEdit(course);
                }}>
                  <EditRounded />
                </IconButton> 
                <IconButton color="danger" variant="soft" onClick={() => {
                  setCourseToDelete(course);
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
        <Typography level="body-md">No hay cursos para mostrar, agrega uno para empezar.</Typography>
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
        if(courseToDelete && courseToDelete.id){
          deleteCourse(courseToDelete.id);
        }
      }}
      title="¿Estás seguro de querer eliminar este curso?"
      description="Esta acción no se puede deshacer."
    />
    {
      courseToEdit && (
        <ProductForm
        product={courseToEdit}
        open={Boolean(courseToEdit)}
        onClose={() => setCourseToEdit(undefined)}
        onSave={(course: VideoCourse | null, isNew: boolean) => {
          if(course){
            setCourseToEdit(course);
          }
        }}
      />
      )
    }
  </Stack>
  );
}