import Navbar from "./_components/navbar";
import { requireAuth } from "./_lib/auth";

const Home = async () => {
  await requireAuth();

  return <Navbar />;
};

export default Home;
