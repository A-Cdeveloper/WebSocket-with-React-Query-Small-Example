import { useMutation, useQueryClient } from "@tanstack/react-query";
import { config } from "../config/env";
import type { PersonType } from "../@types";

const deletePerson = async (id: number): Promise<PersonType> => {
  const response = await fetch(`${config.API_URL}/api/people/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete person");
  }
  return response.json() as Promise<PersonType>;
};

export const useDeletePerson = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation<PersonType, Error, number>({
    mutationFn: deletePerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { deletePerson: mutate, isPending, error };
};
