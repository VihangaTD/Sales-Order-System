import { Edit, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrdersTable = ({ orders }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white  shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total (Incl)
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onDoubleClick={() => navigate(`/order/${order.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.invoiceNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.invoiceDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.client?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {order.totalIncl !== undefined
                    ? Number(order.totalIncl).toFixed(2)
                    : "0.00"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/order/${order.id}`);
                    }}
                    className="text-gray-700 hover:text-gray-800 mx-2"
                    title="Edit Order"
                  >
                    <Edit size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <FileText size={48} className="mx-auto mb-2 text-gray-300" />
                  <p>No orders found. Click "Add New" to create one.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  );
};

export default OrdersTable;
