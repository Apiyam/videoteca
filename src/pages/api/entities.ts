import { useUser } from '@clerk/nextjs';
import { getAll, insertAndReturn, query, queryOne, updateOne } from "./supabase";
import { Payment, VideoElement } from "types/types";

export const createVideoElement = async (videoElement: VideoElement) => {
    const newVideoElement = await insertAndReturn('video_element', videoElement);
    return newVideoElement;
}

export const fetchVideoElements = async () => {
    const videoElements = await query('video_element', 'status', 1);
    return videoElements;
}

export const createPayment = async (payment: Payment) => {
    const newPayment = await insertAndReturn('payments', payment);
    return newPayment;
}

export const fetchClientLeads = async () => {
    const clientLeads = await getAll('get_client_leads');
    return clientLeads?.sort((a:any, b:any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export const updateClientLead = async (clientId: number, payload: any) => {
    const updated = await updateOne('client_lead', clientId , payload);
    return updated;
}

export const fetchChatMessages = async (phoneNumber: string) => {
    const chatMessages = await query('messages', 'user_phone', phoneNumber);
    return chatMessages.sort((a:any, b:any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}


export const fetchSettings = async () => {
    const settings = await queryOne('settings', 'id', '1');
    return settings;
}

export const updateSettings = async ( payload: any) => {
    const updated = await updateOne('settings', 1 , payload);
    return updated;
}