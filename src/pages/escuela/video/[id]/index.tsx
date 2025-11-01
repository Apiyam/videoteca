import { Button, CssBaseline, CssVarsProvider, ListItemContent } from '@mui/joy';
import Footer from 'components/commons/Footer';
import NavBar from 'components/commons/NavBar';
import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { Pause, PlayArrow } from '@mui/icons-material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Box, Typography, Avatar, List, ListItem } from '@mui/joy';
import { ListItemAvatar } from '@mui/material';
import { useVideoElements } from 'hooks/useBusiness';
import CourseVideoCard from 'pages/escuela/_components/CourseVideoCard';
import { VideoCourse, VideoElement } from 'types/types';
import CourseVideoDetailsModal from 'pages/escuela/_components/CourseVideoDetailsModal';


const mockCourses = [
  { id: 1, title: 'Curso de Twerk', thumbnail: '/mock/twerk.jpg' },
  { id: 2, title: 'Burlesque Básico', thumbnail: '/mock/burlesque.jpg' },
  { id: 3, title: 'Sensual Dance', thumbnail: '/mock/sensual.jpg' },
  { id: 4, title: 'Flexibilidad Avanzada', thumbnail: '/mock/flex.jpg' },
];

const SecureVideoPlayer = ({ videoId }: { videoId: string }) => {
    const [secureUrl, setSecureUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
      // 🔒 Aquí pedirías al backend (Supabase Edge Function, etc.)
      // una URL firmada temporal para este videoId
      /*const fetchSignedUrl = async () => {
        const res = await fetch(`/api/get-secure-video?id=${videoId}`);
        const data = await res.json();
        setSecureUrl(data.url);
      };
      fetchSignedUrl();*/
    }, [videoId]);
  
    const playerRef = useRef(null);

    return (
      <div
        onContextMenu={(e) => e.preventDefault()} // 🚫 bloquea botón derecho
        style={{
          position: "relative",
          maxWidth: "900px",
          margin: "0 auto",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
        }}
      >
         <div style={{ position: 'relative', height: 700, width: 900, margin: '0 auto', cursor: 'crosshair' }}>
      <TransformWrapper>
        <TransformComponent>
          <ReactPlayer
            ref={playerRef as unknown as React.RefObject<HTMLVideoElement>}
            src=  "https://burlesqa.com/wp-content/uploads/2025/10/curves.mp4"
            controls={true}
            width="900px"
            height="700px"
            playing={false}
          />
        </TransformComponent>
      </TransformWrapper>

      {/* Controles personalizados */}
      <div style={{ position: 'absolute',  bottom: 10, left: '50%', transform: 'translateX(-50%)', gap: 10 }}>
        {
          playerRef.current && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Button
                variant="solid"
                color="primary"
                size='lg'
                
                onClick={() => {
                    //@ts-ignore
                const internalPlayer = playerRef.current?.getInternalPlayer();
                  if(isPlaying){
                     //@ts-ignore
                    (internalPlayer).pause();
                    setIsPlaying(false);
                  }else{
                     //@ts-ignore
                    (internalPlayer).play();
                    setIsPlaying(true);
                  }
                }}
                sx={{ cursor: 'pointer' , backgroundColor: 'fuchsia' , color: 'white', borderRadius: '2rem' }}
                startDecorator={isPlaying ? <Pause /> : <PlayArrow />}
              >
                {isPlaying ? 'Pausar' : 'Reproducir'}
              </Button>
              
            </div>
          )
        }
      </div>
    </div>
      </div>
    );
  }

  export default function VideoPageMock() {
    const videoId = '510'; // mock
    const { videoElements } = useVideoElements();
    const [selectedElement, setSelectedElement] = useState<VideoCourse | VideoElement | null>(null);

    return (
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <NavBar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            px: 4,
            py: 6,
            maxWidth: '1400px',
            mx: 'auto'
          }}
        >
          {/* Columna izquierda 1/3 */}
          <Box sx={{ flex: 1, maxWidth: { md: '33%' } }}>
            <Typography level="h1" mb={2} sx={{ color: 'yellow', textAlign: 'center' }}>
              ¡Aprende las bases de Curves On Fire!
            </Typography>
            <img width="80%" style={{ display: 'block', margin: ' auto' }} src="https://burlesqa.com/wp-content/uploads/2025/10/curves.png" alt="Twerk" />
            <Box
  sx={{
    mx: 'auto',
    p: 4,
    borderRadius: 3,
    boxShadow: 3,
  }}
>


  <Typography  >
    Descubre el poder de tu sensualidad y libera tu confianza con nuestra clase <strong>de twerk</strong> diseñada para todos los niveles. 
    <strong>Curves On Fire</strong> no solo es diversión y movimiento, sino también una forma de conectar con tu cuerpo y potenciar tu autoestima.
  </Typography>

  <List sx={{ mb: 2 }}>
    <ListItem>🔥 Aprende los movimientos básicos y avanzados del twerk.</ListItem>
    <ListItem>💃 Mejora tu coordinación, flexibilidad y fuerza en el core.</ListItem>
    <ListItem>✨ Potencia tu confianza y presencia en el escenario o en la vida diaria.</ListItem>
    <ListItem>🎶 Disfruta de una experiencia energética al ritmo de la música.</ListItem>
  </List>


</Box>
  
            
          </Box>
          {selectedElement && <CourseVideoDetailsModal open={Boolean(selectedElement)} element={selectedElement} onClose={() => setSelectedElement(null)} />}
          {/* Columna derecha 2/3 */}
          <Box sx={{ flex: 2 , maxWidth: '66%'}}>
            <SecureVideoPlayer videoId={videoId} />
            <Typography level="title-sm" mb={2} sx={{ color: 'fuchsia', fontSize: '1.5rem' }}>
              Otros cursos disponibles
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
            {videoElements?.map((video: VideoElement) => (
              <CourseVideoCard key={video.id} element={video} onSelect={setSelectedElement} />
            ))}
            </Box>
            
          </Box>
        </Box>
        <Footer />
      </CssVarsProvider>
    );
  }

