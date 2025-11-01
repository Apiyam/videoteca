export const BASE_FILE_URL = 'https://peru-hippopotamus-889756.hostingersite.com/';
export const N8N_URL = 'http://localhost:5678/';

export const uploadFile = async (file: File, id: string | number, type: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', id.toString()+Math.random().toString(36).substring(2, 15));
    formData.append('type', type);
    const response = await fetch(BASE_FILE_URL, {
        method: 'POST',
        body: formData
    });
    return response.json();
}

export const returnMainColorScheme = async (image: string) => {
    const formData = new FormData();
    formData.append('image_url', image);
    const response = await fetch(N8N_URL+'webhook/scheme', {
        method: 'POST',
        body: formData
    });
    return response.json();
}


