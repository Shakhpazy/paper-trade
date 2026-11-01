import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Asset } from "@/hooks/useLiveAssets";

type TradeOrderFormProps = {
  asset: Asset;
};

export function TradeOrderForm({ asset }: TradeOrderFormProps) {
  const [side, setSide] = useState("buy");
  const [quantity, setQuantity] = useState("");

  const price = Number(asset.last_price);
  const total = Number(quantity) * price;

  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Market order</p>
          <h2 className="mt-1 text-xl font-semibold">Trade {asset.symbol}</h2>
        </div>
        <p className="font-medium">${price.toFixed(2)}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant={side === "buy" ? "default" : "outline"}
          onClick={() => setSide("buy")}
          className="h-10"
        >
          Buy
        </Button>
        <Button
          type="button"
          variant={side === "sell" ? "destructive" : "outline"}
          onClick={() => setSide("sell")}
          className="h-10"
        >
          Sell
        </Button>
      </div>

      <div className="mt-6">
        <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
        <Input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="0"
          className="mt-2 h-10"
        />
      </div>

      <div className="my-6 flex items-center justify-between border-y py-4">
        <p className="text-sm text-muted-foreground">Estimated total</p>
        <p className="font-semibold">${total.toFixed(2)}</p>
      </div>

      <Button
        type="button"
        variant={side === "sell" ? "destructive" : "default"}
        className="h-10 w-full"
      >
        {side === "buy" ? "Buy" : "Sell"} {asset.symbol}
      </Button>
    </section>
  );
}
