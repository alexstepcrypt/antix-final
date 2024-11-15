export interface Icon {
   size?: number;
   color?: string;
}

export interface IconWithControlledSize extends Pick<Icon, 'color'> {
   width?: number;
   height?: number
}