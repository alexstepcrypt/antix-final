import tether from '/public/dashboard/svg/tether.svg';
import bnb from '/public/svg/bnb-icon.svg';
import usdc from '/public/svg/usdc-icon.svg';
export interface Transaction {
   id: number;
   date: string;
   type: string;
   amount: {
      icon: any;
      amount: number;
      currency: string
   };
   received: number;
   stage: string;
   transactionLink: string;
}

export const mocTransactions: Transaction[] = [
   {
      id: 1,
      date: '10.07.2024 15:39',
      type: 'Deposit',
      amount: { icon: tether, amount: 400, currency: "ETH" },
      received: 0,
      stage: 'Deposit Stage',
      transactionLink: '',
   },
   {
      id: 2,
      date: '11.07.2024 10:45',
      type: 'Buy',
      amount: { icon: bnb, amount: 200, currency: "BNB" },
      received: 1234.567,
      stage: 'Stage #1',
      transactionLink: '',
   },
   {
      id: 3,
      date: '12.07.2024 14:20',
      type: 'Deposit + Buy',
      amount: { icon: usdc, amount: 150, currency: "USDC" },
      received: 2000.000,
      stage: 'Deposit + Stage #1',
      transactionLink: '',
   },
];
