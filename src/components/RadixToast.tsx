"use client";

import { useState } from "react";
import { Button } from "@radix-ui/themes";
import * as Toast from "@radix-ui/react-toast";

export default function RadixToast() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Toast.Provider>
        <Button onClick={() => setOpen(true)}>Mostrar Notificação</Button>
        <Toast.Root open={open} onOpenChange={setOpen}>
          <Toast.Title>Sucesso!</Toast.Title>
          <Toast.Description>Seu arquivo foi salvo com sucesso.</Toast.Description>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    </>
  );
}
