import glow from '@/public/images/token-glow.png';
import { TokenHead } from './components/TokenHead/TokenHead';
import { TokenBody } from './components/TokenBody/TokenBody';
import s from './AntixToken.module.scss';

const AntixToken = () => {
   return (
      <div style={{ backgroundImage: `url(${glow.src})` }} className={s.wrapper} id='Token'>
         <div id="ANTIXTokens">
            <TokenHead />
            <TokenBody />
         </div>
      </div>
   );
};

export default AntixToken;
