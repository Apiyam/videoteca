import ApiyamCardLayout from './components/ApiyamLayout';
import MyLocations from './components/MyLocations';
import MyProductsAndServices from './components/MyCourses';

export default function LocationsPage() {
    return (
        <ApiyamCardLayout title="Ubicaciones">
            <MyLocations />
        </ApiyamCardLayout>
    );
}