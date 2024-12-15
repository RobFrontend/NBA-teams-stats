import { getPlayersByTeamId } from "../lib/data-service";

interface Players {
  id: number;
  firstname: string;
  lastname: string;
  birth: any;
  nba: any;
  height: any;
  weight: any;
  college: string;
  affiliation: string;
  leagues: any;
}

export default async function PlayersFromTeam({ idTeam }: any) {
  const { response } = await getPlayersByTeamId(idTeam);

  if (!response) return <h1>Loading</h1>;
  const players = response;
  if (!players) return <h1>No Players found</h1>;

  return (
    <div className="grid grid-cols-3 gap-12">
      {players?.map((player: Players) => (
        <div key={player.id} className="shadow-md p-2 grid gap-1">
          <p>
            {player.firstname} {player.lastname}
          </p>
          <p>
            Age:{" "}
            {player.birth.date
              ? `${new Date().getFullYear() - player.birth.date.slice(0, 4)}`
              : "N/A"}
          </p>
          <p>
            From: {player.birth.country ? `${player.birth.country}` : `N/A`}
          </p>
          <p>
            Height: {player.height.meters ? `${player.height.meters}m` : `N/A`}
          </p>
          <p>
            Weight:{" "}
            {player.weight.kilograms ? `${player.weight.kilograms}kg` : `N/A`}
          </p>
          <p>College: {player.college ? `${player.college}` : "N/A"}</p>
          {player.nba.start ? <p>In NBA since {player.nba.start}</p> : null}
        </div>
      ))}
    </div>
  );
}
