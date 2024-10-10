import styles from './Accordion.module.scss';

type AccordionProps = {
   item: {
      title: string;
      text: string;
   };
   isOpen: string;
   setIsOpen: React.Dispatch<React.SetStateAction<string>>;
};

const Accordion = ({ item, isOpen, setIsOpen }: AccordionProps) => {
   const isActive = isOpen === item.title;

   return (
      <button
         onClick={() => setIsOpen(isActive ? '' : item.title)}
         key={item.title}
         className={styles.item}>
         <div className={styles.itemTextWrapper}>
            <h4
               className={`${styles.itemTitle} ${
                  isActive ? styles.itemActiveTitle : ''
               }`}>
               {item.title}
            </h4>
            <p
               className={`${styles.itemText} ${
                  isActive ? styles.openItemText : ''
               }`}>
               {item.text}
            </p>
            <div className={styles.closeButton}>
               <span />
               <span className={!isActive ? styles.openCloseButton : ''} />
            </div>
         </div>
      </button>
   );
};

export default Accordion;
