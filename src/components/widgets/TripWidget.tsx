import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import { BusAlert, DateRangeRounded, DiscountRounded, HourglassEmptySharp, SellTwoTone } from '@mui/icons-material';
import RatingWidget from 'components/widgets/RatingWidget';
import { convertToFriendlyUrl } from 'utils/Utils';
import { Button } from '@mui/joy';
import { ITrip } from 'types/interfaces';



export default function TripWidget(props: ITrip) {
  const { category, title, rareFind = false, liked = false, image, almostSold = false, id, companyName   } = props;
  const [isLiked, setIsLiked] = React.useState(liked);
  const url = `/${convertToFriendlyUrl(companyName)}/${convertToFriendlyUrl(title)}/`;
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        bgcolor: 'neutral.softBg',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        '&:hover': {
          boxShadow: 'lg',
          borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
        },
      }}
    >
      <CardOverflow
        sx={{
          mr: { xs: 'var(--CardOverflow-offset)', sm: 0 },
          mb: { xs: 0, sm: 'var(--CardOverflow-offset)' },
          '--AspectRatio-radius': {
            xs: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0',
            sm: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))',
          },
        }}
      >
        <AspectRatio
          ratio="1"
          flex
          sx={{
            minWidth: { sm: 120, md: 160 },
            '--AspectRatio-maxHeight': { xs: '160px', sm: '9999px' },
          }}
        >
          <img alt="" src={image} />
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              width: '100%',
              p: 1,
            }}
          >
            {rareFind && (
              <Chip
                variant="solid"
                color="danger"
                startDecorator={<DiscountRounded />}
                size="md"
              >
                ¡En promoción!
              </Chip>
            )}
            {
              almostSold && (
                <Chip
                  variant="solid"
                  color="warning"
                  startDecorator={<HourglassEmptySharp />}
                  size="md"
                >
                  ¡Casi se agotan!
                </Chip>
              )
            }
            <IconButton
              variant="plain"
              size="sm"
              color={isLiked ? 'danger' : 'neutral'}
              onClick={() => setIsLiked((prev) => !prev)}
              sx={{
                display: { xs: 'flex', sm: 'none' },
                ml: 'auto',
                borderRadius: '50%',
                zIndex: '20',
              }}
            >
              <FavoriteRoundedIcon />
            </IconButton>
          </Stack>
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Stack
          spacing={1}
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <div>
            <Typography level="body-sm">{category}</Typography>
            <Typography level="title-md">
              <Link
                
                underline="none"
                href={url}
                sx={{ color: 'text.primary' }}
              >
                {title}
              </Link>
            </Typography>
          </div>
          <IconButton
            variant="plain"
            size="sm"
            color={isLiked ? 'danger' : 'neutral'}
            onClick={() => setIsLiked((prev) => !prev)}
            sx={{ display: { xs: 'none', sm: 'flex' }, borderRadius: '50%' }}
          >
            <FavoriteRoundedIcon />
          </IconButton>
        </Stack>
        <Stack
          spacing="0.25rem 1rem"
          direction="row"
          useFlexGap
          sx={{ flexWrap: 'wrap', my: 0.25 }}
        >
          <Typography level="body-xs" startDecorator={<FmdGoodRoundedIcon />}>
            Estado de México
          </Typography>
          <Typography level="body-xs" startDecorator={<BusAlert />}>
            {Math.floor(Math.random() * 100)} lugares
          </Typography>
          <Typography level="body-xs" startDecorator={<DateRangeRounded />}>
            {Math.floor(Math.random() * 5)} días
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ mt: 'auto' }}>
          <RatingWidget />
          
          <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: 'right' }}>
          <Link href={url} underline="none">
              <Button variant="soft" color="danger">
                <SellTwoTone /> &nbsp;
                Ver/Reservar
              </Button>
          </Link>
          <br /> <br />
            <strong>${Math.floor(Math.random() * 500)}</strong> <Typography level="body-md">por persona</Typography>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
