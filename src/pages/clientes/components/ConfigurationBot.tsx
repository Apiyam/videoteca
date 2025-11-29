'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Stack,
  Typography,
  Divider,
  List,
  ListItem,
  Input,
  IconButton,
  Sheet,
  Snackbar,
  Chip,
  Button,
  Select,
  Option,
  Alert,
} from '@mui/joy';
import { Send, CheckCircle, Chat, Search, WhatsApp, ArrowBack, EditAttributesRounded, EditNoteOutlined } from '@mui/icons-material';
import { CircularProgress, useMediaQuery } from '@mui/material';
import { fetchChatMessages, fetchClientLeads, fetchSettings, updateClientLead, updateSettings } from 'pages/api/entities';
import { formatDate } from 'utils/Utils';
import { sendAPIRequest } from 'pages/api/fileServer';
import LoadingInformation from './LoadingInformation';

export default function ConfigurationBot() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [settings, setSettings] = useState('');
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const isMobile = useMediaQuery('(max-width: 900px)'); // Detecta pantallas pequeñas

  useEffect(() => {
    const fetchSettingsData = async () => {
      const settingsData = await fetchSettings();
      console.log(settingsData.bot);
      if (settingsData) setSettings(settingsData.bot);
    };
    fetchSettingsData();
  }, []);


  const handleSave = async () => {
    const updated = await updateSettings({ bot: settings });
    if(updated){
      setMessageSnackbar("Configuración actualizada correctamente")
      setOpenSnackbar(true);
    }
    else{
      setMessageSnackbar("Error al actualizar la configuración")
      setOpenSnackbar(true);
    }
  };


  return (
    <Stack spacing={2}>
      <Card variant="outlined" sx={{ p: 1  }}>
        <textarea 
        cols={30} 
        rows={30} 
        onChange={(e) => setSettings(e.target.value)}
        value={settings.replace(/\\n/g, '\n')}
      ></textarea>
      <Button onClick={handleSave}>Guardar</Button>
      </Card>

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
    </Stack>
  );
}