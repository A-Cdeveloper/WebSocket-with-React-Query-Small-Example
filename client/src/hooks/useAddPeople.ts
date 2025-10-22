import { useMutation } from "@tanstack/react-query";
import type { PersonType, NewPerson } from "../@types";
import { config } from "../config/env";

const addPeople = async (person: NewPerson): Promise<PersonType> => {
  const response = await fetch(`${config.API_URL}/api/people`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });
  if (!response.ok) {
    throw new Error("Failed to add person");
  }
  return response.json() as Promise<PersonType>;
};

export const useAddPeople = () => {
  const { mutate, isPending, error } = useMutation<
    PersonType,
    Error,
    NewPerson
  >({
    mutationFn: addPeople,
  });
  return { mutate, isPending, error };
};
