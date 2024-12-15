import { Suspense } from "react";
import Spinner from "../components/Spinner";
import SelectTeams from "../components/SelectTeams";

export const metadata = {
  title: "Teams",
};

export default function Page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Select your NBA team</h1>
      <Suspense fallback={<Spinner />}>
        <SelectTeams />
      </Suspense>
    </div>
  );
}
