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
  try {
    const data = await getTeamById(params.teamsId);
    if (!data || !data.response || data.response.length === 0) {
      console.error(
        "getTeamById returned an invalid response for",
        params.teamsId
      );
      return { title: "Team Not Found" };
    }
    const name = data.response[0].name;
    return { title: `${name}` };
  } catch (error) {
    console.error("Error in generateMetaData:", error);
    return { title: "Error Loading Team" };
  }
}

export async function generateStaticParams() {
  try {
    const data = await getTeams();

    if (!data || !data.response) {
      console.error("getTeams response is empty or malformed");
      return [];
    }

    const teams: Teams[] = data.response
      ?.filter((res: Teams) => res.nbaFranchise === true)
      ?.filter((res: Teams) => res.name !== "Home Team Stephen A");

    const ids = teams?.map((team: Teams) => ({
      teamsId: String(team.id),
    }));

    return ids;
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export default async function Page({ params }: Params) {
  try {
    const data = await getTeamById(params.teamsId);
    if (!data || !data.response || data.response.length === 0) {
      console.error(
        "getTeamById returned an invalid response for",
        params.teamsId
      );
      return <h1>Team Not Found</h1>;
    }

    const team = data.response[0];
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
  } catch (error) {
    console.error("Error rendering team page:", error);
    return <h1>Error Loading Team</h1>;
  }
}
