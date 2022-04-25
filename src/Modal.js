import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null); // we need this in order to destroy the modal, otherwise we gonna have memory leak if we just open new modals and not destroyng them
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current); // useEffect hook will only run this function when the modal gets closed, this is clean up function, canbe compared with componentWillUnmountOfHooks
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
