import React from "react";
import { Card, CardContent, Typography, Box, Table } from "@mui/joy";
import { useAppContext } from "AppContext";

const HoursWidget = () => {
  const { companyData } = useAppContext();
  console.log(companyData.hours);
  return (
    <Card variant="outlined" sx={{ mb: 2, width: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Table>
            <tbody>
              {companyData?.hours?.[0]?.hours.map((item, index) => (
                <tr key={index}>
                  <td width="25%">
                    <Typography>{item.day}</Typography>
                  </td>
                  <td>
                    <Typography>{item.isOpen ? item.start + " - " + item.end : "Cerrado"}</Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HoursWidget;