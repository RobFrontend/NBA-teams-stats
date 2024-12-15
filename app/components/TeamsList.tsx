import Link from "next/link";

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

interface TeamProps {
  team: Teams;
}

export default function TeamsList({ team }: TeamProps) {
  if (!team) return <p>Loading</p>;
  return (
    <Link href={`/teams/${team.id}`}>
      <div className="max-h-[200px] grid gap-6 justify-center shadow-md p-2 h-full">
        <div>
          <p>{team.name}</p>
          <p>from {team.city}</p>
        </div>
        <img
          src={team.logo}
          alt={team.name}
          className="max-w-[100px] max-h-[100px] self-center justify-self-center"
        />
      </div>
    </Link>
  );
}
