import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from './Sidebar';
import Header from './Header';
import { useUser } from '@clerk/nextjs';
import RedirectionInDashboard from './RedirectionToLogin';
import { Breadcrumbs, Link, Snackbar, Tab, Typography } from '@mui/joy';
import { Stack, TabList } from '@mui/joy';
import { Tabs, tabClasses } from '@mui/joy';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useRouter } from 'next/router';
import { CheckBoxOutlineBlankRounded, CheckCircle } from '@mui/icons-material';

interface ApiyamCardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const defaultBreadcrumbs = (title: string, pathname: string) => {
  return [
    { label: 'Inicio', href: '/' },
    { label: title, href: pathname }
  ]
}

export default function ApiyamCardLayout({ children, title }: ApiyamCardLayoutProps) {
  const router = useRouter();
  const user = useUser();
  const breadcrumbsList = defaultBreadcrumbs(title, router.pathname);
  if (!user) {
    return <RedirectionInDashboard />;
  }
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar />
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow: 'auto',
          }}
        >
          <Box sx={{ flex: 1, width: '100%' }}>
            <Box
              sx={{
                position: 'sticky',
                top: { sm: -100, md: -110 },
                bgcolor: 'background.body',
                zIndex: 9995,
              }}
            >
              <Box sx={{ px: { xs: 2, md: 6 } }}>
                <Breadcrumbs
                  
                  size="sm"
                  aria-label="breadcrumbs"
                  separator={<ChevronRightRoundedIcon />}
                  sx={{ pl: 0 }}
                >
                  <Link
                    underline="none"
                    color="neutral"
                    href="/"
                    aria-label="Home"
                  >
                    <HomeRoundedIcon />
                  </Link>
                  
                  {breadcrumbsList?.map((breadcrumb) => (
                    <Link
                      underline="hover"
                      color="neutral"
                      href={breadcrumb.href}
                      sx={{ fontSize: 12, fontWeight: 500 }}
                      key={breadcrumb.href}
                    >
                      {breadcrumb.label}
                    </Link>
                  ))}
                </Breadcrumbs>
                <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                  {title}
                </Typography>
              </Box>
              {
                /* 
                <Tabs defaultValue={0} sx={{ bgcolor: 'transparent' }}>
                <TabList
                  tabFlex={1}
                  size="sm"
                  sx={{
                    pl: { xs: 0, md: 4 },
                    justifyContent: 'left',
                    [`&& .${tabClasses.root}`]: {
                      fontWeight: '600',
                      flex: 'initial',
                      color: 'text.tertiary',
                      [`&.${tabClasses.selected}`]: {
                        bgcolor: 'transparent',
                        color: 'text.primary',
                        '&::after': {
                          height: '2px',
                          bgcolor: 'primary.500',
                        },
                      },
                    },
                  }}
                >
                  <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
                    Settings
                  </Tab>
                  <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1}>
                    Team
                  </Tab>
                  <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={2}>
                    Plan
                  </Tab>
                  <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={3}>
                    Billing
                  </Tab>
                </TabList>
              </Tabs>
                */
              }
            </Box>
            <Stack
              spacing={4}
              sx={{
                display: 'flex',
                maxWidth: '1600px',
                mx: 'auto',
                px: { xs: 2, md: 6 },
                py: { xs: 2, md: 3 },
              }}
            >
              {children}
            </Stack>
          </Box>
          <Box component="footer" >
          
            <Typography level="body-xs" sx={{ textAlign: 'center' }}>
              © Videteca Burlesqa - Desarrollado con ☕ por Apiyam {new Date().getFullYear()}
            </Typography>
            <br />
          </Box>
        </Box>
        
      </Box>
    </CssVarsProvider>
  );
}