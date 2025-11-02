'use client';
import React, { useState, useEffect } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
//@ts-ignore
import { useCourses } from 'hooks/useBusiness';
import { useVideoElements } from 'hooks/useBusiness';
import { VideoCourse, VideoElement } from 'types/types';
import {
  CssBaseline,
  Sheet,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Link,
  Stack,
  Chip,
  Box,
  CssVarsProvider,
} from '@mui/joy';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { Nature, PhoneForwarded, UpdateOutlined, StarRounded, School, VideoCameraFront } from '@mui/icons-material';
import HeadingText from 'components/commons/HeadingText';
import CourseVideoCard from './escuela/_components/CourseVideoCard';
import CourseVideoDetailsModal from './escuela/_components/CourseVideoDetailsModal';
import Footer from 'components/commons/Footer';
import { esES } from '@clerk/localizations';

const slides = [
  {
    title: '✨ Siéntete una Diva desde tu hogar',
    subtitle: 'Conéctate a nuestras clases virtuales y descubre el Burlesque, Heels y más, sin importar dónde estés.',
    image: '/imgs/banner1.png',
  },
  {
    title: '🔥 Empodérate con cada movimiento',
    subtitle: 'Libera tu sensualidad, fortalece tu confianza <br> y saca tu actitud femenina en cada clase online.',
    image: '/imgs/banner2.png',
  },/*
  {
    title: '💃 Vive la experiencia Burlesqa',
    subtitle: 'Clases virtuales interactivas para que brilles como una estrella, desde principiantes hasta avanzadas.',
    image: 'https://linen-tapir-231430.hostingersite.com/wp-content/uploads/2025/10/photo_5030879272264380366_y.jpg',
  },*/
];

