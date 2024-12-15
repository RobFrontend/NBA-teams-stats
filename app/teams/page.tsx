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

export const metadata = {
  title: "NBA Teams",
};

export default async function Page() {
  const { response } = await getTeams();

  const nbateams: Teams[] = response
    ?.filter((res: Teams) => res.nbaFranchise === true)
    ?.filter((res: Teams) => res.name !== "Home Team Stephen A");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Select your NBA team</h1>
      {nbateams && (
        <div className="grid grid-cols-5 gap-12 ">
          {nbateams.map((team) => (
            <TeamsList team={team} key={team.id} />
          ))}
        </div>
      )}
    </div>
  );
}
