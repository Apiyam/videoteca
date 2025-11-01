import { useRouter } from "next/router";

import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import CompanyResume from './_components/CompanyResume';
import CompanyWidget from 'components/widgets/CompanyWidget';
import FullLoad from "components/commons/FullLoad";
import WhatsAppContact from "components/widgets/WhatsAppContact";
import ContactForm from "components/widgets/ContactForm";
import PhotoSlider from "components/commons/PhotoSlider";
import QrCode from "components/commons/QrCode";
import Footer from "components/commons/Footer";


export default function CompanyPages() {

  const router = useRouter();
  if (!router.isReady) return <FullLoad />; 

  return (
    <Box  component="main" minWidth="650px" width="100%">
      <Box
       
        sx={{
          height: {
            xs: '100%'
          },
          display: 'grid',
          gridTemplateColumns: { xs: 'auto', lg: '60% 40%', md: '100%' },
          gridTemplateRows: 'auto 1fr auto',
        }}
      >
        <Stack
          sx={{
            gridRow: {
              lg: 'span 3',
              xs: 'span 1'
            },
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <CompanyWidget />
          <CompanyResume />
         
          </Stack>
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <ContactForm />
          <PhotoSlider />
          <QrCode />
        </Stack>


        <WhatsAppContact />
        
      </Box>
      <Footer />
    </Box>
  );
}
