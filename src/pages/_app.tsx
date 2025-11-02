
import { useEffect, useMemo, useState } from 'react';

import type { AppProps } from "next/app";
import { AppProvider } from '../AppContext';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { CompanyData } from 'types/interfaces';
import { IConfig } from 'types/types';
import '../App.css';
import RedirectionToLogin from './clientes/components/RedirectionToLogin';
import { esES } from '@clerk/localizations';
import { query, queryOne } from './api/supabase';
import FullLoad from 'components/commons/FullLoad';
import HomePage from 'pages/index';
import { DEFAULT_CONFIG } from 'components/commons/constants';
import { ClerkProvider } from '@clerk/nextjs';


const companyData = {
  'miel': {
    "id": 0,
    "apiyamUrl": "https://apiyam.com/dulcecolmena.mx",
    "name": "Dulce Colmena",
    "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGbStwUzDMi5bXkBxtXclj205E_JuHnUvXKA&s",
    "slogan": "La miel que endulza tu vida",
    "description": `Dulce Colmena es una empresa familiar ubicada en Cuernavaca, Morelos
      Nuestros productos incluyen: <br />
      - Miel de abeja pura multiflora <br />
      - Polen y propóleo natural <br />
      - Cera de abeja para usos cosméticos y artesanales <br />
      - Cosmética natural con base de miel y cera <br />`,
    "whatsapp": "7771234567",
    "website": "https://dulcecolmena.mx",
    "email": "dulcecolmena@gmail.com",
    "contact": "Fernando Gonzalez",
    "socials": {
      "fb": "https://facebook.com/dulcecolmena.mx",
      "ig": "https://instagram.com/dulcecolmena.mx",
      "tt": "",
      "lk": "",
      "yt": "",
      "other": "https://other.com/dulcecolmena.mx"
    },
    "hours": [
      {
        "day": "Lunes",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Martes",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Miércoles",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Jueves",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Viernes",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Sábado",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Domingo",
        "hours": "10:00 - 18:00"
      }
    ],
    "metrics": [
      {
        "metric": "+1000",
        "description": "Clientes satisfechos"
      },
      {
        "metric": "+20",
        "description": "Años de experiencia"
      },
      {
        "metric": "+100",
        "description": "Productos vendidos"
      }
    ],
    "locations": [
      {
        "id": 0,
        "name": "Dulce Colmena Sucursal 1",
        "street": "Av. Revolución 123, Cuernavaca, Morelos",
        "phone": "7771234567",
        "email": "dulcecolmena@gmail.com",
        "website": "https://dulcecolmena.mx"
      },
      {
        "id": 1,
        "name": "Dulce Colmena Sucursal 2",
        "street": "Av. Revolución 123, Cuernavaca, Morelos",
        "phone": "7771234567",
        "email": "dulcecolmena@gmail.com",
        "website": "https://dulcecolmena.mx"
      }
    ],
    "slides": [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-eP2YY-6MR1BZRM2xlkZwT1P6XbU5sWVS7Q&s',
      'https://www.abejareyna.mx/cdn/shop/articles/perfect-match-abeja-reyna-presenta-sets-edicion-limitada-san-valentin.webp?v=1719966743',
      'https://i5.walmartimages.com.mx/samsmx/images/product-images/img_large/981014760l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'
    ],
    "services": [
      {
        "id": 0,
        "title": "Miel de abeja",
        "description": "Miel de abeja pura multiflora",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-eP2YY-6MR1BZRM2xlkZwT1P6XbU5sWVS7Q&s",
        "price": 100
      },
      {
        "id": 1,
        "title": "Jalea real",
        "description": "Jalea real 100% natural de las mejores abejas de la región",
        "image": "https://cdn0.uncomo.com/es/posts/7/8/7/como_hacer_una_crema_facial_de_jalea_real_40787_600.jpg",
        "price": 80
      },
      {
        "id": 2,
        "title": "Jabón artesanal",
        "description": "Jabón artesanal hecho a mano con aceites y mantecas vegetales",
        "image": "https://www.mielesapiariosbautista.com/cdn/shop/products/fae56ac3-6e1d-4add-92d1-c17dc1b8ac9d.jpg?v=1626806923",
        "price": 40
      }
    ],
    "config": {
      "strongColor": "#e7b006",
      "primaryColor": "#e7b006",
      "level1": "#e7b006",
      "level2": "#e7b006",
      "level3": "#efda9c",
      "secondaryFontColor": "#fff",
      "tertiaryFontColor": "#000"
    }
  },
  'panaderia': {
    "id": 1,
    "apiyamUrl": "https://apiyam.com/panaderiaelsol.mx",
    "name": "Panadería Doña Vicky",
    "logo": "https://i.pinimg.com/originals/77/1e/03/771e0354d08d3c87c62057137cbad533.jpg",
    "slogan": "Panadería artesanal con tradición familiar",
    "description": `Panadería artesanal con tradición familiar ubicada en Cuernavaca, Morelos
      Nuestros productos incluyen: <br />
      - Pan de campo <br />
      - Pan de caja <br />
      - Pan dulce <br />
      - Pan salado <br />`,
    "whatsapp": "7771234567",
    "website": "https://panaderiaelsol.mx",
    "email": "panaderiaelsol@gmail.com",
    "contact": "Juan Pérez",
    "socials": {
      "fb": "",
      "ig": "https://instagram.com/panaderiaelsol.mx",
      "tt": "https://tiktok.com/@panaderiaelsol.mx",
      "lk": "https://linkedin.com/company/panaderiaelsol.mx",
      "yt": "https://facebook.com/panaderiaelsol.mx",
      "other": ""
    },
    "hours": [
      {
        "day": "Lunes",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Martes",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Miércoles",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Jueves",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Viernes",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Sábado",
        "hours": "Cerrado"
      },
      {
        "day": "Domingo",
        "hours": "Cerrado"
      }
    ],
    "metrics": [
      {
        "metric": "+20",
        "description": "Años de experiencia"
      },
      {
        "metric": "+100",
        "description": "Productos diversos"
      }
    ],
    "locations": [
      {
        "id": 0,
        "name": "Panadería el Sol Sucursal 1",
        "street": "Av. Revolución 123, Cuernavaca, Morelos",
        "phone": "7771234567",
        "email": "panaderiaelsol@gmail.com",
        "website": "https://panaderiaelsol.mx"
      },
      {
        "id": 1,
        "name": "Panadería el Sol Sucursal 2",
        "street": "Av. Revolución 123, Cuernavaca, Morelos",
        "phone": "7771234567",
        "email": "panaderiaelsol@gmail.com",
        "website": "https://panaderiaelsol.mx"
      }
    ],
    "slides": [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Y38nRhDT9wfEBgS_PKYzJp56DeQIaTw0zA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6jkF2-ZnQ830wYSbF_R_C8w4fyiz44HvI6A&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1K8jBahlHIZKNmiFQA6XBax5VGuSUVG2EVw&s'
    ],
    "services": [
      {
        "id": 0,
        "title": "Pan de campo",
        "description": "Pan de campo 100% natural",
        "image": "https://laroussecocina.mx/wp-content/uploads/2023/01/Pan-viene%E2%95%A0us-de-chipotle.jpg.webp",
        "price": 10
      },
      {
        "id": 1,
        "title": "Pan de caja",
        "description": "Pan de caja 100% natural",  
        "image": "https://karmele.com.mx/wp-content/uploads/2021/03/Pan-de-Caja-Integral-1.jpg",
        "price": 15
      },
      {
        "id": 2,
        "title": "Pan dulce",
        "description": "Pan dulce 100% natural",
        "image": "https://www.maricruzavalos.com/wp-content/uploads/2023/08/concha-bread-recipe.jpg",
        "price": 20
      }
    ],
    "config": {
      "strongColor": "#6e3a15",
      "tertiaryFontColor": "#000",
      "secondaryFontColor": "#000",
      "primaryColor": "#efda9c",
      "level1": "#efda9c",
      "level2": "#efda9c",
      "level3": "#efda9c"
    }
  },
  'abogado': {
    "id": 1,
    "apiyamUrl": "https://apiyam.com/abogados.mx",
    "name": "Abogados Soto y Ochoa",
    "logo": "https://marketplace.canva.com/EAGFT0S3qoQ/1/0/1600w/canva-logo-estudio-de-abogados-moderno-azul-y-blanco-EfFQXNqv_hI.jpg",
    "slogan": "Abogados Soto y Ochoa",
    "description": `Somos una firma de abogados que ofrece servicios legales de alta calidad.
      Nuestros servicios incluyen: <br />
      - Asesoría legal en casos de divorcio <br />
      - Asesoría legal en casos de herencia <br />
      - Asesoría legal en casos de responsabilidad civil <br />
      - Asesoría legal en casos de responsabilidad penal <br />
      - Asesoría jurídica en casos de divorcio <br />`,
    "whatsapp": "7771234567",
    "website": "https://abogadojuanperez.mx",
    "email": "abogadojuanperez@gmail.com",
    "contact": "Juan Pérez",
    "socials": {
      "fb": "https://facebook.com/abogadossoto.mx",
      "ig": "https://instagram.com/abogadossoto.mx",
      "tt": "https://tiktok.com/@abogadossoto.mx",
      "lk": "https://linkedin.com/company/abogadossoto.mx",
      "yt": "https://youtube.com/@abogadossoto.mx",
      "other": ""
    },
    "metrics": [
      {
        "metric": "+20",
        "description": "Años de experiencia"
      },
      {
        "metric": "+100",
        "description": "Clientes satisfechos"
      }
    ],
    "locations": [
      {
        "id": 0,
        "name": "Abogado Juan Pérez",
        "street": "Av. Revolución 123, Cuernavaca, Morelos",
        "phone": "7771234567",
        "email": "abogadojuanperez@gmail.com",
        "website": "https://abogadojuanperez.mx"
      }
    ],
    "hours": [
      {
        "day": "Lunes",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Martes",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Miércoles",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Jueves",
        "hours": "10:00 - 18:00"
      },
      {
        "day": "Viernes",
        "hours": "Cerrado"
      },
      {
        "day": "Sábado",
        "hours": "Cerrado"
      },
      {
        "day": "Domingo",
        "hours": "Cerrado"
      }
    ],
    "slides": [
      'https://img.freepik.com/vector-premium/diseno-portada-servicios-legales-facebook-o-plantilla-banner-portada-publicidad-medios-sociales-firma-abogados-flat_755018-1958.jpg'
    ],
    "services": [
      {
        "id": 0,
        "title": "Asesoría legal en casos de divorcio",
        "description": "Asesoría legal en casos de divorcio",
        "image": "https://www.soycest.mx/hubfs/carrera-de-abogado.jpeg",
        "price": 10
      },
      {
        "id": 1,
        "title": "Asesoría legal en casos de herencia",
        "description": "Asesoría legal en casos de herencia",  
        "image": "https://www.soycest.mx/hubfs/carrera-de-abogado.jpeg",
        "price": 15
      },
      {
        "id": 2,
        "title": "Asesoría legal en casos de responsabilidad civil",
        "description": "Asesoría legal en casos de responsabilidad civil",
        "image": "https://www.soycest.mx/hubfs/carrera-de-abogado.jpeg",
        "price": 20
      },
      {
        "id": 3,
        "title": "Asesoría legal en casos de responsabilidad penal",
        "description": "Asesoría legal en casos de responsabilidad penal",
        "image": "https://www.soycest.mx/hubfs/carrera-de-abogado.jpeg",
        "price": 20
      },
      {
        "id": 4,
        "title": "Asesoría jurídica en casos de divorcio",
        "description": "Asesoría jurídica en casos de divorcio",
        "image": "https://www.soycest.mx/hubfs/carrera-de-abogado.jpeg",
        "price": 20
      }
    ],
    "config": {
      "strongColor": "#0f4671",
      "tertiaryFontColor": "#fff",
      "secondaryFontColor": "#fff",
      "primaryColor": "#0f4671",
      "level1": "#0f4671",
      "level2": "#0f4671",
      "level3": "#0f4671"
    }
  },
};



