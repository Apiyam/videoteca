import { Typography } from '@mui/joy';
import ApiyamCardLayout from './components/ApiyamLayout';
import MyStats from './components/MyStats';
import { useUser } from '@clerk/nextjs';

export default function DashboardPage() {
    return (
        <ApiyamCardLayout title={`Bienvenida - Administración Burlesqa`}>
            <Typography level="title-sm">Estadísticas de tus videos</Typography>
            <MyStats />
        </ApiyamCardLayout>
    );
}