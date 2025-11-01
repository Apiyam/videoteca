import { ILocation, ISocial, IConfig, IHour, IMetric } from "./types"

export interface ICompany {
    "id": number,
    "name": string,
    "logo": string,
    "slogan": string,
    "description": string,
    "fb": string,
    "ig": string,
    "tt": string,
    "whatsapp": string,
    "email": string,
    "contact": string,
    "apiyam_url": string,
    "config": IConfig,
    "metrics": IMetric[]
}

export interface ITrip {
    "id": number,
    "title": string,
    "category": string,
    "image": string,
    "url": string | undefined,
    "company": string | undefined,
    "liked": boolean | undefined,
    "rareFind": boolean | undefined,
    "almostSold": boolean | false,
    "companyName": string | ""
}

export interface IService {
    id: number,
    title: string,
    type: string,
    business_id: number,
    description: string,
    image: string,
    price: number,
    hidePrice: boolean
}


export interface CompanyData {
    id: number,
    apiyamUrl: string;
    name: string,
    logo: string,
    slogan: string,
    description: string,
    whatsapp: string,
    website: string,
    email: string,
    contact: string,
    socials: ISocial,
    services: IService[],
    locations: ILocation[],
    hours: IHour[],
    metrics: IMetric[],
    slides: IImage[],
    config: IConfig
}

export interface IImage {
    id?: number,
    business_id: number,
    image_url: string,
    order: number,
    uploaded?: boolean
}