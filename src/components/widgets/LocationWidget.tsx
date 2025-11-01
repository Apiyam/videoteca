import React from "react";
import { Card, CardContent, Typography, Divider, ListItemButton, ListItem, List, Box, Table } from "@mui/joy";
import { MapsHomeWork } from "@mui/icons-material";
import { listPalette } from "utils/configs";
import { ILocation } from "types/types";
import { useAppContext } from "AppContext";

const LocationItem = ({ item, index }: { item: ILocation, index: number }) => {
  return (
    <ListItem nested key={index} sx={{ paddingLeft: '30px' }}>
      <ListItem component="div" startAction={<MapsHomeWork sx={{ color: 'var(--joy-palette-text-secondary)' }} />}></ListItem>
      <List sx={{ '--List-gap': '10px' }}>
        <ListItem>
          <ListItemButton sx={{ cursor: 'default' }}>
            <Card variant="outlined" sx={{ mb: 2, width: '100%' }}>
              <CardContent>
              <Typography level="h4">
                {item.name}
              </Typography>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                 <Table>
                  <tbody>
                  <tr>
                    <td width="25%">
                      <Typography>Dirección</Typography>
                    </td>
                    <td>
                      <Typography>{item.street}</Typography>
                    </td>
                  </tr>
                  <tr>
                    
                    <td>
                      <Typography>Teléfono</Typography>
                    </td>
                    <td>
                      <Typography>{item.phone}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td><Typography>Email</Typography></td>
                    <td>
                      <Typography>{item.email}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td><Typography>Página Web</Typography></td>
                    <td>
                      <Typography>{item.website}</Typography>
                    </td>
                  </tr>
                  </tbody>
                 </Table>
                </Box>
              </CardContent>
            </Card>
          </ListItemButton>
        </ListItem>
      </List>
    </ListItem>
  )
}

const ItineraryWidget = () => {
  const { companyData } = useAppContext();
  return (
    <List size="sm" sx={(theme) => listPalette(theme)}>
      {
        companyData.locations.map((item, index) => <LocationItem item={item} index={index} key={index} />)
      }
    </List>
  );
};

export default ItineraryWidget;