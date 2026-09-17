import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export function DemoNotice({ children }: { children: string }) {
  return (
    <Alert>
      <InfoIcon />
      <AlertTitle>Demonstratie</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
