import useSWR from "swr";
import { useWindowSize, useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { cacheImage } from "@/lib/cacheImage";
import { addressShortener } from "@/lib/addressShortener";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import TokenModal from "@/components/token/TokenModal";
import { DeleteToken } from "@/components/token/DeleteToken";
import { PopulateButton } from "@/components/token/PopulateButton";

export const Token = () => {
  const { width, height } = useWindowSize();
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 300);
  const [results, setResults] = useState<TokenDetails[]>([]);
  const { data, isLoading } = useSWR<{ tokens: TokenDetails[] }>("/token");

  useEffect(() => {
    if (debouncedSearchTerm) {
      const searchToken = search
        ? (data?.tokens || []).filter((token) => {
            return (
              token.address === search ||
              token.symbol.toLowerCase().includes(search.toLowerCase()) ||
              search.toLowerCase().includes(token.symbol.toLowerCase())
            );
          })
        : data?.tokens || [];
      setResults(searchToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  if (isLoading && !data) {
    return <div>Loading...</div>;
  }
  const updatedToken = debouncedSearchTerm ? results : data?.tokens || [];
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Token List</p>
        <div className="flex gap-3 items-center">
          <div className="px-3 flex items-center gap-2 border rounded-lg">
            <Search />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by token or paste address"
              className="flex h-10 w-full rounded-md bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none"
            />
          </div>
          <PopulateButton />
          <TokenModal />
        </div>
      </div>
      <Card className="p-4 w-full mt-4">
        <List
          height={height ? height - 200 : 350}
          itemCount={updatedToken.length}
          itemSize={65}
          layout="vertical"
          width={width ? width - 350 : 350}
          className="no-scrollbar"
          itemData={updatedToken}
        >
          {({ data, index, style }) => {
            const token = data[index];
            return (
              <div style={style}>
                <div
                  className="flex items-center justify-between my-2 rounded-2xl p-2 cursor-pointer w-full  hover:bg-secondary group"
                  key={token.id}
                >
                  <div className="w-full">
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
                        <p className="text-xs text-left opacity-40">
                          {token.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="group-hover:block hidden">
                    <div className="flex gap-2">
                      <TokenModal editToken={token} />
                      <DeleteToken token={token} />
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </List>
      </Card>
    </div>
  );
};
