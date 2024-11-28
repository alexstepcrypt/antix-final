export const stage1Steps = [
   { step: 1, title: 'Confirmation', isCurrent: true },
   { step: 2, title: 'Transaction (Deposits)', isCurrent: false },
   { step: 3, title: 'Success', isCurrent: false }
];

export const stage2Steps = stage1Steps.map(item => ({ ...item, isCurrent: true }));