import { ArrowLeft, Printer, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CustomerSection from "../components/salesOrder/CustomerSection";
import ItemsTable from "../components/salesOrder/ItemsTable";
import Button from "../components/ui/Button";
import { fetchClients, updateClient } from '../redux/slices/clientsSlice';
import { fetchItems } from "../redux/slices/itemsSlice";
import {
    createOrder,
    fetchOrders,
    resetSaveStatus,
    updateOrder,
} from "../redux/slices/ordersSlice";
import api from "../services/api";

const SalesOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = !!id;

  const { items: clients } = useSelector((state) => state.clients);
  const { items: inventoryItems } = useSelector((state) => state.items);
  const {
    items: orders,
    saveStatus,
    saveError,
  } = useSelector((state) => state.orders);

  const [formData, setFormData] = useState({
    clientId: "",
    invoiceNo: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    referenceNo: "",
    note: "",
    items: [],
  });

  const [clientAddress, setClientAddress] = useState({
    address1: "",
    address2: "",
    address3: "",
    suburb: "",
    state: "",
    postCode: "",
  });

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchItems());
    if (isEditMode && orders.length === 0) {
      dispatch(fetchOrders());
    }
  }, [dispatch, isEditMode, orders.length]);

  useEffect(() => {
    if (isEditMode && orders.length > 0) {
      const order = orders.find((o) => o.id === Number(id));
      if (order) {
        setFormData({
          clientId: order.client?.id || "",
          invoiceNo: order.invoiceNo,
          invoiceDate: order.invoiceDate,
          referenceNo: order.referenceNo,
          note: order.note,
          items: order.items.map((item) => ({
            itemId: item.itemId,
            itemCode: item.itemCode,
            description: item.description,
            note: item.note || "",
            quantity: item.quantity,
            price: item.price,
            taxRate: item.taxRate,
            exclAmount: item.exclAmount,
            taxAmount: item.taxAmount,
            inclAmount: item.inclAmount,
          })),
        });
        if (order.client) {
          setClientAddress({
            address1: order.client.address1 || "",
            address2: order.client.address2 || "",
            address3: order.client.address3 || "",
            suburb: order.client.suburb || "",
            state: order.client.state || "",
            postCode: order.client.postCode || "",
          });
        }
      } else {
        api
          .get(`/orders/${id}`)
          .then((res) => {
            const order = res.data;
            setFormData({
              clientId: order.client?.id || "",
              invoiceNo: order.invoiceNo,
              invoiceDate: order.invoiceDate,
              referenceNo: order.referenceNo,
              note: order.note,
              items: order.items.map((item) => ({
                itemId: item.itemId,
                itemCode: item.itemCode,
                description: item.description,
                note: item.note || "",
                quantity: item.quantity,
                price: item.price,
                taxRate: item.taxRate,
                exclAmount: item.exclAmount,
                taxAmount: item.taxAmount,
                inclAmount: item.inclAmount,
              })),
            });
            if (order.client) {
              setClientAddress({
                address1: order.client.address1 || "",
                address2: order.client.address2 || "",
                address3: order.client.address3 || "",
                suburb: order.client.suburb || "",
                state: order.client.state || "",
                postCode: order.client.postCode || "",
              });
            }
          })
          .catch((err) => console.error("Failed to load order", err));
      }
    }
  }, [isEditMode, id, orders]);

  const handleClientChange = (e) => {
    const clientId = Number(e.target.value);
    setFormData((prev) => ({ ...prev, clientId }));

    const client = clients.find((c) => c.id === clientId);
    if (client) {
      setClientAddress({
        address1: client.address1 || "",
        address2: client.address2 || "",
        address3: client.address3 || "",
        suburb: client.suburb || "",
        state: client.state || "",
        postCode: client.postCode || "",
      });
    } else {
      setClientAddress({
        address1: "",
        address2: "",
        address3: "",
        suburb: "",
        state: "",
        postCode: "",
      });
    }
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          itemId: "",
          itemCode: "",
          description: "",
          note: "",
          quantity: 1,
          price: 0,
          taxRate: 0,
          exclAmount: 0,
          taxAmount: 0,
          inclAmount: 0,
        },
      ],
    }));
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    const item = { ...newItems[index] };

    if (field === "itemCode" || field === "description") {
      const inventoryItem = inventoryItems.find((i) =>
        field === "itemCode" ? i.itemCode === value : i.description === value,
      );

      if (inventoryItem) {
        item.itemId = inventoryItem.id;
        item.itemCode = inventoryItem.itemCode;
        item.description = inventoryItem.description;
        item.price = inventoryItem.price;
      } else {
        item[field] = value;
      }
    } else {
      item[field] = value;
    }

    const qty = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;
    const taxRate = Number(item.taxRate) || 0;

    item.exclAmount = qty * price;
    item.taxAmount = item.exclAmount * (taxRate / 100);
    item.inclAmount = item.exclAmount + item.taxAmount;

    newItems[index] = item;
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const totals = formData.items.reduce(
    (acc, item) => ({
      excl: acc.excl + (item.exclAmount || 0),
      tax: acc.tax + (item.taxAmount || 0),
      incl: acc.incl + (item.inclAmount || 0),
    }),
    { excl: 0, tax: 0, incl: 0 },
  );

  const handleSubmit = async () => {
    if (!formData.clientId) {
      alert("Please select a customer");
      return;
    }
    if (formData.items.length === 0) {
      alert("Please add at least one item");
      return;
    }

    const payload = {
      clientId: formData.clientId,
      invoiceNo: formData.invoiceNo,
      invoiceDate: formData.invoiceDate,
      referenceNo: formData.referenceNo,
      note: formData.note,
      items: formData.items.map((item) => ({
        itemId: item.itemId,
        note: item.note,
        quantity: item.quantity,
        taxRate: item.taxRate,
      })),
    };

    const clientToUpdate = clients.find(c => c.id === formData.clientId);
        if (clientToUpdate) {
            const updatedClientData = {
                ...clientToUpdate,
                address1: clientAddress.address1,
                address2: clientAddress.address2,
                address3: clientAddress.address3,
                suburb: clientAddress.suburb,
                state: clientAddress.state,
                postCode: clientAddress.postCode
            };
            try {
                await dispatch(updateClient({ id: clientToUpdate.id, data: updatedClientData })).unwrap();
            } catch (error) {
                console.error("Failed to update client details:", error);
                alert("Failed to update client details, but proceeding with order save.");
            }
        }

    if (isEditMode) {
      dispatch(updateOrder({ id, data: payload }));
    } else {
      dispatch(createOrder(payload));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (saveStatus === "succeeded") {
      dispatch(resetSaveStatus());
      navigate("/");
    } else if (saveStatus === "failed") {
      alert(`Failed to save: ${saveError}`);
      dispatch(resetSaveStatus());
    }
  }, [saveStatus, saveError, navigate, dispatch]);

  const clientOptions = clients.map((c) => ({ value: c.id, label: c.name }));
  const itemCodeOptions = inventoryItems.map((i) => ({
    value: i.itemCode,
    label: i.itemCode,
  }));
  const itemDescOptions = inventoryItems.map((i) => ({
    value: i.description,
    label: i.description,
  }));

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-4 gap-2 flex flex-col no-print ">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-3xl font-bold text-gray-800">Sales Order</h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft />
          </button>
          <div className="w-full flex justify-between">
            <Button onClick={handleSubmit} className="flex items-center gap-2">
              <Save size={20} />
              Save Order
            </Button>
            <Button
              onClick={handlePrint}
              variant="primary"
              className="flex items-center gap-2"
            >
              <Printer size={20} />
              Print
            </Button>
          </div>
        </div>
      </div>

      <div className="print-area">
        <CustomerSection
          formData={formData}
          clientOptions={clientOptions}
          clientAddress={clientAddress}
          handleClientChange={handleClientChange}
          setClientAddress={setClientAddress}
          setFormData={setFormData}
        />
        <ItemsTable
          items={formData.items}
          itemCodeOptions={itemCodeOptions}
          itemDescOptions={itemDescOptions}
          handleItemChange={handleItemChange}
          removeItem={removeItem}
          addItem={addItem}
        />

        <div className="flex justify-end shadow-md bg-white">
          <div className="bg-white p-4 w-full md:w-1/3">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Excl:</span>
              <span className="font-semibold">{totals.excl.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Tax:</span>
              <span className="font-semibold">{totals.tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="text-lg font-bold text-gray-800">
                Total Incl:
              </span>
              <span className="text-lg font-bold text-gray-800">
                {totals.incl.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOrder;
