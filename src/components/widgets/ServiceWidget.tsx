import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { IService } from 'types/interfaces';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

type ServiceWidgetProps = {
  service: IService;
}

export default function ServiceWidget(props: ServiceWidgetProps) {
  const { service } = props;
  const { title, description, image, price } = service;
  return (
    <Card
    variant="outlined"
    orientation="horizontal"
    sx={{
      '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
    }}
  >
    <AspectRatio ratio="1" sx={{ width: 120, height: 120 }}>
      <Zoom>
        <img
          src={image}
          loading="lazy"
            alt=""
            width="100%"
            height="100%"
          style={{ borderRadius: '8px', cursor: 'zoom-in' }}
          />

      </Zoom>
    </AspectRatio>
    <CardContent>
      <Typography level="title-lg" id="card-description">
        {title}
      </Typography>
      <Typography
        level="body-sm"
        aria-describedby="card-description"
      >
      </Typography>
      {description}
    </CardContent>
  </Card>
  );
}