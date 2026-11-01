import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export type Asset = {
  id: string;
  symbol: string;
  name: string;
  asset_type: "STOCK" | "CRYPTO";
  logo_url: string;
  last_price: string | number;
  last_price_at: string;
  created_at: string;
};

export type LivePrice = {
  symbol: string;
  last_price: string | number;
  last_price_at: string;
};

const apiUrl = import.meta.env.VITE_BACKEND_API;

async function fetchAssets(): Promise<Asset[]> {
  const response = await fetch(`${apiUrl}/api/assets`);

  if (!response.ok) {
    throw new Error("Failed to fetch assets");
  }

  return response.json();
}

async function fetchLivePrices(): Promise<LivePrice[]> {
  const response = await fetch(
    `${apiUrl}/api/assets/live`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch live prices");
  }

  return response.json();
}

export function useAssets() {
  return useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssets,
    staleTime: 10 * 60 * 1000,
  });
}

export function useLivePrices() {
  return useQuery({
    queryKey: ["live-prices"],
    queryFn: fetchLivePrices,
    refetchInterval: 3000,
  });
}

export function useLiveAssets() {
  const assetsQuery = useAssets();
  const pricesQuery = useLivePrices();

  const data = useMemo(() => {
    const pricesBySymbol = new Map(
      pricesQuery.data?.map((price) => [price.symbol, price])
    );

    return assetsQuery.data?.map((asset) => ({
      ...asset,
      ...pricesBySymbol.get(asset.symbol),
    }));
  }, [assetsQuery.data, pricesQuery.data]);

  return {
    ...assetsQuery,
    data,
  };
}
