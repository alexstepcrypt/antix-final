import type { IconWithControlledSize } from '@/types/Icon';

export const InfoIcon = ({
   color = '#F0F0F0',
   height = 21,
   width = 20,
}: IconWithControlledSize) => {
   return (
      <svg
         width={width}
         height={height}
         viewBox="0 0 20 21"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <rect y="0.587891" width="20" height="20" rx="10" fill="#575757" />
         <path
            d="M9.744 7.47238C9.536 7.47238 9.36 7.40037 9.216 7.25637C9.072 7.11237 9 6.93638 9 6.72837C9 6.52038 9.072 6.34438 9.216 6.20038C9.36 6.05638 9.536 5.98438 9.744 5.98438C9.944 5.98438 10.112 6.05638 10.248 6.20038C10.392 6.34438 10.464 6.52038 10.464 6.72837C10.464 6.93638 10.392 7.11237 10.248 7.25637C10.112 7.40037 9.944 7.47238 9.744 7.47238ZM10.272 8.54038V15.1164H9.18V8.54038H10.272Z"
            fill={color}
         />
      </svg>
   );
};
