import { useEffect, useState } from 'react';
import {
  Card, Box, Typography, Divider, Stack,
  CardOverflow, CardActions, Button, Input, 
  Checkbox,
  FormLabel,
  FormControl
} from '@mui/joy';
import { IMetric } from 'types/types';
import { useBusiness } from 'hooks/useBusiness';
import { insertAndReturn, updateOne } from 'pages/api/supabase';

const defaultMetrics: IMetric[] = [
  {  metric: '', description: '', business_id: 0, id: 0 },
  {  metric: '', description: '', business_id: 0, id: 0 },
  {  metric: '', description: '', business_id: 0, id: 0 },
];

function MetricsBusiness() {
  const { business, metrics } = useBusiness();
  const [isSaving, setIsSaving] = useState(false);
  const [metricsData, setMetricsData] = useState<IMetric[]>(defaultMetrics);
  useEffect(() => {
    setMetricsData(metrics || defaultMetrics);
  }, [metrics]);

  const handleChange = (index: number, field: keyof IMetric, value: string | boolean) => {
    const updated = [...metricsData];
    updated[index][field] = value as never;
    setMetricsData(updated);
  };

  const updateBusinessMetricsData = async () => {
    setIsSaving(true);
    for(const metric of metricsData){
      if(metric.id){
        await updateOne('metric', metric.id, metric);
      }else{
        metric.business_id = business?.id || 0;
        await insertAndReturn('metric', metric);
      }
    }
    setIsSaving(false);
  }
  return (
<Card>
      <Box sx={{ mb: 1 }}>
        <Typography level="title-md">Métricas de tu negocio</Typography>
        <Typography level="body-sm">Agrega las métricas de tu negocio para que los clientes puedan conocerte mejor.</Typography>
      </Box>
      <Divider />
      <Stack spacing={2} sx={{ my: 1 }}>
        
      <Stack spacing={2} sx={{ my: 1 }} direction="row">
      {metricsData.map((metric, index) => (
        <Card key={index} sx={{ width: '33%' }}>
          <FormControl>
            <FormLabel>Métrica</FormLabel>
            <Input placeholder="+10" value={metric.metric} onChange={(e) => handleChange(index, 'metric', e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Descripción</FormLabel>
            <Input placeholder="clientes satisfechos" value={metric.description} onChange={(e) => handleChange(index, 'description', e.target.value)} />
          </FormControl>
        </Card>
      ))}
    </Stack>
      </Stack>
      <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
          <Button size="sm" variant="solid" onClick={updateBusinessMetricsData} disabled={isSaving}>
            {isSaving ? 'Guardando cambios...' : 'Guardar cambios'}
          </Button>
        </CardActions>
      </CardOverflow>
    </Card>


    
  );
}

export default MetricsBusiness;