import hummer from '/public/svg/token/hummer.svg';
import shop from '/public/svg/token/shop.svg';
import handshake from '/public/svg/token/handshake.svg';
import lines from '/public/svg/token/lines.svg';
import stars from '/public/svg/token/stars.svg';
import subscription from '/public/svg/token/subscription.svg';

export type listTextType = {
   title: string;
   description: string;
};

export const leftList = [ hummer.src, stars.src ];
export const midList = [ subscription.src, shop.src ];
export const rightList = [ handshake.src, lines.src ];

export const mobileList = [
   midList[0],
   rightList[0],
   rightList[1],
   midList[1],
   leftList[1],
   leftList[0],
];
