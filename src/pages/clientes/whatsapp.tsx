import ApiyamCardLayout from './components/ApiyamLayout';
import WhatsAppBot from './components/WhatsAppBot';

export default function WhatsAppBotPage() {
    return (
        <ApiyamCardLayout title="Conversaciones de WhatsApp">
            <WhatsAppBot />
        </ApiyamCardLayout>
    );
}