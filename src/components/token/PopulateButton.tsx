import { axios } from "@/lib/axios";
import { mutate } from "swr";
import { Button } from "../ui/button";
import { useState } from "react";

export const PopulateButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      disabled={isLoading}
      onClick={async () => {
        try {
          setIsLoading(true);
          await axios.get("/token/populate");
          setIsLoading(false);
          mutate("/token");
        } catch (e) {
          setIsLoading(false);
          console.log(e);
        }
      }}
    >
      {isLoading ? "Populating..." : "Populate"}
    </Button>
  );
};
