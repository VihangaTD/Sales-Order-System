import React from "react";
import Button from "../ui/Button";
import { Plus, Trash } from "lucide-react";

const ItemsTable = ({
  items,
  itemCodeOptions,
  itemDescOptions,
  handleItemChange,
  removeItem,
  addItem
}) => {
  return (
            <div className="bg-white shadow-md overflow-hidden mb-2">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32">
                    Item Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-48">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32">
                    Note
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase w-20">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase w-24">
                    Price
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase w-20">
                    Tax %
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase w-28">
                    Excl
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase w-28">
                    Tax Amt
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase w-28">
                    Incl
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase w-12 no-print">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-2 py-2">
                      <select
                        className="w-full border-gray-300 rounded-md text-sm p-1 border"
                        value={item.itemCode}
                        onChange={(e) =>
                          handleItemChange(index, "itemCode", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        {itemCodeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-2">
                      <select
                        className="w-full border-gray-300 rounded-md text-sm p-1 border"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        {itemDescOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-2">
                      <input
                        className="w-full border-gray-300 rounded-md text-sm p-1 border"
                        value={item.note}
                        onChange={(e) =>
                          handleItemChange(index, "note", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        className="w-full border-gray-300 rounded-md text-sm p-1 border text-right"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-2 text-right text-sm text-gray-700">
                      {Number(item.price).toFixed(2)}
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        className="w-full border-gray-300 rounded-md text-sm p-1 border text-right"
                        value={item.taxRate}
                        onChange={(e) =>
                          handleItemChange(index, "taxRate", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-2 text-right text-sm text-gray-700">
                      {item.exclAmount.toFixed(2)}
                    </td>
                    <td className="px-2 py-2 text-right text-sm text-gray-700">
                      {item.taxAmount.toFixed(2)}
                    </td>
                    <td className="px-2 py-2 text-right text-sm text-gray-700 font-medium">
                      {item.inclAmount.toFixed(2)}
                    </td>
                    <td className="px-2 py-2 text-center no-print">
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="no-print">
                  <td colSpan="10" className="px-4 py-2">
                    <Button
                      variant="primary"
                      onClick={addItem}
                      className="text-xs py-1"
                    >
                      <Plus size={14} className="inline mr-1" /> Add Item
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  );
};

export default ItemsTable;
