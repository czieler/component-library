import { useState } from "react";
import { Button } from "../components/Button";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { ImplementationDetails } from "./ImplementationDetails";

const usageExample = `import { useState } from "react";
import { Button, ConfirmationDialog } from "@czieler/ui-react";
import "@czieler/ui-react/styles.css";

export function DeleteAction() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setIsOpen(true)}>
        Delete item
      </Button>
      <ConfirmationDialog
        open={isOpen}
        title="Delete this item?"
        message="This action cannot be undone."
        confirmText="Delete"
        denyText="Keep item"
        onConfirm={() => deleteItem()}
        onDeny={() => console.log("Deletion canceled")}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}`;

export function ConfirmationDialogDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState("Choose an action to see its callback result.");

  return <>
    <div className="section-heading">
      <p className="eyebrow">Actions</p>
      <h2>Confirmation Dialog</h2>
      <p className="lede">Ask users to confirm or deny an action before continuing.</p>
    </div>
    <div className="component-showcase">
      <section className="demo-section">
        <Button variant="danger" onClick={() => setIsOpen(true)}>Delete item</Button>
        <p aria-live="polite">{result}</p>
        <ConfirmationDialog
          open={isOpen}
          title="Delete this item?"
          message="This action cannot be undone. Do you want to continue?"
          confirmText="Delete"
          denyText="Keep item"
          onConfirm={() => setResult("Confirm callback: item deleted.")}
          onDeny={() => setResult("Deny callback: item kept.")}
          onClose={(event) => {
            setIsOpen(false);
            if (!event.currentTarget.returnValue) {
              setResult("Dialog dismissed without choosing an action.");
            }
          }}
        />
        <ImplementationDetails>
          <p>Open the dialog with the trigger. Confirm, deny, and Escape each close it; the callbacks report the selected action.</p>
        </ImplementationDetails>
        <div className="confirmation-dialog-demo__example">
          <h3>Use in a React application</h3>
          <pre className="confirmation-dialog-demo__code"><code>{usageExample}</code></pre>
        </div>
      </section>
    </div>
  </>;
}
