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
import { fetchChatMessages, fetchClientLeads, updateClientLead } from 'pages/api/entities';
import { formatDate } from 'utils/Utils';
import { sendAPIRequest } from 'pages/api/fileServer';
import LoadingInformation from './LoadingInformation';

export default function WhatsAppBot() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [selectedChat, setSelectedChat] = useState<any>();
  const [message, setMessage] = useState('');
  const [clientLeads, setClientLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [name, setName] = useState('');
  const isMobile = useMediaQuery('(max-width: 900px)'); // Detecta pantallas pequeñas

  useEffect(() => {
    const fetchClientLeadsFunction = async () => {
      const leads = await fetchClientLeads();
      if (leads) setClientLeads(leads);
    };
    fetchClientLeadsFunction();
  }, []);

  useEffect(() => {
    const fetchMyChat = async () => {
      if (!selectedChat) return;
      const chats = await fetchChatMessages(selectedChat.phone_number);
      if (chats) {
        setChatMessages(
          chats.map((chat: any) => ({
            id: chat.id,
            from: chat.direction === 'incoming' ? 'user' : 'client',
            text: chat.message_text,
            time: formatDate(chat.timestamp, true),
          }))
        );
      }
    };
    fetchMyChat();
  }, [selectedChat]);

  const handleNameChange = async () => {
    if(!selectedChat) return;
    const updated = await updateClientLead(selectedChat.id, { full_name: name });
    if(updated){
      setMessageSnackbar("Cliente actualizado correctamente")
      setOpenSnackbar(true);
      setSelectedChat({ ...selectedChat, full_name: name });
      setClientLeads(clientLeads.map((lead) => lead.id === selectedChat.id ? { ...lead, full_name: name } : lead));
    }
    else{
      setMessageSnackbar("Error al actualizar el cliente")
      setOpenSnackbar(true);
    }
  }

  const handleStatusChange = async (status: string) => {
    if(!selectedChat) return;
    const updated = await updateClientLead(selectedChat.id, { status: status });
    if(updated){
      setMessageSnackbar("Cliente actualizado correctamente")
      setOpenSnackbar(true);
      setSelectedChat({ ...selectedChat, status: status });
      setClientLeads(clientLeads.map((lead) => lead.id === selectedChat.id ? { ...lead, status: status } : lead));
    }
    else{
      setMessageSnackbar("Error al actualizar el cliente")
      setOpenSnackbar(true);
    }
  }

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);
    const payload = {
      phone_number: selectedChat.phone_number,
      message: message,
      action: 'message'
    }
    const response = await sendAPIRequest(payload);
    console.log(response);
    const chats = await fetchChatMessages(selectedChat.phone_number);
      if (chats) {
        setChatMessages(
          chats.map((chat: any) => ({
            id: chat.id,
            from: chat.direction === 'incoming' ? 'user' : 'client',
            text: chat.message_text,
            time: formatDate(chat.timestamp, true),
          }))
        );
      }
    setMessageSnackbar('Mensaje enviado');
    setOpenSnackbar(true);
    setMessage('');
    setLoading(false);
  };

  const handleBack = () => {
    setSelectedChat(null);
    setChatMessages([]);
  };

  return (
    <Stack spacing={2}>
      <Card variant="outlined" sx={{ p: 1  }}>
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Stack>
            <Typography level="title-md">Gestor de Conversaciones de WhatsApp</Typography>
            <Typography level="body-sm">Administra chats.</Typography>
          </Stack>
          {!isMobile && (
            <Input
              startDecorator={<Search />}
              placeholder="Buscar en conversación..."
              size="sm"
              sx={{ width: { xs: '100%', sm: 250 }, mt: { xs: 1, sm: 0 } }}
            />
          )}
        </Box>

        <Divider />

        <Stack direction={{ xs: 'column', md: 'row' }} sx={{  height: 480 }}>
          {/* Lista de conversaciones */}
          {(!isMobile || !selectedChat) && (
            <Sheet
              variant="soft"
              sx={{
                width: { xs: '100%', md: 350 },
                borderRadius: 'md',
                overflowY: 'auto',
                boxShadow: 'sm',
                backgroundColor: 'transparent',
              }}
            >
              Filtrar por estado:
                        <Select
  value={statusFilter || 'all'}
  onChange={(e, newValue) => {
    setStatusFilter(newValue);
  }}
  sx={{ minWidth: 150 }}
>
  <Option value="all">Todos</Option>
  <Option value="lead">Lead</Option>
  <Option value="alumna">Alumna</Option>
  <Option value="contacto">Contacto</Option>
  <Option value="prospecto">Prospecto</Option>
  <Option value="colaborador">Colaborador</Option>
  <Option value="ignorado">Ignorado</Option>
</Select>
<br />
              <List sx={{ py: 0 }}>
                {clientLeads.filter((chat) => statusFilter === 'all' || chat.status === statusFilter).length === 0 && (
                  <Alert variant="soft" >No hay clientes con este estado</Alert>
                )}
                {clientLeads.filter((chat) => statusFilter === 'all' || chat.status === statusFilter).map((chat) => (
                  <ListItem
                    key={chat.id}
                    onClick={() => {
                      setSelectedChat(chat)
                      setName("")
                    }}
                    sx={{
                      cursor: 'pointer',
                      bgcolor:
                        selectedChat?.phone_number === chat.phone_number
                          ? 'primary.softBg'
                          : 'transparent',
                      '&:hover': { bgcolor: 'neutral.softBg' },
                      p: 1.5,
                      mb: 1,
                      border: '1px solid',
                      borderColor:
                        selectedChat?.phone_number === chat.phone_number
                          ? 'primary.plainColor'
                          : 'divider',
                      borderRadius: 'md',
                    }}
                  >
                    <Box sx={{ flex: 1, ml: 1 }}>
                      <Typography level="title-sm">
                        {chat.full_name}{' '}
                        <small
                          style={{
                            fontSize: '0.8rem',
                            color: 'gray',
                            paddingLeft: '10px',
                          }}
                        >
                          {formatDate(chat.timestamp, true, true)}
                        </small>
                      </Typography>
                      <Typography level="body-xs">{chat.message_text}</Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Sheet>
          )}

          {/* Panel de mensajes */}
          {(selectedChat || !isMobile) && (
            <Card
              variant="outlined"
              sx={{
                flex: 1,
                ml: { md: 2 },
                mt: { xs: 2, md: 0 },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'lg',
                overflow: 'hidden',
              }}
            >
              {selectedChat ? (
                <>
                  <Sheet
                    variant="soft"
                    color="neutral"
                    sx={{
                      p: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    {isMobile && (
                      <IconButton onClick={handleBack}>
                        <ArrowBack />
                      </IconButton>
                    )}
                    <Card
      variant="outlined"
      sx={{
        p: 2,
        position: 'relative',
        borderRadius: 'lg',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5, 
        width: '100%'
      }}
    >
      {/* Estado (arriba derecha) */}
      <Box sx={{ position: 'absolute', right: 16, top: 16 }}>
        <Typography level="body-xs" color="neutral">
          Estado:
        </Typography>

        <Select
          size="sm"
          value={selectedChat.status}
          onChange={(e, newValue) => handleStatusChange(newValue)}
          sx={{ mt: 0.5, minWidth: 150 }}
        >
          <Option value="lead">Lead</Option>
          <Option value="contacto">Contacto</Option>
          <Option value="prospecto">Prospecto</Option>
          <Option value="colaborador">Colaborador</Option>
          <Option value="ignorado">Ignorado</Option>
        </Select>
      </Box>

      {/* Teléfono */}
      <Typography level="title-sm">{selectedChat.phone_number}</Typography>

      {/* Nombre editable */}
      <Stack direction="row" alignItems="center" flexDirection="row-reverse" spacing={1}>
        {name !== "" ? (
          <Input
            value={name}
            size="sm"
            onChange={(e) => setName(e.target.value)}
            sx={{ flex: 1, width: '150px' }}
          />
        ) : (
          <Typography level="title-md" sx={{ flex: 1 }}>
            {selectedChat.full_name}
          </Typography>
        )}

        <IconButton
          size="sm"
          style={{ marginRight: 10 }}
          color="primary"
          variant="soft"
          onClick={() => {
            if (name !== "") {
              handleNameChange();
              setName("");
            } else {
              setName(selectedChat.full_name);
            }
          }}
        >
          {name !== "" ? <CheckCircle /> : <EditNoteOutlined />}
        </IconButton>
      </Stack>

      {/* Botón WhatsApp */}
      <a
        href={`https://wa.me/${selectedChat.phone_number}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <Button
          variant="soft"
          color="success"
          startDecorator={<WhatsApp />}
          sx={{ mt: 1 }}
        >
          Enviar mensaje WhatsApp
        </Button>
      </a>
    </Card>
                  </Sheet>

                  <Box
                    sx={{
                      flex: 1,
                      p: 2,
                      overflowY: 'auto',
                      bgcolor: 'background.level1',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                    }}
                  >
                    {chatMessages.map((msg, i) => (
                      <Box
                        key={i}
                        sx={{
                          alignSelf:
                            msg.from === 'user' ? 'flex-start' : 'flex-end',
                          bgcolor:
                            msg.from === 'user'
                              ? 'neutral.softBg'
                              : 'success.softBg',
                          color: 'text.primary',
                          p: 1.2,
                          borderRadius: 'xl',
                          maxWidth: '75%',
                          boxShadow: 'sm',
                        }}
                      >
                        <Typography level="body-sm">{msg.text}</Typography>
                        <Typography
                          level="body-xs"
                          sx={{ textAlign: 'right', mt: 0.5, opacity: 0.6 }}
                        >
                          {msg.time}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Divider />

                  <Box sx={{ p: 1.5, display: 'flex', gap: 1 }}>
                    {!loading && (
                      <>
                      <Input
                        placeholder="Escribe un mensaje..."
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <IconButton
                        color="success"
                        variant="solid"
                        onClick={handleSend}
                        disabled={!message.trim()}
                      >
                        <Send />
                      </IconButton>
                      </>)
                    }
                    {loading && (
                      <LoadingInformation title="Enviando mensaje..." />
                    )}
                  </Box>
                </>
              ) : (
                <Stack
                  flex={1}
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                  sx={{ color: 'neutral.plainColor' }}
                >
                  <Chat sx={{ fontSize: 48, opacity: 0.5 }} />
                  <Typography level="body-sm">Selecciona una conversación</Typography>
                </Stack>
              )}
            </Card>
          )}
        </Stack>
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