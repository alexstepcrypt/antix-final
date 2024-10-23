import hummer from '/public/svg/token/hummer.svg';
import shop from '/public/svg/token/shop.svg';
import handshake from '/public/svg/token/handshake.svg';
import lines from '/public/svg/token/lines.svg';
import stars from '/public/svg/token/stars.svg';
import subscription from '/public/svg/token/subscription.svg';

export const leftList = [
   {
      title: 'NFT Auction & Promos',
      description: 'Lend or sell avatars and assets. Promote to earn more.',
      icon: hummer.src,
   },
   {
      title: 'Asset Tuning',
      description: 'Upgrade your digital assets — keep them trendy and fresh.',
      icon: stars.src,
   },
];

export const midList = [
   {
      title: 'Subscriptions',
      description: 'Unlock premium tools for digital creation with ANTIX.',
      icon: subscription.src,
   },
   {
      title: 'Marketplace',
      description:
         'Trade and customize your digital assets in the marketplace.',
      icon: shop.src,
   },
];

export const rightList = [
   {
      title: 'Governance',
      description: 'Vote on creators and rewards. Shape the future with ANTIX.',
      icon: handshake.src,
   },
   {
      title: 'Staking',
      description:
         'Stake your tokens and boost your rewards. Higher stake, higher earnings.',
      icon: lines.src,
   },
];

export const mobileList = [
   midList[0],
   rightList[0],
   rightList[1],
   midList[1],
   leftList[1],
   leftList[0],
];
