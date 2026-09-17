"use client";

import { ShoppingBagIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

export function AddToCartButton({
  slug,
  disabled,
  label = "In winkelwagen",
}: {
  slug: string;
  disabled?: boolean;
  label?: string;
}) {
  const { add } = useCart();

  return (
    <Button
      type="button"
      className="w-full"
      disabled={disabled}
      onClick={() => {
        const result = add(slug);
        if (!result.ok) {
          toast.error(result.reason ?? "Kon het product niet toevoegen.");
          return;
        }
        toast.success("Toegevoegd aan uw winkelwagen.");
      }}
    >
      <ShoppingBagIcon data-icon="inline-start" />
      {disabled ? "Uitverkocht" : label}
    </Button>
  );
}
