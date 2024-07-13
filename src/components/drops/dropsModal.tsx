"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Edit, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddDrop } from "./addDrop";
import { EditDrop } from "./editDrop";

export default function DropsModal({
  drop,
  tokens,
}: {
  drop?: Drop;
  tokens: TokenDetails[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog modal onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {drop ? (
          <Button className="gap-1">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        ) : (
          <Button className="gap-2">
            <Plus />
            New Drop
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {drop ? "Edit" : "Add new"} Drop
            </CardTitle>
          </CardHeader>
          <CardContent>
            {drop ? (
              <EditDrop
                tokens={tokens}
                onClose={() => setOpen(false)}
                drop={drop}
              />
            ) : (
              <AddDrop onClose={() => setOpen(false)} tokens={tokens} />
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
