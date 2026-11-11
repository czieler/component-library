import { useEffect, useId, useRef } from "react";
import type { DialogHTMLAttributes } from "react";
import { Button } from "./Button";

export type ConfirmationDialogProps = Omit<DialogHTMLAttributes<HTMLDialogElement>, "children" | "open" | "title"> & {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  denyText?: string;
  onConfirm?: () => void;
  onDeny?: () => void;
};

export function ConfirmationDialog({
  open,
  title = "Are you sure?",
  message = "",
  confirmText = "Yes",
  denyText = "No",
  onConfirm,
  onDeny,
  className = "",
  onClose,
  ...props
}: ConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();
  const titleId = `${id}-title`;
  const messageId = `${id}-message`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const runAction = (action: (() => void) | undefined, returnValue: string) => {
    try {
      action?.();
    } finally {
      dialogRef.current?.close(returnValue);
    }
  };

  return (
    <dialog
      {...props}
      ref={dialogRef}
      className={["confirmation-dialog", className].filter(Boolean).join(" ")}
      aria-labelledby={titleId}
      aria-describedby={messageId}
      onClose={onClose}
    >
      <div className="confirmation-dialog__content">
        <h2 id={titleId} className="confirmation-dialog__title">{title}</h2>
        <p id={messageId} className="confirmation-dialog__message">{message}</p>
        <div className="confirmation-dialog__actions">
          <Button variant="outline" autoFocus onClick={() => runAction(onDeny, "deny")}>{denyText}</Button>
          <Button variant="primary" onClick={() => runAction(onConfirm, "confirm")}>{confirmText}</Button>
        </div>
      </div>
    </dialog>
  );
}
