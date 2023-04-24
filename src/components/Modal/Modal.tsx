import { ReactNode, useEffect, FC } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModal {
  children: ReactNode,
  close?: ()=>void,
};

const Modal: FC<IModal> = ({children, close}) =>{

  const root: HTMLElement|null = document.getElementById("root");

  const escCloseHandler = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      close&&close();
    }
  }

  useEffect(()=>{
    if(close){
      document.addEventListener("keydown", escCloseHandler);
      return () =>{
        document.removeEventListener("keydown", escCloseHandler);
      }
    }
  })

  return createPortal(
    (
      <>
        <ModalOverlay close={close}/>
        <div className={`${styles.contentWrapper} p-10`}>
          {children}
          <button className={styles.closeBtn}>
            <CloseIcon type="primary" onClick={
              ()=>{
                close&&close()
              }
            }/>
          </button>
        </div>
      </>
    ),
    root!
  )
}



export default Modal