const features = [
  {
    icon: <StarRounded sx={{ fontSize: 50, color: "#e91e63" }} />,
    title: "Disponibles 24/7",
    desc: "Accede a nuestras clases en cualquier momento y baila cuando quieras. ¡Tu sensualidad no tiene horarios!",
    cta: "🔥 Empieza hoy",
  },
  {
    icon: <StarRounded sx={{ fontSize: 50, color: "#e91e63" }} />,
    title: "Interactivas y divertidas",
    desc: "Conéctate con la comunidad Burlesqa. Vive la energía, la actitud y la sensualidad en cada clase virtual.",
    cta: "💎 Únete a la tribu",
  },
  {
    icon: <StarRounded sx={{ fontSize: 50, color: "#e91e63" }} />,
    title: "Aprende a tu ritmo",
    desc: "Sé tu propia diva. Repite, practica y avanza sin presiones. ¡El escenario es tuyo!",
    cta: "⚡ Saca tu diva interior",
  },
];

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<string>('courses');
  const [selectedElement, setSelectedElement] = useState<VideoCourse | VideoElement | null>(null);
  const { courses } = useCourses();
  const { videoElements } = useVideoElements();
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const clerkPublishableKey = "pk_test_dmVyaWZpZWQtcXVhaWwtODAuY2xlcmsuYWNjb3VudHMuZGV2JA";

  return (
    
    <CssVarsProvider
    disableTransitionOnChange
    defaultColorScheme="dark"
    // elimina modeStorageKey para que no se guarde otra preferencia
  >
    <CssBaseline />
    
    <Sheet
        variant="solid"
        sx={{
          px: 4,
          py: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#000',
        }}
      >
        <img src="/logo-burlesqa.jpg" alt="logo" style={{ width: '100px', filter: 'invert(1)' }} />
        <div>
        <Link href="https://burlesqa.com" underline="none">
          <Button variant="plain" style={{ color: 'white' }} >
            Sitio web
          </Button>
        </Link>
        <Link href="/clientes/login">
          <Button variant="soft" color="primary">
            Iniciar sesión
          </Button> 
        </Link>
        </div>
      </Sheet>

      {/* Hero Slider */}
        {slides.map((slide, i) => (
          <Sheet
            key={i}
            sx={{
              minHeight: '100vh',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              px: 2,
              color: 'white',
            }}
          >
            <Typography level="h1" fontWeight="xl" style={{color: 'white'}}>
              {slide.title}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: slide.subtitle }} style={{ color: 'white', fontSize: '22px', padding: '20px' }} />
            <Button
              variant="solid"
              
              size="lg"
              sx={{ mt: 4, backgroundColor: 'fuchsia', color: 'white', padding: '20px', fontSize: '20px' }}
              endDecorator={<ArrowForward />}
            >
              Comienza ahora
            </Button>
          </Sheet>
        ))}

      {/* Beneficios */}
      <Sheet
      variant="solid"
      sx={{
        py: 12,
        background: "linear-gradient(135deg, #0c0c0c, #1a1a1a)",
        color: "white",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography
          level="h2"
          mb={8}
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2rem", md: "3rem" },
            background: "linear-gradient(to right, #e91e63, #ff9800)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ¿Por qué elegir nuestras clases virtuales?
        </Typography>

        <Grid container spacing={4}>
          {features.map((item, i) => (
            <Grid xs={12} md={4} key={i}>
              <Card
                sx={{
                  height: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "20px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 12px 30px rgba(233,30,99,0.5)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  <div style={{ marginBottom: "1rem" }}>{item.icon}</div>
                  <Typography
                    level="h4"
                    sx={{ fontWeight: "bold", mb: 2, color: 'white' }}
                  >
                    {item.title}
                  </Typography>
                  <Typography level="body-md" sx={{ mb: 3, color: 'white' }}>
                    {item.desc}
                  </Typography>
                  <Button
                    variant="solid"
                    size="lg"
                    sx={{
                      borderRadius: "30px",
                      background: "linear-gradient(90deg, #e91e63, #ff5722)",
                      color: "#fff",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      px: 4,
                      py: 1.5,
                      boxShadow: "0 4px 15px rgba(233,30,99,0.4)",
                      "&:hover": {
                        background: "linear-gradient(90deg, #ff4081, #ff7043)",
                      },
                    }}
                  >
                    {item.cta}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Sheet>

      {/* CTA */}
      <Stack
          sx={{
            backgroundColor: "black",
            px: { xs: 2, md: 4 },
            py: 2,
            gap: 2,
            overflow: "auto",
          }}
        >
           <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 2 }}>
                  <Typography
                    level="h2"
                    sx={{ fontWeight: "bold", mb: 2, color: 'white' }}
                  >
                    Cursos y videos disponibles
                  </Typography>
                  <Typography level="body-md" sx={{ mb: 3, color: 'white' }}>
                    Explora nuestra colección de cursos y videos de Burlesqa, para que puedas aprender a ser una diva.
                  </Typography>
          
           </Box>

          {/* Barra de filtros */}
          <Stack direction="row" spacing={1}>
          <Chip sx={{ fontSize: "1.3rem" }} startDecorator={<School style={{ fontSize: "1.3rem" }} />} size="lg" variant="soft" color={selectedType === 'courses' ? 'primary' : 'neutral'} onClick={() => setSelectedType('courses')}>
              Cursos
            </Chip>
            <Chip sx={{ fontSize: "1.3rem" }} startDecorator={<VideoCameraFront style={{ fontSize: "1.3rem" }} />} size="lg" variant="soft" color={selectedType === 'videos' ? 'primary' : 'neutral'} onClick={() => setSelectedType('videos')}>
              Tutoriales
            </Chip>
            
          </Stack>

          {/* Mockup de lista de cursos */}
          <Stack sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2 }}>
            { selectedType === 'courses' ? courses?.map((course) => (
              <CourseVideoCard isPublic={true} key={course.id} element={course} onSelect={setSelectedElement} />
            )) : videoElements?.map((video) => (
              <CourseVideoCard isPublic={true} key={video.id} element={video} onSelect={setSelectedElement} />
            ))}
          </Stack>

            {selectedElement && <CourseVideoDetailsModal isPublic={true} open={Boolean(selectedElement)} element={selectedElement} onClose={() => setSelectedElement(null)} />}
        </Stack>
        <Footer />
  </CssVarsProvider>

  );
}