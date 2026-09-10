"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CanvasMenuContextValue = {
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};

const CanvasMenuContext = createContext<CanvasMenuContextValue | null>(null);

function setMenuVisible(visible: boolean) {
  document.documentElement.classList.toggle("menu-visible", visible);
}

export function CanvasMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openMenu = useCallback(() => {
    setOpen(true);
    setMenuVisible(true);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setMenuVisible(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen((current) => {
      const next = !current;
      setMenuVisible(next);
      return next;
    });
  }, []);

  useEffect(() => {
    return () => setMenuVisible(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeMenu]);

  const value = useMemo(
    () => ({ open, openMenu, closeMenu, toggleMenu }),
    [open, openMenu, closeMenu, toggleMenu],
  );

  return (
    <CanvasMenuContext.Provider value={value}>{children}</CanvasMenuContext.Provider>
  );
}

export function useCanvasMenu() {
  const context = useContext(CanvasMenuContext);
  if (!context) {
    throw new Error("useCanvasMenu must be used within CanvasMenuProvider");
  }
  return context;
}
