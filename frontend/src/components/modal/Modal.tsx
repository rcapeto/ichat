import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";
import { ModalActions, ModalProps } from "./types";

function ModalComponent(props: ModalProps, ref: ForwardedRef<ModalActions>) {
  const {
    title = "Modal Title",
    withCloseButton = true,
    description = "",
    actionButtonText = "",
    cancelButtonText = "",
    onCancel,
    onActionClick,
    footerButtons = [],
    withOverlay = false,
    Component,
    passProps,
  } = props;

  const [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }

  useImperativeHandle(ref, () => ({
    closeModal,
    showModal: () => setOpen(true),
  }));

  const renderFooter = Boolean(
    actionButtonText || cancelButtonText || footerButtons.length > 0
  );

  return (
    <AlertDialog open={open}>
      {withOverlay && <AlertDialogOverlay />}
      <AlertDialogContent className="flex flex-col max-h-[70vh]">
        <AlertDialogHeader className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <AlertDialogTitle>{title}</AlertDialogTitle>

            {withCloseButton && (
              <Button size="icon" variant="outline" onClick={closeModal}>
                <Cross2Icon />
              </Button>
            )}
          </div>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {Component && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <Component {...(passProps ?? {})} />
          </div>
        )}

        {}

        {renderFooter && (
          <AlertDialogFooter className="mt-top">
            {(actionButtonText || cancelButtonText) && (
              <>
                {cancelButtonText && (
                  <AlertDialogCancel onClick={onCancel ?? closeModal}>
                    {cancelButtonText}
                  </AlertDialogCancel>
                )}

                {actionButtonText && (
                  <AlertDialogAction onClick={onActionClick}>
                    {actionButtonText}
                  </AlertDialogAction>
                )}
              </>
            )}

            {footerButtons.map((button, index) => (
              <Button {...button} key={`footer-button-${index}`} />
            ))}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const Modal = forwardRef(ModalComponent);
