import { useEffect, useRef } from "react";

const activeLocks = new Set<symbol>();
let previousOverflow = "";

const syncBodyOverflow = () => {
  if (typeof document === "undefined") return;

  if (activeLocks.size > 0) {
    if (!previousOverflow) {
      previousOverflow = document.body.style.overflow;
    }
    document.body.style.overflow = "hidden";
    return;
  }

  document.body.style.overflow = previousOverflow;
  previousOverflow = "";
};

export const useBodyScrollLock = (locked: boolean) => {
  const lockId = useRef(Symbol("body-scroll-lock"));

  useEffect(() => {
    const id = lockId.current;

    if (locked) {
      activeLocks.add(id);
      syncBodyOverflow();
    }

    return () => {
      activeLocks.delete(id);
      syncBodyOverflow();
    };
  }, [locked]);
};
