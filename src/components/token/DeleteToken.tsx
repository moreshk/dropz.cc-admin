import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { addressShortener } from "@/lib/addressShortener";
import { axios } from "@/lib/axios";
import { cacheImage } from "@/lib/cacheImage";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export function DeleteToken({ token }: { token: TokenDetails }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const deleteToken = async () => {
    try {
      setIsLoading(true);
      await axios.post("/token/delete", {
        id: token.id,
      });
      toast("Token Deleted");
      mutate("/token");
      setOpen(false);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast("Something went wrong");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="gap-1">
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Token</AlertDialogTitle>
          <div className="flex items-center justify-between my-2 rounded-2xl p-2 cursor-pointer w-full  bg-secondary group">
            <div className="flex gap-2 items-center">
              <img
                src={cacheImage(token.imageUrl)}
                alt="logo"
                className="w-9 h-9 rounded-full"
              />
              <div>
                <div className="flex gap-1 items-center">
                  <div>{token.symbol}</div>
                  <p className="text-xs opacity-60 bg-secondary px-1 py-0.5 rounded-md flex justify-center items-center gap-2">
                    {addressShortener(token.address)}
                  </p>
                </div>
                <p className="text-xs text-left opacity-40">{token.name}</p>
              </div>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button
            disabled={isLoading}
            variant="destructive"
            onClick={deleteToken}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
