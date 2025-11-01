export function convertToFriendlyUrl(url: string): string {
    return url
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
        .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales
        .replace(/\s+/g, '-') // Reemplaza espacios con guiones
        .replace(/-+/g, '-') // Evita guiones múltiples
        .trim(); // Elimina espacios al inicio y final
}

export function convertToFormatMoney(value: number): string {
    return value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

export function formatDate(date: string, time: boolean = false, short: boolean = false): string {
    if(time){
        return new Date(date).toLocaleDateString('es-MX', { year: 'numeric', month: short ? 'short' : 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    else{
        return new Date(date).toLocaleDateString('es-MX', { year: 'numeric', month: short ? 'short' : 'long', day: 'numeric' });
    }
}