import React from "react";
import { Card, CardContent, Typography, Divider, ListItemButton, ListItem, List } from "@mui/joy";
import { DateRange } from "@mui/icons-material";
import { listPalette } from "utils/configs";

const itinerary = [
  { 
    date: "Primer día: 8AM", 
    title: "Llegada a Angangueo, Michoacán", 
    description: "Llegada al pueblo mágico de Angangueo. Check-in en el hotel y recorrido por el centro histórico del pueblo minero." 
  },
  { 
    date: "Segundo día: 10AM", 
    title: "Santuario El Rosario", 
    description: "Visita al Santuario El Rosario, el más grande de la Reserva. Caminata guiada para observar millones de mariposas monarca en su hábitat natural. Incluye explicación sobre su ciclo de vida y migración." 
  },
  { 
    date: "Tercer día: 12PM", 
    title: "Santuario Sierra Chincua", 
    description: "Recorrido por el Santuario Sierra Chincua. Actividades de senderismo, cabalgata opcional y sesión fotográfica con las mariposas. Tarde libre para artesanías locales." 
  },
  { 
    date: "Cuarto día: 2PM", 
    title: "Regreso", 
    description: "Desayuno típico michoacano, últimas compras de artesanías y check-out del hotel para el regreso." 
  },
];


const ItineraryItem = ({ item, index }: { item: any, index: number }) => {
  return (
    <ListItem nested key={index}>
      <ListItem component="div" startAction={<DateRange />}>
        <Typography level="h4">
          {item.date}
        </Typography>
      </ListItem>
      <List sx={{ '--List-gap': '0px' }}>
        <ListItem>
          <ListItemButton sx={{ cursor: 'default' }}>
            <Card variant="outlined" sx={{ mb: 2, width: '100%' }}>
              <CardContent>
                <Typography level="h4">{item.title}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography level="body-sm">{item.description}</Typography>
              </CardContent>
            </Card>
          </ListItemButton>
        </ListItem>
      </List>
    </ListItem>
  )
}

const ItineraryWidget = () => {
  return (
    <List size="sm" sx={(theme) => listPalette(theme)}>
      {
        itinerary.map((item, index) => <ItineraryItem item={item} index={index} />)
      }
    </List>
  );
};

export default ItineraryWidget;