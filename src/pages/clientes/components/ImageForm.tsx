import { useEffect, useState } from 'react';
import {
    Button,
    DialogTitle,
    DialogActions,
    Modal,
    ModalDialog,
    Stack,
    CircularProgress,
    Box,
    IconButton
} from '@mui/joy';
import { IImage } from '../../../types/interfaces';
import { uploadFile } from 'pages/api/fileServer';
import { useBusiness } from 'hooks/useBusiness';
import { insertAndReturn } from 'pages/api/supabase';
import Dropzone from 'react-dropzone';
import { DeleteRounded } from '@mui/icons-material';

interface ImageFormProps {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
}

export default function ImageForm({ open, onClose, onSave }: ImageFormProps) {
    const [fileImages, setFileImages] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const { business } = useBusiness();

    useEffect(() => {
        if (!open) {
            setFileImages([]); // limpia al cerrar modal
        }
    }, [open]);

    const uploadImage = async (file: File, index: number): Promise<IImage | null> => {
        try {
            const data = await uploadFile(file, business?.id || 0, 'business_slide_' + Math.random().toString(36).substring(2, 15));
            if (data?.url) {
                return {
                    business_id: business?.id || 0,
                    image_url: data.url,
                    order: index
                };
            }
        } catch (error) {
            console.error('Error subiendo el archivo:', error);
        }
        return null;
    };

    const handleSave = async () => {
        if (fileImages.length === 0 || isUploading) return;

        setIsUploading(true);
        try {
            const uploadedImages = await Promise.all(
                fileImages.map((file, index) => uploadImage(file, index))
            );
            const filtered = uploadedImages.filter((img): img is IImage => img !== null);
            await Promise.all(filtered.map((img) => insertAndReturn('slide', img)));
            onSave();
            onClose();
        } finally {
            setIsUploading(false);
        }
    };

    const deleteImage = (image: File) => {
        setFileImages((prev) => prev.filter((i) => i.name !== image.name));
    };

    const imageItem = (file: File) => {
        const previewUrl = URL.createObjectURL(file);
        return (
            <Box key={file.name} sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={previewUrl} alt="Preview" height="100" style={{ margin: '10px', borderRadius: '6px' }} />
                <IconButton
                    variant="soft"
                    color="danger"
                    onClick={() => deleteImage(file)}
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                >
                    <DeleteRounded />
                </IconButton>
            </Box>
        );
    };

    return (
        <Modal open={open} onClose={onClose} sx={{ zIndex: 999999, overflow: 'visible' }}>
            <ModalDialog sx={{ width: { xs: '90%', sm: 420 }, maxWidth: '100%' }}>
                <DialogTitle>Agrega tus imágenes</DialogTitle>
                <Stack direction="column" spacing={2}>
                    <Dropzone
                        accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                        multiple={true}
                        maxFiles={5}
                        onDrop={(acceptedFiles) => {
                            setFileImages((prev) => [...prev, ...acceptedFiles]);
                        }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <>
                                <div
                                    {...getRootProps()}
                                    style={{
                                        cursor: 'pointer',
                                        border: '1px dashed #ccc',
                                        padding: '20px',
                                        textAlign: 'center'
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    <p>Arrastra y suelta tus imágenes aquí o haz clic para seleccionar</p>
                                    {isUploading && <CircularProgress size="sm" />}
                                </div>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {fileImages.map((image) => imageItem(image))}
                                </Box>
                            </>
                        )}
                    </Dropzone>
                </Stack>

                <DialogActions>
                    <Button variant="outlined" color="danger" onClick={onClose} disabled={isUploading}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} disabled={fileImages.length === 0 || isUploading}>
                        {isUploading ? 'Subiendo...' : 'Guardar imágenes'}
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}