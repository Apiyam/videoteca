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
import FormBuilder from './FormBuilder';

const defaultForm = {
    id: 0,
    business_id: 0,
    name: '',
    description: '',
    fields: []
};

interface PersonalizedFormProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: IService | null, isNew: boolean) => void;
}

export default function PersonalizedForm({  open, onClose, onSave }: PersonalizedFormProps) {
    const [formData, setFormData] = useState(defaultForm);
    const [fields, setFields] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { business } = useBusiness();

    useEffect(() => {
        if (formData) {
            setFormData(formData);
        } else {
            setFormData(defaultForm);
        }
    }, [formData]);

    useEffect(() => {
        if (!open) {
            setFormData(defaultForm); // limpia cuando se cierra
        }
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        formData.business_id = business?.id || 0;
        if(formData.id == 0){
            const { id, ...formWithoutId } = formData;
            const data = await insertAndReturn('form', formWithoutId);
            if (data) {
                onSave(data, true);
                setIsSaving(false);
            }
        }else{
            const data = await updateOne('form', formData.id, formData);
            if (data) {
                onSave(data, false);
                setIsSaving(false);
            }
        }
        onClose();
    };

    
    return (
        <Modal open={open} onClose={onClose} sx={{ zIndex: 999999, overflow: 'scroll', height: '100%' }}>
            <ModalDialog
                sx={{
                    width: { xs: '90%', sm: 720 },
                    maxWidth: '100%',
                    height: '100%',
                    overflow: 'scroll'
                }}
            >
                <DialogTitle>Agregar producto o servicio</DialogTitle>
                <Stack direction="column" spacing={2}>
                {
                    isSaving ? (
                        <LoadingInformation title="Guardando..." description="Espera un momento mientras se guarda el formulario..."  />
                    ) : (
                        <Stack direction="column" spacing={2}>
                            <FormLabel>Nombre del formulario</FormLabel>
                            <Input name="name" value={formData.name} onChange={handleChange} />
                            <FormLabel>Descripción del formulario</FormLabel>
                            <Textarea name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            <FormBuilder onChange={setFields} />
                        </Stack>
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