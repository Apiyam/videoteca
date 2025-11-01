import { ICompany } from "types/interfaces";
import { IConfig } from "types/types";

export const DEFAULT_CONFIG: IConfig = {
    "strongColor": "#0f4671",
    "tertiaryFontColor": "#fff",
    "secondaryFontColor": "#fff",
    "primaryColor": "#0f4671",
    "level1": "#0f4671",
    "level2": "#0f4671",
    "level3": "#0f4671",
  }

export const DEFAULT_COMPANY: ICompany = {
    name: '',
    slogan: '',
    contact: '',
    whatsapp: '',
    email: '',
    description: '',
    logo: '',
    id: 0,
    config: DEFAULT_CONFIG,
    fb: '',
    ig: '',
    tt: '',
    apiyam_url: '',
    metrics: [],
}