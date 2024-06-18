import { Card } from "@/components/ui/card";
import { DeleteWidget } from "@/components/widget/DeleteWidget";
import WidgetModal from "@/components/widget/WidgetModal";
import { addressShortener } from "@/lib/addressShortener";
import { cacheImage } from "@/lib/cacheImage";
import { ExternalLink, Link } from "lucide-react";
import useSWR from "swr";

export const Widget = () => {
  const { data, isLoading } = useSWR<{ widgets: WidgetDetails[] }>("/widget");
  const { data: token, isLoading: isTokenLoading } = useSWR<{
    tokens: TokenDetails[];
  }>("/token");

  if ((isLoading && !data) || (!token && isTokenLoading)) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Widget List</p>
        <div className="flex gap-3 items-center">
          <WidgetModal tokens={token?.tokens || []} />
        </div>
      </div>
      <Card className="p-4 w-full mt-4">
        {data?.widgets.map((widget) => {
          const widgetToken = widget.token;
          return (
            <div
              className=" border my-2 p-2 hover:bg-secondary group rounded-2xl cursor-pointer"
              key={widgetToken.id}
            >
              <div className="px-3 border rounded-md flex justify-between items-center">
                <p className=" px-2 py-1">
                  {widget.feeWalletAddress} - {widget.feePercentage}%
                </p>
                <p>{widget.website}</p>
              </div>

              <div className="flex items-center justify-between p-2 w-full">
                <div className="w-full">
                  <div className="flex gap-2 items-center">
                    <img
                      src={cacheImage(widgetToken.imageUrl)}
                      alt="logo"
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <div className="flex gap-1 items-center">
                        <div>{widgetToken.symbol}</div>
                        <p className="text-xs opacity-60 bg-secondary px-1 py-0.5 rounded-md flex justify-center items-center gap-2">
                          {addressShortener(widgetToken.address)}
                        </p>
                      </div>
                      <p className="text-xs text-left opacity-40">
                        {widgetToken.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group-hover:block hidden">
                  <div className="flex gap-2">
                    <WidgetModal
                      tokens={token?.tokens || []}
                      widgetDetails={widget}
                    />
                    <DeleteWidget widget={widget} />
                  </div>
                </div>
              </div>
              <a
                href={`https://dropz.cc/e/${widget.id}`}
                target="_blank"
                className="hover:bg-primary hover:text-white border px-3 py-1 rounded-lg mt-2 flex gap-2 items-center"
              >
                <p>https://dropz.cc/e/{widget.id}</p>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </Card>
    </div>
  );
};
