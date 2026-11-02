import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { format, isMatch } from "date-fns";
import { requireAuth } from "../_lib/auth";

interface HomeProps {
  searchParams: Promise<{
    month?: string;
  }>;
}

const Home = async ({ searchParams }: HomeProps) => {
  const userId = await requireAuth();

  const { month } = await searchParams;

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${format(new Date(), "MM")}`);
  }
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={month} userId={userId} />
      </div>
    </>
  );
};

export default Home;
