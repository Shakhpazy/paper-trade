import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useAssets,
  type Asset,
  type LivePrice,
} from "@/hooks/useLiveAssets";

const apiUrl = import.meta.env.VITE_BACKEND_API;

async function fetchLivePrice(symbol: string): Promise<LivePrice> {
  const response = await fetch(`${apiUrl}/api/assets/live/${symbol}`);

  if (!response.ok) {
    throw new Error("Live price is not available");
  }

  return response.json();
}

export function useLiveAsset(symbol?: string) {
  const normalizedSymbol = symbol?.toUpperCase();
  const queryClient = useQueryClient();
  const assetsQuery = useAssets();

  const priceQuery = useQuery({
    queryKey: ["live-price", normalizedSymbol],
    queryFn: () => fetchLivePrice(normalizedSymbol!),
    enabled: Boolean(normalizedSymbol),
    initialData: () => {
      const prices = queryClient.getQueryData<LivePrice[]>(["live-prices"]);
      return prices?.find((price) => price.symbol === normalizedSymbol);
    },
    refetchInterval: 3000,
    retry: false,
  });

  const asset = assetsQuery.data?.find(
    (candidate) => candidate.symbol === normalizedSymbol
  );

  return {
    data: asset
      ? ({ ...asset, ...priceQuery.data } satisfies Asset)
      : undefined,
    isPending: assetsQuery.isPending,
    isError: assetsQuery.isError,
    error: assetsQuery.error,
    isLive: Boolean(priceQuery.data),
  };
}
