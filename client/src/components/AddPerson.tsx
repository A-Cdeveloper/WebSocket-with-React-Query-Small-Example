import React from "react";
import { useAddPeople } from "../hooks/useAddPeople";
import type { NewPerson } from "../@types";

const AddPerson = () => {
  const { mutate: addPerson, isPending } = useAddPeople();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const age = formData.get("age") as string;
    const profession = formData.get("profession") as string;
    const workStatus = formData.get("workStatus") as string;

    const newPerson: NewPerson = {
      name,
      age: parseInt(age),
      profession,
      workStatus,
    };
    addPerson(newPerson, {
      onSuccess: () => {
        (e.target as HTMLFormElement).reset();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Name"
        className="border border-gray-300 rounded-md p-2"
        name="name"
      />
      <input
        type="number"
        placeholder="Age"
        className="border border-gray-300 rounded-md p-2"
        name="age"
      />
      <input
        type="text"
        placeholder="Profession"
        className="border border-gray-300 rounded-md p-2"
        name="profession"
      />
      <input
        type="text"
        placeholder="Work Status"
        className="border border-gray-300 rounded-md p-2"
        name="workStatus"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add Person"}
      </button>
    </form>
  );
};

export default AddPerson;
