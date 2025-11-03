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
} from '@mui/joy';
import { Send, CheckCircle, Chat, Search, WhatsApp, ArrowBack } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import { fetchChatMessages, fetchClientLeads } from 'pages/api/entities';
import { formatDate } from 'utils/Utils';

export default function WhatsAppBot() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [selectedChat, setSelectedChat] = useState<any>();
  const [message, setMessage] = useState('');
  const [clientLeads, setClientLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const isMobile = useMediaQuery('(max-width: 900px)'); // Detecta pantallas pequeñas

  useEffect(() => {
    const fetchClientLeadsFunction = async () => {
      setLoading(true);
      const leads = await fetchClientLeads();
      if (leads) setClientLeads(leads);
      setLoading(false);
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

  const handleSend = () => {
    if (!message.trim()) return;
    setMessageSnackbar('Mensaje enviado');
    setOpenSnackbar(true);
    setMessage('');
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
              <List sx={{ py: 0 }}>
                {clientLeads.map((chat) => (
                  <ListItem
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
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
                    <Box>
                      <Typography level="title-sm" sx={{ marginBottom: 1 }}>
                        {selectedChat.full_name} ({selectedChat.phone_number})
                      </Typography>
                      <a
                        href={`https://wa.me/${selectedChat.phone_number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outlined" color="primary">
                          <WhatsApp />
                          Enviar mensaje WhatsApp
                        </Button>
                      </a>
                      <Typography
                        level="body-xs"
                        color="neutral"
                        sx={{ position: 'absolute', right: 20, top: 20 }}
                      >
                        Estado: <Chip color="primary">{selectedChat.status}</Chip>
                      </Typography>
                    </Box>
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
                    <Input
                      placeholder="Escribe un mensaje..."
                      fullWidth
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <IconButton
                      color="success"
                      variant="solid"
                      onClick={handleSend}
                      disabled={!message.trim()}
                    >
                      <Send />
                    </IconButton>
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