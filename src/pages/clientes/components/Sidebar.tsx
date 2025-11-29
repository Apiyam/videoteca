import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { closeSidebar } from 'utils/Utils';
import { HelpCenterSharp, SchoolSharp, VideoLibraryRounded, VideoLibrarySharp, ViewAgendaRounded, WhatsApp } from '@mui/icons-material';
import { UserButton, useUser } from '@clerk/nextjs';

const baseUrl = "/clientes";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: 'grid',
            transition: '0.2s ease',
            '& > *': {
              overflow: 'hidden',
            },
          },
          open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
        ]}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const { user } = useUser();
  
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant="plain" color="primary" size="sm">
          <img src="/burlesqa.png" alt="Videoteca Burlesqa" width="30" height="30" />
        </IconButton>
        <Typography level="title-lg">Admin Burlesqa</Typography>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton component="a" href={baseUrl}>
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Inicio</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <VideoLibraryRounded />
                  <ListItemContent>
                    <Typography level="title-sm">Cursos y videos</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={[
                      open ? { transform: 'rotate(180deg)' } : { transform: 'none' },
                    ]}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton component="a" href={baseUrl + "/crear-curso"}>Añadir elemento de videoteca</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component="a" href={baseUrl + "/mis-cursos"}>Ver mis cursos</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component="a" href={baseUrl + "/mis-videos"}>Ver mis videos sueltos</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton component="a" href={baseUrl + "/estadisticas"}>Estadísticas</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
          
          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href={baseUrl + "/alumnas"}
            >
              <SchoolSharp />
              <ListItemContent>
                <Typography level="title-sm">Alumnas</Typography>
              </ListItemContent>
              <Chip size="sm" color="primary" variant="solid">
                4
              </Chip>
            </ListItemButton>
          </ListItem>


          <ListItem>
            <ListItemButton component="a" href={baseUrl + "/mi-material"}>
              <VideoLibrarySharp />
              Mi material
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component="a" href={baseUrl + "/whatsapp"}>
              <WhatsApp />
              Conversaciones de WhatsApp
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a" href={baseUrl + "/bot"}>
              <ViewAgendaRounded />
              Configuración de bot
            </ListItemButton>
          </ListItem>
        </List>
        <Card
          invertedColors
          variant="soft"
          color="success"
          size="sm"
          sx={{ boxShadow: 'none', display: 'none' }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography level="title-sm">Plan PRO activado</Typography>
            <IconButton size="sm">
              <HelpCenterSharp />
            </IconButton>
          </Stack>
          <Typography level="body-xs">
            Tienes el plan PRO activado, puedes ver y actualizar tu plan en cualquier momento.
          </Typography>
          <LinearProgress variant="outlined" value={100} determinate sx={{ my: 1 }} />
          <Button size="sm" variant="solid" component="a" href={baseUrl + "/planes"}>
            Ver y actualizar plan
          </Button>
        </Card>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <UserButton />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{user?.fullName}</Typography>
          <Typography level="body-xs">{user?.emailAddresses[0].emailAddress}</Typography>
        </Box>
      </Box>
    </Sheet>
  );
}