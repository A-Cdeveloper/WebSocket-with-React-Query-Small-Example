import { useQuery } from "@tanstack/react-query";

export type PersonType = {
  id: number;
  name: string;
  age: number;
  profession: string;
  workStatus: string;
};

const fetchPeople = async (): Promise<PersonType[]> => {
  const response = await fetch("http://localhost:4002/api/people");
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
