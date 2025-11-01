import { Box, Card } from '@mui/joy';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Ene', ventas: 400 },
  { name: 'Feb', ventas: 300 },
  { name: 'Mar', ventas: 500 },
  { name: 'Abr', ventas: 200 },
];

export default function MyStats() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
    <Card variant="outlined" sx={{height: 300, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="ventas" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
      
    </Card>
    <PieChartExample />
    </Box>

  );
}



const datas = [
  { name: 'Ventas Online', value: 400 },
  { name: 'Ventas Tienda', value: 300 },
  { name: 'Mayoristas', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
function PieChartExample() {
  return (
    <Card variant="outlined" sx={{ height: 300, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={datas}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {datas.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}