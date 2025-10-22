import { useDeletePerson } from "../hooks/useDeletePerson";
import type { PersonType } from "../@types";

const Person = ({ person }: { person: PersonType }) => {
  const { deletePerson, isPending, error } = useDeletePerson();

  const handleDelete = () => {
    deletePerson(person.id);
  };
  if (error) return <div>Error: {error?.message}</div>;
  return (
    <li key={person.id} className="flex flex-row gap-2 items-center mb-3">
      <span className="font-bold">{person.name}</span>
      <span className="text-gray-500">{person.age}</span>
      <span className="text-gray-500">{person.profession}</span>
      <span className="text-gray-500">{person.workStatus}</span>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="bg-red-500 text-white px-2 rounded-md ml-auto cursor-pointer"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
};

export default Person;
