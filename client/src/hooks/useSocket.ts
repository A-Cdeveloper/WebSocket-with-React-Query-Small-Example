import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { SocketEvent } from "../@types";

export function useSocket(url: string) {
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Zatvori postojeću konekciju ako postoji
    if (wsRef.current) {
      wsRef.current.close();
    }

    wsRef.current = new WebSocket(url);

    wsRef.current.onmessage = (event) => {
      try {
        const data: SocketEvent = JSON.parse(event.data);

        if (data.key) {
          // Invalidate query cache za dati key
          queryClient.invalidateQueries({ queryKey: [data.key] });
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url, queryClient]);
}
