import * as React from 'react';
import { Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemContent } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ColorSchemeToggle from './ColorSchemeToggle';
import SagaLogo from './SagaLogo';
import { UserButton, useUser } from '@clerk/nextjs';

export default function NavBarWithSidebar() {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <>
      {/* NAVBAR */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          top: 0,
          px: 3,
          py: 2,
          zIndex: 10000,
          backgroundColor: 'background.body',
          borderBottom: '2px solid',
          borderColor: 'divider',
          position: 'sticky',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          {/* BOTÓN DEL SIDEBAR */}
          <IconButton size="lg" variant="soft" onClick={toggleSidebar} sx={{ fontSize: '2rem' }}>
            <MenuIcon fontSize="inherit" />
          </IconButton>

          <SagaLogo sx={{ width: 80, height: 80 }} />

          <Typography component="h1" sx={{ fontWeight: 'xl', fontSize: '1.8rem' }}>
            Tutoriales de Burlesqa
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'center' }}>
          <Box sx={{ gap: 1, alignItems: 'center', display: { xs: 'none', sm: 'flex' } }}>
            <UserButton
            />
            {user && (
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography level="title-sm" sx={{ fontSize: '1.2rem' }}>
                  {user.fullName}
                </Typography>
                <Typography level="body-xs" sx={{ fontSize: '1rem' }}>
                  {user.emailAddresses[0].emailAddress}
                </Typography>
              </Box>
            )}
          </Box>
          <ColorSchemeToggle sx={{ alignSelf: 'center', fontSize: '1.5rem' }} />
        </Box>
      </Box>

      {/* SIDEBAR */}
      <Drawer
        open={sidebarOpen}
        onClose={toggleSidebar}
        sx={{zIndex: 10000, paddingTop: '55px', '--Drawer-width': '100px' }}
      >
        <img src="/burlesqa.png" alt="Burlesqa" style={{  width: '100px', height: '100px' }} />
        <List>
          <ListItem>
            <ListItemButton component="a" href="/escuela/videos-y-cursos">
              <ListItemContent sx={{ fontSize: '1.2rem' }}>Tutoriales para adquirir</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a" href="/escuela/mis-cursos-videos">
              <ListItemContent sx={{ fontSize: '1.2rem' }}>Mis tutoriales adquiridos</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a" href="https://burlesqa.com">
              <ListItemContent sx={{ fontSize: '1.2rem' }}>Contacto</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}