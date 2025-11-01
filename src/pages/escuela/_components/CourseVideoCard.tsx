import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import { VideoCourse, VideoElement } from 'types/types';
import Button from '@mui/joy/Button';
import { convertToFormatMoney } from 'utils/Utils';
import { FireExtinguisher, Fireplace, HotTub, LoginOutlined, PointOfSale, ShoppingCart, VideoCameraBack } from '@mui/icons-material';
import CourseVideoPurchaseModal from './CourseVideoPurchaseModal';



type CourseVideoCardProps = {
    element: VideoCourse | VideoElement;
    onSelect: (element: VideoCourse | VideoElement) => void;
    isPublic?: boolean;
    shortcut?: boolean;
}

export default function CourseVideoCard({ element, onSelect, isPublic = false, shortcut = false }: CourseVideoCardProps) {
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow onClick={() => onSelect(element)}>
        <AspectRatio ratio="1">
          <img
            src={element.thumbnail}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
          <Link sx={{ color: 'fuchsia' }} href="#multiple-actions" overlay underline="none" onClick={() => {
            
            if(shortcut){
              window.location.href = "/escuela/video/" + element.id;
            }else{
              onSelect(element);
            }
          }}>
            {('element_name' in element) ? element.element_name : element.course_name}
          </Link>
        </Typography>
        <Typography level="body-xs">{element.short_description}</Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {!shortcut && <Typography level="body-lg" sx={{ fontWeight: 'bold', color: 'yellow' }}>{convertToFormatMoney(element.price)}</Typography>}
          {!isPublic && !shortcut && <CourseVideoPurchaseModal element={element} />}
          {!isPublic && shortcut && <Button startDecorator={<VideoCameraBack />} sx={{ backgroundColor: 'fuchsia' }} variant="solid"  onClick={() => window.location.href = "/escuela/video/" + element.id}>Ver contenido</Button>}
          {isPublic && <Button startDecorator={<LoginOutlined />} sx={{ backgroundColor: 'fuchsia' }} variant="solid"  onClick={() => window.location.href = "/escuela/login"}>Regístrate</Button>}
        </CardContent>
      </CardOverflow>
    </Card>
  );
}