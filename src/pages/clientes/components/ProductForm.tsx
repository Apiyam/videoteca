import { useEffect, useState } from 'react';
import {
    Button,
    DialogTitle,
    DialogActions,
    Input,
    FormLabel,
    FormControl,
    Modal,
    ModalDialog,
    Box,
    CircularProgress,
    Stack,
    Textarea,
    IconButton,
    Typography,
    AspectRatio
} from '@mui/joy';
import { IService } from '../../../types/interfaces';
import { uploadFile } from 'pages/api/fileServer';
import { useBusiness } from 'hooks/useBusiness';
import { insertAndReturn, updateOne } from 'pages/api/supabase';
import LoadingInformation from './LoadingInformation';
import { ArrowUpward, ArrowDownward, Delete, EditRounded } from '@mui/icons-material';
import { DEFAULT_VIDEO_COURSE, VideoCourse } from 'types/types';


interface ProductFormProps {
    product: VideoCourse | null;
    open: boolean;
    onClose: () => void;
    onSave: (data: VideoCourse | null, isNew: boolean) => void;
}

export default function ProductForm({ product, open, onClose, onSave }: ProductFormProps) {
    const [productData, setProductData] = useState<VideoCourse>(DEFAULT_VIDEO_COURSE);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);


    useEffect(() => {
        if (product) {
            setProductData(product);
        } else {
            setProductData(DEFAULT_VIDEO_COURSE);
        }
    }, [product]);

    useEffect(() => {
        if (!open) {
            setProductData(DEFAULT_VIDEO_COURSE); // limpia cuando se cierra
        }
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData((prev: any) => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        if(!productData.id){
            const { id, videos, ...prodWithoutId } = productData;
            const data = await insertAndReturn('video_course', prodWithoutId);
            if (data) {
                onSave(data, true);
                setIsSaving(false);
            }
        }else{
            const data = await updateOne('video_course', productData.id || 0, productData);
            if (data) {
                onSave(data, false);
                setIsSaving(false);
            }
        }
        onClose();
    };

    // Mover video arriba/abajo
    const moveVideo = (index: number, direction: 'up' | 'down') => {
        const newVideos = [...productData.videos];
        if (direction === 'up' && index > 0) {
            [newVideos[index - 1], newVideos[index]] = [newVideos[index], newVideos[index - 1]];
        }
        if (direction === 'down' && index < newVideos.length - 1) {
            [newVideos[index + 1], newVideos[index]] = [newVideos[index], newVideos[index + 1]];
        }
        setProductData((prev: any) => ({ ...prev, videos: newVideos }));
    };

    const removeVideo = (index: number) => {
        const newVideos = productData.videos.filter((_: any, i: number) => i !== index);
        setProductData((prev: any) => ({ ...prev, videos: newVideos }));
    };

    const uploadThumbnail = async (file: File) => {
        const data = await uploadFile(file, 'thumbnail', 'thumbnail');
        setProductData({ ...productData, thumbnail: data.url });
      }

    return (
        <Modal open={open} onClose={onClose} sx={{ zIndex: 999999, overflow: 'visible' }}>
            <ModalDialog sx={{ width: { xs: '95%', sm: productData.videos.length > 0 ? 960 : 600 }, maxWidth: '100%' }}>
                <DialogTitle>{!productData.id  ? 'Agregar curso' : 'Editar curso'}</DialogTitle>

                <Stack direction="row" spacing={3}>
                    {/* Columna izquierda: formulario */}
                    <Stack direction="column" spacing={2} sx={{ width: productData.videos.length > 0 ? "60%" : "100%" }}>
                        {
                            isSaving ? (
                                <LoadingInformation title="Guardando..." description="Espera un momento mientras se guarda el curso..."  />
                            ) : (
                                <>
                                <Box sx={{ position: 'relative', alignSelf: 'center' }}>
            <Typography level="title-md">Miniatura del curso</Typography>
            <AspectRatio ratio="1" sx={{ width: 120, mx: 'auto', mt: 1 }}>
              {isUploading ? (
                <CircularProgress />
              ) : (
                <img src={productData.thumbnail} loading="lazy" alt="Logo" />
              )}
            </AspectRatio>
            <IconButton
              aria-label="Subir la miniatura del curso"
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
                  }
                };
                input.click();
              }}
            >
              <EditRounded />
            </IconButton>
          </Box>
                                    <FormControl>
                                        <FormLabel>Nombre del curso</FormLabel>
                                        <Input name="course_name" value={productData.course_name} onChange={handleChange} />
                                    </FormControl>
                                    <Stack direction="row" spacing={2} sx={{width: '100%'}}>
                                        <FormControl sx={{width: '100%'}}>
                                            <FormLabel>Descripción corta</FormLabel>
                                            <Input name="short_description" value={productData.short_description} onChange={handleChange} />
                                        </FormControl>
                                        <Box sx={{width: '100%'}}>
                                            <FormControl>
                                                <FormLabel>Precio</FormLabel>
                                                <Input
                                                    type="text"
                                                    name="price"
                                                    value={productData.price}
                                                    onChange={handleChange}
                                                    startDecorator="$"
                                                    placeholder="0.00"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Stack>
                                    <FormControl sx={{width: '100%'}}>
                                            <FormLabel>Descripción</FormLabel>
                                            <Textarea 
                                                minRows={3} 
                                                name="description" 
                                                value={productData.description} 
                                                onChange={(e) => setProductData({ ...productData, description: e.target.value })} 
                                            />
                                        </FormControl>
                                    
                                </>
                            )
                        }
                    </Stack>

                    {/* Columna derecha: videos con botones de ordenar */}
                    {
                        productData.videos.length > 0 && (
                            <Box sx={{ width: "40%", borderLeft: "1px solid #eee", pl: 2 }}>
                        <FormLabel>Orden de videos</FormLabel>
                        <Stack spacing={1} sx={{ mt: 1 }}>
                            {productData.videos.map((video: any, index: number) => (
                                <Box
                                    key={video.id}
                                    sx={{
                                        p: 1.5,
                                        borderRadius: "md",
                                        bgcolor: "neutral.softBg",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <span>{video.element_name}</span>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton size="sm" onClick={() => moveVideo(index, 'up')} disabled={index === 0}>
                                            <ArrowUpward fontSize="small" />
                                        </IconButton>
                                        <IconButton size="sm" onClick={() => moveVideo(index, 'down')} disabled={index === productData.videos.length - 1}>
                                            <ArrowDownward fontSize="small" />
                                        </IconButton>
                                        <IconButton size="sm" color="danger" onClick={() => removeVideo(index)}>
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                        )
                    }
                </Stack>

                <DialogActions>
                    <Button variant="outlined" color="danger" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSave} loading={isSaving}>Guardar</Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}