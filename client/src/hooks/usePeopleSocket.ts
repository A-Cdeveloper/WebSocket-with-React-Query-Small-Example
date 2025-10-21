import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function usePeopleSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4002");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "new-person" || data.type === "person-deleted") {
        queryClient.invalidateQueries({ queryKey: ["people"] });
      }
    };

    return () => ws.close();
  }, [queryClient]);
}
