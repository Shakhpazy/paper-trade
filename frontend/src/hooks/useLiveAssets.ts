import { useQuery } from "@tanstack/react-query";

type LiveAsset = {
  id: string;
  symbol: string;
  name: string;
  asset_type: "STOCK" | "CRYPTO";
  logo_url: string;
  last_price: string | number;
  last_price_at: string;
  created_at: string;
};

async function fetchLiveAssets(): Promise<LiveAsset[]> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/api/assets/live`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch live assets");
  }

  return response.json();
}

export function useLiveAssets() {
  return useQuery({
    queryKey: ["live-assets"],
    queryFn: fetchLiveAssets,
    refetchInterval: 3000,
  });
}
