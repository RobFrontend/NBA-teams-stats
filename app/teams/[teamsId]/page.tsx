import PlayersFromTeam from "@/app/components/PlayersFromTeam";
import { getTeamById, getTeams } from "@/app/lib/data-service";

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

interface Params {
  params: {
    teamsId: string;
  };
}

export async function generateMetadata({ params }: Params) {
  const { response } = await getTeamById(params.teamsId);
  const name = response[0].name;
  return { title: `${name}` };
}

export async function generateStaticParams() {
  const { response } = await getTeams();

  const teams: Teams[] = response
    ?.filter((res: Teams) => res.nbaFranchise === true)
    ?.filter((res: Teams) => res.name !== "Home Team Stephen A");

  const ids = teams?.map((team: Teams) => ({
    teamsId: String(team.id),
  }));

  return ids;
}

export default async function Page({ params }: Params) {
  const { response } = await getTeamById(params.teamsId);

  if (!response) return <h1>Loading...</h1>;
  const team = response[0];
  const idTeam = team.id;

  if (!team) return <h1>No team found</h1>;

  return (
    <div>
      <div className="p-12">
        <h1>{team.name}</h1>
        <img src={team.logo} alt={team.name} className="max-h-[250px]" />
        <h2>City: {team.city}</h2>
      </div>
      <PlayersFromTeam idTeam={team.id} />
    </div>
  );
}
