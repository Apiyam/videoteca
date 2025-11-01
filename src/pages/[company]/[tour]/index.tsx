import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Image from 'next/image';

import HeadingText from '../../../components/commons/HeadingText';
import Search from '../_components/Search';
import CompanyWidget from '../../../components/widgets/CompanyWidget';
import CompanyResume from '../_components/CompanyResume';
import Filters from '../_components/Filters';
import TripWidget from '../../../components/widgets/TripWidget';
import { AspectRatio, Typography } from "@mui/joy";
import TripTabs from "./_components/TripTabs";
import FullLoad from "components/commons/FullLoad";
import RatingWidget from "components/widgets/RatingWidget";
import ReservationWidget from "components/widgets/ReservationWidget";
import { Divider } from "@mui/material";
import CompanyTripsWidget from "components/widgets/CompanyTripsWidget";



const companyInfo = {
  "name": "SAGA tours",
  "logo": "https://img.freepik.com/premium-vector/travel-tour-logo-with-mountain-airplane-concept_2175-160.jpg?semt=ais_hybrid&w=740",
  "slogan": "Más que viajar, es una experiencia",
  "description": ` SAGA es una empresa líder en el sector turístico mexicano, especializada en crear experiencias únicas e inolvidables a través de excursiones, tours y actividades diversas que abarcan toda la riqueza cultural y natural de la República Mexicana.
Desde las místicas ruinas mayas de la península de Yucatán hasta los majestuosos paisajes desérticos del norte, pasando por las playas paradisíacas del Pacífico y el Caribe, ofrecemos una amplia gama de aventuras diseñadas para todos los gustos y presupuestos.
Nuestros servicios incluyen: <br />
- Tours culturales por ciudades coloniales y pueblos mágicos <br /> 
- Excursiones a zonas arqueológicas y sitios históricos <br />      
- Aventuras ecoturísticas en reservas naturales <br />
- Experiencias gastronómicas regionales <br />
- Actividades deportivas y de aventura <br />
- Recorridos fotográficos por paisajes únicos <br />
- Paquetes personalizados para grupos y eventos especiales <br />`,
  "fb": "https://facebook.com/saga",
  "ig": "https://ig.com/saga",
  "tt": "https://tiktok.com/saga",
  "whatsapp": "7775443825"

}

const tripInfo = {
  title:"Viaje a santuario de la mariposa monarca",
                          category:"Disfruta de un viaje inolvidable a la mariposa monarca",
                          rareFind:true,
                          liked:true,
                          description: '<p>Cada año, millones de mariposas monarca recorren miles de kilómetros desde Canadá y Estados Unidos hasta los bosques de oyamel en México, donde encuentran refugio en los santuarios de Michoacán y el Estado de México.</p><p>Visitar el Santuario de la Mariposa Monarca es una experiencia inolvidable. Puedes caminar entre los árboles repletos de mariposas, escuchar el susurro de sus alas y maravillarte con este espectáculo natural.</p><p>Las mejores fechas para visitar el santuario son entre noviembre y marzo, cuando las mariposas han llegado en su totalidad. Se recomienda llevar ropa cómoda, calzado adecuado para caminatas y respetar las normas de conservación del área.</p><p><b>¡No te pierdas la oportunidad de vivir esta increíble aventura en contacto con la naturaleza!</b></p>',
                          image:"data:image/jpeg;base64,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" 
}

const TourPage = () => {
  const router = useRouter();
  const [company, setCompany] = useState<string | null>(null);
  const [tour, setTour] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.company) setCompany(router.query.company as string);
    if (router.query.tour) setTour(router.query.tour as string);
  }, [router.query]);

  if (!company || !tour) return <FullLoad />;

  return (
    <Box
        component="main"
        sx={{
          height: {
            xs: '100%',
            md: 'calc(100vh - 55px)'
          }, // 55px is the height of the NavBar
          display: 'grid',
          gridTemplateColumns: { xs: 'auto', md: '60% 40%' },
          gridTemplateRows: 'auto 1fr auto',
        }}
      >

        <Stack
          sx={{
            backgroundColor: 'background.surface',
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <HeadingText 
            title={`${companyInfo.name}: ${tripInfo.title}`} 
            description={tripInfo.category} 
          />
          <RatingWidget />
          <br />
          <AspectRatio
            ratio="16/9"
            sx={{
              width: '100%',
              maxHeight: 200,
              overflow: 'hidden'
            }}
          >
            <img
              src="https://cienciauanl.uanl.mx/wp-content/uploads/2015/11/mariposa-monarca.jpg"
              alt={tripInfo.title}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
            />
          </AspectRatio>
          <div dangerouslySetInnerHTML={{ __html: tripInfo.description }} />
          <TripTabs />
        </Stack>
        <Stack
          sx={{
            gridRow: {
              md: 'span 3',
              xs: 'span 1'
            },
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            
          }}
        >

         
          <CompanyTripsWidget company={companyInfo} />
          
          </Stack>
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          
          <Stack spacing={2} sx={{ overflow: 'auto' }}>
            
          </Stack>
        </Stack>
      </Box>
  );

};

export default TourPage;
