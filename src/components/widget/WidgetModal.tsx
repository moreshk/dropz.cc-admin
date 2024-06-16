"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Edit, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddWidget } from "./AddWidget";
import { EditWidget } from "./EditWidget";

export default function WidgetModal({
  widgetDetails,
  tokens,
}: {
  widgetDetails?: WidgetDetails;
  tokens: TokenDetails[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog modal onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {widgetDetails ? (
          <Button className="gap-1">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        ) : (
          <Button className="gap-2">
            <Plus />
            New Widget
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {widgetDetails ? "Edit" : "Add new"} Widget
            </CardTitle>
            <CardDescription>
              Add the address it will automatically fetch the details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {widgetDetails ? (
              <EditWidget
                tokens={tokens}
                onClose={() => setOpen(false)}
                widget={widgetDetails}
              />
            ) : (
              <AddWidget onClose={() => setOpen(false)} tokens={tokens} />
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
