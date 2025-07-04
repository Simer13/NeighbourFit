import { useCallback } from "react";
import { toast } from "sonner";

export function useToast() {
  return {
    toast: useCallback((props) => toast(props), []),
  };
}
