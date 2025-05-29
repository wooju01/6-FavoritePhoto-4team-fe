"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useAlertModal } from "@/providers/AlertModalProvider";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function BodyClickHandler({ children }) {
  const { user, isLoading } = useAuth();
  const { openModal, isOpen: isAlertModalOpen } = useAlertModal();
  const router = useRouter();

  const handleBodyClick = useCallback(
    (event) => {
      if (isLoading || user || isAlertModalOpen) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      openModal("로그인", {}, () => {
        router.push("/login");
      });
    },
    [user, isLoading, openModal, router, isAlertModalOpen]
  );

  return <div onClickCapture={handleBodyClick}>{children}</div>;
}
