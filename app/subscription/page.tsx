import Navbar from "../_components/navbar";
import { requireAuth } from "../_lib/auth";

const SubscriptionPage = async () => {
  await requireAuth();
  return <Navbar />;
};

export default SubscriptionPage;
