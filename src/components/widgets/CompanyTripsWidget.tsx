import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import { Stack, SvgIcon, Grid } from '@mui/joy';
import { ICompany } from 'types/interfaces';
import MiniTripWidget from './MiniTripWidget';

const trips = [
    {
        id: 1,
        name: 'Excursion a la montaña',
        description: 'Viaje de 3 días',
        image: 'https://nupciasmagazine.com/wp-content/uploads/2019/12/portada-montala.jpg',
    },
    {
        id: 2,
        name: 'Excursion a la playa',
        description: 'Viaje de 3 días ',
        image: 'https://periodicoviaje.com/wp-content/uploads/2020/07/Factores-que-favorecer%C3%A1n-a-la-reactivaci%C3%B3n-tur%C3%ADstica.jpg',
    },
    {
        id: 3,
        name: 'Acapulcazo',
        description: 'Viaje express de 1 día ',
        image: 'https://cdn.espirituaventurero.com.mx/images/slider/AcapulcoyTortugas0.jpg',
    },
    {
        id: 4,
        name: 'Viaje express',
        description: 'Viaje express de 1 día',
        image: 'https://images.myguide-cdn.com/md/content/2/large/n-a-765978.jpg',
    },
]

export default function CompanyTripsWidget(props: { company: ICompany }  ) {
    const { company } = props;
    return (
        <Box
            sx={{
                width: '100%',
                position: 'relative',
                overflow: { xs: 'auto', sm: 'initial' },
            }}
        >
            <Card
                orientation="horizontal"
                sx={{
                    width: '100%',
                    flexWrap: 'wrap',
                    // make the card resizable for demo
                    maxWidth: '100%',
                }}
            >
                <Typography level="title-lg">
                    Descubre más opciones de viajes
                </Typography>
                <Grid 
                    container 
                    spacing={2}
                    columns={{ xs: 1, sm: 2 }}
                >
                    {trips.map((trip) => (
                        <Grid key={trip.id} xs={1}>
                            <MiniTripWidget trip={trip} />
                        </Grid>
                    ))}
                </Grid>
            </Card>

        </Box>
    );
}