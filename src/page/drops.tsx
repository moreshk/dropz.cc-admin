import DropsModal from "@/components/drops/dropsModal";
import useSWR from "swr";

export const Drops = () => {
  const { data, isLoading } = useSWR<{ drops: Drop[] }>("/drop/all");

  console.log(data);
  if (isLoading && !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <p>Drops(lottery)</p>
        <DropsModal tokens={[]} />
      </div>
      {data?.drops.map((drops: Drop) => (
        <div key={drops.id}>{drops.id}</div>
      ))}
    </div>
  );
};
