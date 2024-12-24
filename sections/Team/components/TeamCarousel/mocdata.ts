import { StaticImageData } from 'next/image';

export type teamItemsTextType = {
   name: string;
   role: string;
   description: string[];
}

export type teamItemType = {
   role: string;
   name: string;
   socialLink: string;
   image: StaticImageData;
   description: string[];
};

export interface teamItemsProps {
   data: teamItemType[];
}
