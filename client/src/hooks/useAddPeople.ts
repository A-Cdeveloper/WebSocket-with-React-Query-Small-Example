import { useMutation } from "@tanstack/react-query";
import type { Person } from "./usePeople";

export type NewPerson = Omit<Person, "id">;

const addPeople = async (person: NewPerson): Promise<Person> => {
  const response = await fetch("http://localhost:4002/api/people", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });
  if (!response.ok) {
    throw new Error("Failed to add person");
  }
  return response.json() as Promise<Person>;
};

export const useAddPeople = () => {
  const { mutate, isPending, error } = useMutation<Person, Error, NewPerson>({
    mutationFn: addPeople,
  });
  return { mutate, isPending, error };
};
