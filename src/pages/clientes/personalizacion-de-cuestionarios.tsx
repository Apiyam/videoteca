import { useState } from 'react';
import ApiyamCardLayout from './components/ApiyamLayout';
import FormBuilder from './components/FormBuilder';
import MyForms from './components/MyForms';

export default function PersonalizationPage() {
    return (
        <ApiyamCardLayout title="Personalización de cuestionarios">
            <MyForms />
        </ApiyamCardLayout>
    );
}