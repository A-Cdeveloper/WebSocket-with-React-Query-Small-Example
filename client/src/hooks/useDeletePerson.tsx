import { useMutation, useQueryClient } from "@tanstack/react-query";

const deletePerson = async (id: number) => {
  const response = await fetch(`http://localhost:4002/api/people/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete person");
  }
  return response.json();
};

export const useDeletePerson = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation<void, Error, number>({
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
