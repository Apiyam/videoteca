import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import ListItemContent from '@mui/joy/ListItemContent';

import { BusinessCenter, MapOutlined, ShoppingBag, WatchOutlined } from '@mui/icons-material';
import { IService } from 'types/interfaces';
import LocationWidget from 'components/widgets/LocationWidget';
import { Card, CardContent, Stack } from '@mui/joy';
import Filters from './Filters';
import ServiceWidget from 'components/widgets/ServiceWidget';
import { useAppContext } from 'AppContext';
import HoursWidget from 'components/widgets/HoursWidget';

  export default function   CompanyResume() {
    const { companyData } = useAppContext();

    return (
      <AccordionGroup
        variant="outlined"
        transition="0.2s"
        sx={{
          borderRadius: 'md',
          [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
            {
              paddingBlock: '1rem',
            },
          [`& .${accordionSummaryClasses.button}`]: {
            paddingBlock: '1rem',
          },
        }}
      >
        <Accordion defaultExpanded={true} sx={{
          backgroundColor: 'var(--joy-palette-background-level2)',
          marginBottom: '0.6rem',
        }}>
          <AccordionSummary color="primary" >
            <Avatar color="warning">
              <ShoppingBag/>
            </Avatar>
            <ListItemContent>
              <Typography level="title-lg" sx={{ color: 'var(--joy-palette-text-secondary)' }}>Servicios y productos</Typography>
            </ListItemContent>
          </AccordionSummary>
          <AccordionDetails>
          <Filters />
            <Stack spacing={2} sx={{ overflow: 'auto' }}>
              {companyData.services.map((service: IService) => (
                <ServiceWidget service={service} key={service.id} />
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded={false} sx={{
          backgroundColor: 'var(--joy-palette-background-level2)',
          marginBottom: '0.6rem',
        }}>
          <AccordionSummary color="primary" >
            <Avatar color="warning">
              <BusinessCenter/>
            </Avatar>
            <ListItemContent>
              <Typography level="title-lg" sx={{ color: 'var(--joy-palette-text-secondary)' }}>Acerca de nosotros</Typography>
            </ListItemContent>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: companyData.description }} />
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={false} sx={{
          backgroundColor: 'var(--joy-palette-background-level2)',
          marginBottom: '0.6rem',
        }}>
          <AccordionSummary color="primary" >
            <Avatar color="warning">
              <MapOutlined/>
            </Avatar>
            <ListItemContent>
              <Typography level="title-lg" sx={{ color: 'var(--joy-palette-text-secondary)' }}>Ubicaciones</Typography>
            </ListItemContent>
          </AccordionSummary>
          <AccordionDetails>
            <LocationWidget />
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={false} sx={{
          backgroundColor: 'var(--joy-palette-background-level2)',
        }}>
          <AccordionSummary color="primary" >
            <Avatar color="warning">
              <WatchOutlined/>
            </Avatar>
            <ListItemContent>
              <Typography level="title-lg" sx={{ color: 'var(--joy-palette-text-secondary)' }}>Horarios</Typography>
            </ListItemContent>
          </AccordionSummary>
          <AccordionDetails>
            <HoursWidget />
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    );
}