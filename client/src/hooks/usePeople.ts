import { useQuery } from "@tanstack/react-query";
import { config } from "../config/env";
import type { PersonType } from "../@types";

const fetchPeople = async (): Promise<PersonType[]> => {
  const response = await fetch(`${config.API_URL}/api/people`);
  if (!response.ok) {
    throw new Error("Failed to fetch people");
  }
  const data = await response.json();
  return data as PersonType[];
};

export const usePeople = () => {
  const { data, isLoading, error } = useQuery<PersonType[], Error>({
    queryKey: ["people"],
    queryFn: fetchPeople,
  });
  return { data, isLoading, error };
};
