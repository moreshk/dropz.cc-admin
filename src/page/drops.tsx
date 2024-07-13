import { DeleteDrop } from "@/components/drops/DeleteDrop";
import DropsModal from "@/components/drops/dropsModal";
import { addressShortener } from "@/lib/addressShortener";
import { cacheImage } from "@/lib/cacheImage";
import { ExternalLink } from "lucide-react";
import useSWR from "swr";

export const Drops = () => {
  const { data, isLoading } = useSWR<{ drops: Drop[] }>("/drop/all");
  const { data: token, isLoading: isTokenLoading } = useSWR<{
    tokens: TokenDetails[];
  }>("/token");

  if ((isLoading && !data) || (!token && isTokenLoading)) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <p>Drops(lottery)</p>
        <DropsModal tokens={token?.tokens || []} />
      </div>
      {data?.drops.map((drop: Drop) => {
        const dropToken = drop.token;
        return (
          <div
            className=" border my-2 p-2 hover:bg-secondary group rounded-2xl cursor-pointer"
            key={dropToken.id}
          >
            <div className="flex items-center justify-between p-2 w-full">
              <div className="w-full">
                <div className="flex gap-2 items-center">
                  <img
                    src={cacheImage(dropToken.imageUrl)}
                    alt="logo"
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <div className="flex gap-1 items-center">
                      <div>{dropToken.symbol}</div>
                      <p className="text-xs opacity-60 bg-secondary px-1 py-0.5 rounded-md flex justify-center items-center gap-2">
                        {addressShortener(dropToken.address)}
                      </p>
                    </div>
                    <p className="text-xs text-left opacity-40">
                      {dropToken.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="group-hover:block hidden">
                <div className="flex gap-2">
                  <DropsModal tokens={token?.tokens || []} drop={drop} />
                  <DeleteDrop drop={drop} />
                </div>
              </div>
            </div>
            <a
              href={`https://dropz.cc/l/${drop.id}`}
              target="_blank"
              className="hover:bg-primary hover:text-white border px-3 py-1 rounded-lg mt-2 flex gap-2 items-center"
            >
              <p>https://dropz.cc/l/{drop.id}</p>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        );
      })}
    </div>
  );
};