function SagaApp({ Component, pageProps, router }: AppProps) {
  const clerkPublishableKey = "pk_test_dmVyaWZpZWQtcXVhaWwtODAuY2xlcmsuYWNjb3VudHMuZGV2JA";
  const renderAdminApp = () => (
    
  <ClerkProvider publishableKey={clerkPublishableKey} localization={esES}>
  <CssVarsProvider
    disableTransitionOnChange
    defaultColorScheme="dark"
    // elimina modeStorageKey para que no se guarde otra preferencia
  >
    <CssBaseline />
    <Component {...pageProps} />
  </CssVarsProvider>
  </ClerkProvider>
  );
  
  const renderNoCompany = () => (
    <div>
      <h1>No se encontró la empresa</h1>
    </div>
  );
  
  const renderCompanyApp = () => (
    
    <AppProvider companyData={companyInfo!}>
      <CssVarsProvider
        disableTransitionOnChange
        defaultColorScheme="dark"
        modeStorageKey=""
      >
        <CssBaseline />
        <Component {...pageProps} />
      </CssVarsProvider>
    </AppProvider>
  );
  const [companyInfo, setCompanyInfo] = useState<CompanyData | null>(null);

  const isAdminRoute = useMemo(() => router.pathname.startsWith('/clientes'), [router.pathname]);
  const isHome = useMemo(() => router.pathname === '/', [router.pathname]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    const fetchCompany = async () => {
      
      const business = await queryOne("business", "apiyam_url", 'http://192.168.100.3:3000/'+router.query.company);
      
      if(business){
        setCompanyInfo(business);
        const metrics = await query("metric", "business_id", business.id);
        const hours = await query("business_hour", "business_id", business.id); 
        const services = await query("service", "business_id", business.id);
        const locations = await query("location", "business_id", business.id);
        const slides = await query("slide", "business_id", business.id);
        const socials = await query("social", "business_id", business.id);
        const config = business.config || DEFAULT_CONFIG;
        setCompanyInfo({...business, metrics: metrics || [], hours: hours || [], services: services || [], locations: locations || [], slides: slides || [], socials: socials || [], config: config || DEFAULT_CONFIG  });
        
        setIsLoading(false);
      }
    }
    if (!isAdminRoute && typeof router.query.company === 'string') {
      fetchCompany();
    }
  }, [router.query.company, isAdminRoute]);

  console.log(isAdminRoute);
  return isAdminRoute ? renderAdminApp() : renderCompanyApp()

  
}

export default SagaApp;