import { usePeople } from "../hooks/usePeople";
import { usePeopleSocket } from "../hooks/usePeopleSocket";
import AddPerson from "./AddPerson";
import Person from "./Person";

const People = () => {
  const { data, isLoading, error } = usePeople();

  console.log("render People");

  usePeopleSocket();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message}</div>;

  return (
    <div className="flex justify-between gap-4">
      <ul className="list-disc list-inside">
        {data?.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
      <AddPerson />
    </div>
  );
};

export default People;
