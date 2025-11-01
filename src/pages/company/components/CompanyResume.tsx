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

import { BusinessCenter } from '@mui/icons-material';
import { ICompany } from 'types/interfaces';

export default function   CompanyResume(props: { company: ICompany }  ) {
  const { company } = props;
  const isMobile = false;

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
      <Accordion defaultExpanded={!isMobile}>
        <AccordionSummary>
          <Avatar color="primary">
            <BusinessCenter/>
          </Avatar>
          <ListItemContent>
            <Typography level="title-md">Acerca de nosotros</Typography>
            <Typography level="body-sm">
              Conoce más sobre nuestra empresa y nuestros servicios
            </Typography>
          </ListItemContent>
        </AccordionSummary>
        <AccordionDetails>
          <Typography level="body-lg">
            <div dangerouslySetInnerHTML={{ __html: company.description }} />
          </Typography>
        </AccordionDetails>
      </Accordion>

    </AccordionGroup>
  );
}