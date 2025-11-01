import { useEffect, useState } from 'react';
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Input,
    FormLabel,
    FormControl,
    Modal,
    ModalDialog,
    Select,
    Option,
    Checkbox,
    Box,
    CircularProgress,
    Stack,
    Textarea
} from '@mui/joy';
import { IService } from '../../../types/interfaces';
import { uploadFile } from 'pages/api/fileServer';
import { useBusiness } from 'hooks/useBusiness';
import { insertAndReturn, updateOne } from 'pages/api/supabase';
import { ArrowRight, LightbulbCircleOutlined, QuestionAnswerOutlined } from '@mui/icons-material';
import LoadingInformation from './LoadingInformation';
import { ILocation } from 'types/types';

const defaultLocation: ILocation = {
    id: 0,
    name: '',
    street: '',
    phone: '',
    email: '',
    website: '',
    business_id: 0,
};

interface LocationFormProps {
    location: ILocation | null;
    open: boolean;
    onClose: () => void;
    onSave: (data: ILocation | null, isNew: boolean) => void;
}

export default function LocationForm({ location, open, onClose, onSave }: LocationFormProps) {
    const [locationData, setLocationData] = useState<ILocation>(defaultLocation);
    const [isSaving, setIsSaving] = useState(false);
    const { business } = useBusiness();

    useEffect(() => {
        if (location) {
            setLocationData(location);
        } else {
            setLocationData(defaultLocation);
        }
    }, [location]);

    useEffect(() => {
        if (!open) {
            setLocationData(defaultLocation); // limpia cuando se cierra
        }
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocationData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        locationData.business_id = business?.id || 0;
        if(locationData.id == 0){
            const { id, ...locationWithoutId } = locationData;
            const data = await insertAndReturn('location', locationWithoutId);
            if (data) {
                onSave(data, true);
                setIsSaving(false);
            }
        }else{
            const data = await updateOne('location', locationData.id, locationData);
            if (data) {
                onSave(data, false);
                setIsSaving(false);
            }
        }
        onClose();
    };


    return (
        <Modal open={open} onClose={onClose} sx={{ zIndex: 999999, overflow: 'visible' }}>
            <ModalDialog
                sx={{
                    width: { xs: '90%', sm: 720 },
                    maxWidth: '100%'
                }}
            >
                <DialogTitle>Agregar ubicación</DialogTitle>
                <Stack direction="column" spacing={2}>
                {
                    isSaving ? (
                        <LoadingInformation title="Guardando..." description="Espera un momento mientras se guarda la ubicación..."  />
                    ) : (
                        <>
                    <Stack direction="row" spacing={2} sx={{width: '100%'}}>
                    <FormControl sx={{width: '100%'}}>
                        <FormLabel>Nombre</FormLabel>
                        <Input name="name" value={locationData.name} onChange={handleChange} />
                    </FormControl>
                    <FormControl sx={{width: '100%'}}>
                        <FormLabel>Dirección completa o parcial</FormLabel>
                        <Input name="street" value={locationData.street} onChange={handleChange} />
                    </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{width: '100%'}}>
                    <FormControl sx={{width: '100%'}}>
                        <FormLabel>Teléfono</FormLabel>
                        <Input name="phone" value={locationData.phone} onChange={handleChange} />
                    </FormControl>
                    <FormControl sx={{width: '100%'}}>
                        <FormLabel>Email</FormLabel>
                        <Input name="email" value={locationData.email} onChange={handleChange} />
                    </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{width: '100%'}}>
                    <FormControl sx={{width: '100%'}}>
                        <FormLabel>Página web</FormLabel>
                        <Input name="website" value={locationData.website} onChange={handleChange} />
                    </FormControl>
                    

                    
                    </Stack>

                        </>
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