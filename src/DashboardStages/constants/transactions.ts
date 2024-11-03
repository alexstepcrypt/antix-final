import tether from '/public/dashboard/svg/tether.svg';
import antix_currency from '/public/dashboard/svg/antix_currency.svg';
import pending from '/public/dashboard/svg/pending.svg';
import success from '/public/dashboard/svg/success.svg';
import failed from '/public/dashboard/svg/failed.svg';
import type { Transaction } from '../components/Transactions/Transactions';

export const mocTransactions: Transaction[] = [
   {
      id: 1,
      date: '10.07.2024 15:39:45 UTC',
      type: 'Deposit',
      amount: { currency: tether, text: '100 USDT' },
      status: { icon: pending, text: 'Pending' },
      details: 'You’ve purchased 1000 ANTIX for – 100 USDT',
      address: '0x031…27b',
   },
   {
      id: 2,
      date: '05.01.2024 11:19:05 UTC',
      type: 'Withdraw',
      amount: { currency: tether, text: '40 USDT' },
      status: { icon: success, text: 'Success' },
      details: 'You’ve purchased 1000 ANTIX for – 100 USDT',
      address: '0x031…27b',
   },
   {
      id: 3,
      date: '14.11.2023 21:13:14 UTC',
      type: 'Token purchase',
      amount: { currency: antix_currency, text: '100 ANTIX' },
      status: { icon: failed, text: 'Failed' },
      details: null,
      address: '0x031…27b',
   },
   {
      id: 4,
      date: '10.07.2024 15:39:45 UTC',
      type: 'Deposit',
      amount: { currency: tether, text: '100 USDT' },
      status: { icon: pending, text: 'Pending' },
      details: 'You’ve purchased 1000 ANTIX for – 100 USDT',
      address: '0x031…27b',
   },
   {
      id: 5,
      date: '10.07.2024 15:39:45 UTC',
      type: 'Deposit',
      amount: { currency: tether, text: '100 USDT' },
      status: { icon: pending, text: 'Pending' },
      details: null,
      address: '0x031…27b',
   },
   {
      id: 6,
      date: '05.01.2024 11:19:05 UTC',
      type: 'Withdraw',
      amount: { currency: tether, text: '40 USDT' },
      status: { icon: success, text: 'Success' },
      details: null,
      address: '0x031…27b',
   }
];
