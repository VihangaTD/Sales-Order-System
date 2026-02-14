import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrdersTable from "../components/home/OrdersTable";
import Button from "../components/ui/Button";
import { fetchOrders } from "../redux/slices/ordersSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { items: orders, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="p-8 text-center text-gray-500">Loading orders...</div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col mb-4">
        <div className="flex justify-center items-center py-2 mb-2">
          <h1 className="text-3xl font-bold text-gray-800">Home</h1>
        </div>
        
          <Link to="/order">
            <Button className="flex items-center gap-2">
              <Plus size={20} />
              Add New
            </Button>
          </Link>
        
      </div>

      <OrdersTable  orders={orders} />
    </div>
  );
};

export default Home;
