import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { format, isMatch } from "date-fns";
import { requireAuth } from "../_lib/auth";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";

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
  const dashboard = await getDashboard(month, userId);
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          <div className="flex flex-col gap-6">
            <SummaryCards month={month} userId={userId} {...dashboard} />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart {...dashboard} />
            </div>
          </div>
          ola mundo
        </div>
      </div>
    </>
  );
};

export default Home;
