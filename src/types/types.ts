export type VideoElement = {
    id?: number;
    created_at: string;
    user: string;
    thumbnail: string;
    element_name: string;
    element_type: number;
    plans: string;
    description: string;
    video_url: string;
    price: number;
    status: number;
    short_description: string;
}

export type VideoCourse = {
    id?: number;
    created_at: string;
    user: string;
    thumbnail: string;
    course_name: string;
    description: string;
    price: number;
    status: number;
    short_description: string;
    videos: VideoElement[];
}

export type Payment = {
    id?: number;
    created_at?: string;
    type: string;
    id_element: number;
    payment_date: string;
    email_billing: string;
    reference: string;
    user: string;
    payment_id: string;
    amount: number;
    status: number;
}


export const DEFAULT_VIDEO_COURSE: VideoCourse = {
    created_at: new Date().toISOString(),
    user: '',
    thumbnail: '/burlesqa.png',
    course_name: '',
    description: '',
    price: 0,
    status: 1,
    short_description: '',
    videos: [],
}

export const DEFAULT_VIDEO_ELEMENT: VideoElement = {
    created_at: new Date().toISOString(),
    user: '',
    thumbnail: '/burlesqa.png',
    element_name: '',
    element_type: 1,
    plans: '',
    description: '',
    video_url: '',
    price: 0,
    status: 1,
    short_description: '',
}


export type Bus = {
    id: number;
    name: string;
    rows: number;
    columns: number;
    seatsPerColumn: number;
};

export type ILocation = {
    id: number;
    name: string;
    street: string;
    phone: string;
    email: string;
    website: string;
    business_id: number;
}

export type IConfig = {
    primaryColor: string;
    level1: string;
    level2: string;
    level3: string;
    secondaryFontColor: string;
    tertiaryFontColor: string;
    strongColor: string;
}

export type ISocial = {
    id: number;
    business_id: number;
    fb: string;
    ig: string;
    tt: string;
    lk: string;
    yt: string;
    other: string;
}

export type IBusinessHours = {
    id: number;
    business_id: number;
    hours: IHour[];
}

export type IHour = {
    day: string;
    hours?: any;
    start: string;
    end: string;
    isOpen: boolean;
}

export type IMetric = {
    id?: number;
    business_id: number;
    description: string;
    metric: string;
}