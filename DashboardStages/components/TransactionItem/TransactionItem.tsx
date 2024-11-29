import s from './TransactionItem.module.scss';
import Image from 'next/image';
import { formatCrypto } from '@/utils/utils';

import vesting_antix from '/public/svg/vantix-icon.svg';
import TetherIcon from "/public/svg/tether-icon.svg";
import BNBIcon from "/public/svg/bnb-icon.svg";
import USDCIcon from "/public/svg/usdc-icon.svg";
import ETHIcon from "/public/svg/ether-icon.svg";

const tokensIcons:any = {
   BNB  : BNBIcon,
   USDT : TetherIcon,
   USDC : USDCIcon,
   ETH  : ETHIcon
}
const tokensSymbols:any = {
   '1_0x0000000000000000000000000000000000000000':'ETH',
   '1_0xdac17f958d2ee523a2206206994597c13d831ec7':'USDT',
   '1_0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48':'USDC',
   '56_0x0000000000000000000000000000000000000000':'BNB',
   '56_0x55d398326f99059ff775485246999027b3197955':'USDT',
   '56_0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d':'USDC'
}


function getTokenSymbol(chainId:number, address:string){
   return tokensSymbols[chainId+'_'+address.toLowerCase()]
}
function getTokenIcon(chainId:number, token:string){
   return tokensIcons[getTokenSymbol(chainId, token)]
}


const explorerUrls: {[key: number]: string} = {
	1  : 'https://etherscan.io',
	56 : 'https://bscscan.com'
}

export const TransactionItem = ({tx}:{tx:any}) => {
   const tokenSymbol = getTokenSymbol(tx.chainId, tx.token)
   const tokenIcon = tokensIcons[tokenSymbol]

   let received = tx.vAntix
   if (!received || received === '0' || received === '-') received = 0

   return (
      <ul
         className={s.transaction}
      >
         <li>{new Date(tx.createdAt).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</li>
         <li>{tx.type}</li>
         <li>
               <Image
                  src={tokenIcon}
                  alt="amount-icon"
                  width={24}
                  height={24}
               />
               <p>
                  {formatCrypto(tx.amount)}
                  {" "}
                  {tokenSymbol}
               </p>
         </li>
         <li>{!!received && <>
            <Image
               src={vesting_antix}
               alt="vesting-antix"
               width={24}
               height={24}
               className={s.vestingAntix}
            />
            {formatCrypto(received)} vAntix
         </>}</li>
         <li>
            Deposit Stage #{tx.stage}
         </li>
         <li>
            <a href={explorerUrls[tx.chainId] + '/tx/' + tx.hash} className={s.address} target="_blank" rel="noreferrer, noopener">View Transaction</a>
         </li>
      </ul>
   );
};
