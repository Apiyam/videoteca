import { useState } from 'react';
import ApiyamCardLayout from './components/ApiyamLayout';
import FormBuilder from './components/FormBuilder';

export default function ServiceQualityPage() {
    const [fields, setFields] = useState<any[]>([]);
    return (
        <ApiyamCardLayout title="Cuestionario de calidad de servicio">
            <FormBuilder onChange={setFields} />
        </ApiyamCardLayout>
    );
}