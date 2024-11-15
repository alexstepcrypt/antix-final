import styles from "./BurgerButton.module.scss";

export const BurgerButton = (props: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  const { isOpen = false, onClick } = props;

  return (
    <button
      className={`${styles.wrapper} ${isOpen ? styles.isOpen : null}`}
      onClick={onClick}
    >
      <div />
      <div />
      <div />
    </button>
  );
};
