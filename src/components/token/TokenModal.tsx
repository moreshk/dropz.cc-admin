"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { AddToken } from "./AddToken";
import { Edit, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditToken } from "./EditToken";

export default function TokenModal({
  editToken,
}: {
  editToken?: TokenDetails;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog modal onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {editToken ? (
          <Button className="gap-1">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        ) : (
          <Button className="gap-2">
            <Plus />
            New Token
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {editToken ? "Edit" : "Add new"} Token
            </CardTitle>
            <CardDescription>
              Add the address it will automatically fetch the details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {editToken ? (
              <EditToken editToken={editToken} onClose={() => setOpen(false)} />
            ) : (
              <AddToken onClose={() => setOpen(false)} />
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
