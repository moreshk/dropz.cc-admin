import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { cacheImage } from "@/lib/cacheImage";
import { addressShortener } from "@/lib/addressShortener";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { useDebounce } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";
import { FixedSizeList as List } from "react-window";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const WidgetFeeWallet = ({ isLoading }: { isLoading: boolean }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="feeWalletAddress"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Fee Wallet Address</FormLabel>
          <FormControl>
            <Input {...field} disabled={isLoading || field.disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const WidgetWebsiteURL = ({ isLoading }: { isLoading: boolean }) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="website"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Website URL</FormLabel>
          <FormControl>
            <Input {...field} disabled={isLoading || field.disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const WidgetToken = ({
  isLoading,
  tokens,
}: {
  isLoading: boolean;
  tokens: TokenDetails[];
}) => {
  const [open, setOpen] = useState(false);
  const form = useFormContext();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<TokenDetails[]>([]);
  const debouncedSearchTerm = useDebounce(search, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const searchToken = search
        ? (tokens || []).filter((token) => {
            return (
              token.address === search ||
              token.symbol.toLowerCase().includes(search.toLowerCase()) ||
              search.toLowerCase().includes(token.symbol.toLowerCase())
            );
          })
        : tokens || [];
      setResults(searchToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);
  const updatedToken = debouncedSearchTerm ? results : tokens || [];

  return (
    <FormField
      control={form.control}
      name="tokenId"
      render={({ field: { value, onChange } }) => {
        const selectedToken = tokens.find((token) => token.id === value);
        return (
          <FormItem>
            <FormLabel>Token</FormLabel>
            <div>
              <FormControl>
                <Dialog open={open} onOpenChange={setOpen}>
                  <Button
                    type="button"
                    disabled={isLoading}
                    variant="outline"
                    className="w-full text-left h-16 flex justify-between"
                    onClick={() => setOpen(true)}
                  >
                    {selectedToken ? (
                      <div className="flex gap-2 items-center flex-1">
                        <img
                          src={cacheImage(selectedToken.imageUrl)}
                          alt="log"
                          className="w-9 h-9 rounded-full"
                        />
                        <div>
                          <div>{selectedToken.symbol}</div>
                          <div className="text-xs opacity-60">
                            {addressShortener(selectedToken.address)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      "Select Token"
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                  <DialogContent className="p-6">
                    <DialogHeader>
                      <DialogTitle>Select Token</DialogTitle>
                    </DialogHeader>
                    <div className="px-3 flex items-center gap-2 border rounded-lg">
                      <Search />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by token or paste address"
                        className="flex h-10 w-full rounded-md bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none"
                      />
                    </div>
                    <List
                      height={350}
                      itemCount={updatedToken.length}
                      itemSize={65}
                      layout="vertical"
                      width={465}
                      itemData={updatedToken}
                    >
                      {({ data, index, style }) => {
                        const token = data[index];
                        return (
                          <div
                            style={style}
                            onClick={() => {
                              onChange(token.id === value ? "" : token.id);
                              setOpen(false);
                            }}
                          >
                            <div
                              className={`flex gap-2 items-center flex-1 cursor-pointer p-2 rounded-xl w-full justify-between hover:bg-secondary hover:border border  ${
                                value === token.id
                                  ? "bg-secondary"
                                  : "border-transparent"
                              }`}
                            >
                              <div className="flex gap-2 items-center flex-1 w-full">
                                <img
                                  src={cacheImage(token.imageUrl)}
                                  alt="logo"
                                  className="w-9 h-9 rounded-full"
                                />
                                <div>
                                  <div>{token.symbol}</div>
                                  <div className="text-xs opacity-60">
                                    {addressShortener(token.address)}
                                  </div>
                                </div>
                              </div>
                              <Check
                                className={cn(
                                  "mr-1 h-7 w-7 p-1.5",
                                  value === token.id
                                    ? "opacity-100 bg-primary text-white rounded-full"
                                    : "opacity-0"
                                )}
                              />
                            </div>
                          </div>
                        );
                      }}
                    </List>
                  </DialogContent>
                </Dialog>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
