import { usePeople } from "../hooks/usePeople";
import { useSocket } from "../hooks/useSocket";
import { config } from "../config/env";
import AddPerson from "./AddPerson";
import Person from "./Person";

const People = () => {
  const { data, isLoading, error } = usePeople();

  useSocket(config.WS_URL);

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
