import TeamsList from "@/app/components/TeamsList";
import { getTeams } from "../lib/data-service";

interface teamsLeagues {
  conference: string | null;
  division: string | null;
}

interface Teams {
  allStar: boolean;
  city: string;
  code: string;
  id: number;
  leagues: teamsLeagues[];
  logo: string;
  name: string;
  nbaFranchise: boolean;
  nickname: string;
}

export default async function SelectTeams() {
  const data = await getTeams();

  if (!data) return <p>No data</p>;

  const nbateams: Teams[] = data.response
    ?.filter((res: Teams) => res.nbaFranchise === true)
    ?.filter((res: Teams) => res.name !== "Home Team Stephen A");

  return (
    <>
      {nbateams && (
        <div className="grid grid-cols-5 gap-12 ">
          {nbateams.map((team) => (
            <TeamsList team={team} key={team.id} />
          ))}
        </div>
      )}
    </>
  );
}
