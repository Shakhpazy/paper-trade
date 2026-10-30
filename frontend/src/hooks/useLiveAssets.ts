import { useQuery } from "@tanstack/react-query";

type LiveAsset = {
  price: number;
  timestamp: string;
};

type LiveAssets = Record<string, LiveAsset>;

async function fetchLiveAssets(): Promise<LiveAssets> {
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
