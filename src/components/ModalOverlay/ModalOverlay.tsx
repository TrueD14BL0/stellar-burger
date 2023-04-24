import styles from './ModalOverlay.module.css'
import { FC } from "react";

interface IModalOverlay {
  close?: ()=>void,
};

const ModalOverlay: FC<IModalOverlay> = ({close}) => {
  return (
    <div className={styles.overlay} onClick={()=>{
      close&&close()
    }}/>
  )
}

export default ModalOverlay;
