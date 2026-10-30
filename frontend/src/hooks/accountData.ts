import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/utils";

type CashBalance = {
  cash_balance: number | string;
};

async function fetchAccountCash(): Promise<CashBalance> {
  const user = await getUser();
  const userId = user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/api/account/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch account cash");
  }

  return response.json();
}

export function useAccountCash() {
  return useQuery({
    queryKey: ["account-cash"],
    queryFn: fetchAccountCash,
  });
}
