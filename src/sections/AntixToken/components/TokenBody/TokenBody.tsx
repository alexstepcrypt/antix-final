import bg from '@/public/svg/token/bg.svg';
import hummer from '@/public/svg/token/hummer.svg';
import shop from '@/public/svg/token/shop.svg';
import handshake from '@/public/svg/token/handshake.svg';
import lines from '@/public/svg/token/lines.svg';
import stars from '@/public/svg/token/stars.svg';
import subscription from '@/public/svg/token/subscription.svg';
import { TokenCard } from '../TokenCard/TokenCard';
import s from './TokenBody.module.scss';

const leftList = [
   {
      title: 'NFT Auction & Promos',
      description: 'Lend or sell avatars and assets. Promote to earn more.',
      icon: hummer.src,
   },
   {
      title: 'Asset Tuning',
      description: 'Upgrade your digital assets —keep them trendy and fresh.',
      icon: stars.src,
   },
];

const midList = [
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

const rightList = [
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

export const TokenBody = () => {
   return (
      <div
         style={{ backgroundImage: `url(${bg.src})` }}
         className={s.container}>
         <div className={s.left}>
            {leftList.map((item, i) => <TokenCard key={i} {...item} />)}
         </div>
         <div className={s.middle}>
            {midList.map((item, i) => <TokenCard key={i} {...item} />)}
         </div>
         <div className={s.right}>
            {rightList.map((item, i) => <TokenCard key={i} {...item} />)}
         </div>
      </div>
   );
};
