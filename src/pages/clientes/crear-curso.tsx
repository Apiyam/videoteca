import ApiyamCardLayout from './components/ApiyamLayout';
import VideoElementForm from './components/VideoElementForm';

export default function CreateNewVideoElement() {
    return (
        <ApiyamCardLayout title="Crea un nuevo elemento de videoteca">
            <VideoElementForm />
        </ApiyamCardLayout>
    );
}