import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { ListAltTwoTone, PhotoTwoTone, RateReviewTwoTone, ReviewsTwoTone } from '@mui/icons-material';
import PhotoGalleryWidget from 'components/widgets/PhotoGalleryWidget';
import ItineraryWidget from 'components/widgets/ItineraryWidget';
import UserRatingWidget from 'components/widgets/UserRatingWidget';

export default function TripTabs() {
  return (
    <Tabs
      variant="outlined"
      aria-label="Opciones de viaje"
      defaultValue={0}
      sx={{  borderRadius: 'lg', boxShadow: 'sm', overflow: 'auto' }}
    >
      <TabList
        disableUnderline
        tabFlex={1}
        sx={{
          [`& .${tabClasses.root}`]: {
            fontSize: 'sm',
            fontWeight: 'lg',
            [`&[aria-selected="true"]`]: {
              color: 'primary.500',
              bgcolor: 'background.surface',
            },
            [`&.${tabClasses.focusVisible}`]: {
              outlineOffset: '-4px',
            },
          },
        }}
      >
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          <ListItemDecorator>
              <ListAltTwoTone />
          </ListItemDecorator>
          Itinerario
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          <ListItemDecorator>
              <PhotoTwoTone />
          </ListItemDecorator>
          Galería de fotos
        </Tab>
        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
          <ListItemDecorator>
              <ReviewsTwoTone />
          </ListItemDecorator>
          Reseñas
        </Tab>
      </TabList>
      <TabPanel value={0}>
        <ItineraryWidget />
        
      </TabPanel>
      <TabPanel value={1}>
        <PhotoGalleryWidget />
      </TabPanel>
      <TabPanel value={2}>
        <UserRatingWidget />
      </TabPanel>
    </Tabs>
  );
}