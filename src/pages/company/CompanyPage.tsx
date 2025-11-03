import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';

import NavBar from '../../components/commons/NavBar';
import HeadingText from '../../components/commons/HeadingText';
import Search from './components/Search';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import CompanyResume from './components/CompanyResume';
import CompanyWidget from 'components/widgets/CompanyWidget';
import TripWidget from '../../components/widgets/TripWidget';
import { ICompany } from 'types/interfaces';

interface CompanyPageProps {
  company: ICompany
}

export default function CompanyPage(props: CompanyPageProps) {
  const {company} = props;
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <NavBar />
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
            title={`${company.name}: Excursiones y viajes disponibles`} 
            description="Encuentra las mejores excursiones y viajes para tu próximo viaje." />
          <Search />
         
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
         
          </Stack>
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Filters />
          <Stack spacing={2} sx={{ overflow: 'auto' }}>

            
          </Stack>
        </Stack>
        <Pagination />
      </Box>
    </CssVarsProvider>
  );
}
