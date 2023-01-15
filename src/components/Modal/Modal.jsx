import { useEffect } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.css";
import PropTypes from 'prop-types';

const Modal = ({children, close}) =>{

  const root = document.getElementById("root");

  const escCloseHandler = (ev) => {
    if (ev.key === "Escape") {
      close(null);
    }
  }

  useEffect(()=>{
    document.addEventListener("keydown", escCloseHandler);
    return () =>{
      document.addEventListener("keydown", escCloseHandler);
    }
  })

  return createPortal(
    (
      <>
        <ModalOverlay close={close}/>
        <div className={`${styles.contentWrapper} p-10`}>
          {children}
        </div>
      </>
    ),
    root
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal