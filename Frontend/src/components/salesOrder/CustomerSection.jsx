import React from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";

const CustomerSection = ({
  formData,
  setFormData,
  clientOptions,
  clientAddress,
  handleClientChange,
  setClientAddress
}) => {
  return (
    <div className="bg-white shadow-md p-6 mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Select
                label="Customer Name"
                options={clientOptions}
                placeholder="Select Customer"
                value={formData.clientId}
                onChange={handleClientChange}
              />
              <Input
                label="Address 1"
                value={clientAddress.address1}
                onChange={(e) =>
                  setClientAddress({
                    ...clientAddress,
                    address1: e.target.value,
                  })
                }
              />
              <Input
                label="Address 2"
                value={clientAddress.address2}
                onChange={(e) =>
                  setClientAddress({
                    ...clientAddress,
                    address2: e.target.value,
                  })
                }
              />
              <Input
                label="Address 3"
                value={clientAddress.address3}
                onChange={(e) =>
                  setClientAddress({
                    ...clientAddress,
                    address3: e.target.value,
                  })
                }
              />
              <Input
                label="Suburb"
                value={clientAddress.suburb}
                onChange={(e) =>
                  setClientAddress({ ...clientAddress, suburb: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="State"
                  value={clientAddress.state}
                  onChange={(e) =>
                    setClientAddress({
                      ...clientAddress,
                      state: e.target.value,
                    })
                  }
                />
                <Input
                  label="Post Code"
                  value={clientAddress.postCode}
                  onChange={(e) =>
                    setClientAddress({
                      ...clientAddress,
                      postCode: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <Input
                label="Invoice No"
                value={formData.invoiceNo}
                onChange={(e) =>
                  setFormData({ ...formData, invoiceNo: e.target.value })
                }
              />
              <Input
                label="Invoice Date"
                type="date"
                value={formData.invoiceDate}
                onChange={(e) =>
                  setFormData({ ...formData, invoiceDate: e.target.value })
                }
              />
              <Input
                label="Reference No"
                value={formData.referenceNo}
                onChange={(e) =>
                  setFormData({ ...formData, referenceNo: e.target.value })
                }
              />
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Note
                </label>
                <textarea
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 h-32 resize-none"
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
  );
};

export default CustomerSection;
