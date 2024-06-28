import { addressShortener } from "@/lib/addressShortener";
import { cacheImage } from "@/lib/cacheImage";
import { ExternalLink } from "lucide-react";
import useSWR from "swr";

export const Referral = () => {
  const { data, isLoading } = useSWR<{ referral: ReferralLink[] }>("/referral");

  if (isLoading && !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <p>Referral link generated</p>
      {data?.referral.map((referral) => {
        const widgetToken = referral.token;
        return (
          <div
            className=" border my-2 p-2 hover:bg-secondary group rounded-2xl cursor-pointer"
            key={referral.id}
          >
            <div className="px-3 border rounded-md flex justify-between items-center">
              <p className=" px-2 py-1">
                {referral.feeWalletAddress} - {referral.feePercentage}%
              </p>
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
            </div>
            <a
              href={`https://dropz.cc/r/${referral.id}`}
              target="_blank"
              className="hover:bg-primary hover:text-white border px-3 py-1 rounded-lg mt-2 flex gap-2 items-center"
            >
              <p>https://dropz.cc/r/{referral.id}</p>
              <ExternalLink className="w-4 h-4" />
            </a>
            <div className="mt-4">
              <p>Blink link below</p>
              <a
                href={`https://www.dial.to/?action=solana-action:https://api.dropz.cc/blink/referral/${referral.id}`}
                target="_blank"
                className="hover:bg-primary hover:text-white border px-3 py-1 rounded-lg mt-2 flex gap-2 items-center"
              >
                <p>
                  https://www.dial.to/?action=solana-action:https://api.dropz.cc/blink/referral/
                  {referral.id}
                </p>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
