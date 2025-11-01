import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Alert, Box, CircularProgress, Textarea } from '@mui/joy';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { ChatBubble, ContactMail, EmailOutlined, VerifiedUserOutlined } from '@mui/icons-material';

export default function ContactForm() {

  const [files, setFiles] = useState<File[]>([]); 
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [payment, setPayment] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<{type: 'success' | 'danger', msg: string}>({type:'success', msg: ''});
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async () => {
    setIsLoading(true);
    await axios.post('http://localhost:5678/webhook/graduaciones', {
      name,
      email,
      payment,
      files
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log(res.data);
      setResponse(res.data);
    }).catch((err) => {
      setResponse(err.response.data);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Card
      variant="outlined"
      sx={{
        maxWidth: '100%',
        mx: 'auto',
        width: '100%'
      }}
    >
      <Typography level="title-lg" startDecorator={<ContactMail />} sx={{ fontSize: '2.6rem', display: 'flex', alignItems: 'center', gap: 1 }}>
        Formulario de contacto
      </Typography>
      <Divider inset="none" />
      <CardContent
        
      >
        <FormControl >
          <FormLabel sx={{ fontSize: '2.2rem' }}>Nombre</FormLabel>
          <Input sx={{padding: '5px'}} value={name} onChange={(e) => setName(e.target.value)} endDecorator={<VerifiedUserOutlined />} />
        </FormControl>
        <FormControl>
          <FormLabel sx={{ fontSize: '2.2rem' }}>Correo electronico</FormLabel>
          <Input sx={{padding: '5px'}} value={email} onChange={(e) => setEmail(e.target.value)} endDecorator={<EmailOutlined />} />
        </FormControl>
        <FormControl>
          <FormLabel sx={{ fontSize: '2.2rem' }}>Mensaje</FormLabel>
          <Textarea sx={{padding: '5px'}} minRows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
        </FormControl>
       
        {
              !isLoading && response.msg && (
                <Alert color ={response.type}>
                  {response.msg}
                </Alert>
              )
            }
        
        <CardActions sx={{ gridColumn: '1', width: '100%' }}>
            
        
        {isLoading && <CircularProgress />}
        {
          !isLoading && (
            <Button size="lg"  variant="solid" color="primary" onClick={handleSubmit}>
              Enviar mensaje
            </Button>
          )
        }
        </CardActions>
      </CardContent>
    </Card>
    </Box>
  );
}

const DropzonePayment = ( {onChange}: {onChange: (files: File[]) => void}   ) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    onChange(acceptedFiles);
    // Puedes subir los archivos o procesarlos aquí
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer"
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        cursor: 'pointer'
      }}
    >
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>Suelta los archivos aquí...</p>
          : <p>Arrastra y suelta archivos aquí, o haz clic para seleccionar</p>
      }
    </div>
  );
};