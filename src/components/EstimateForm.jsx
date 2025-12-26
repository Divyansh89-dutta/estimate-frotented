import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

const defaultItem = {
  itemName: "",
  hsn: "",
  qty: 1,
  unit: "",
  price: 0,
  total: 0,
};

const defaultForm = {
  estimateNo: "",
  customerName: "",
  items: [defaultItem],
  subTotal: 0,
  // cgst: 0,
  // sgst: 0,
  grandTotal: 0,
};

const EstimateForm = ({ initialData, onSubmit, loading }) => {
  const [form, setForm] = useState(defaultForm);

  // useEffect(() => {
  //   if (initialData) {
  //     setForm({
  //       estimateNo: initialData.estimateNo || "",
  //       customerName: initialData.customerName || "",
  //       items: initialData.items?.length ? initialData.items : [defaultItem],
  //       subTotal: initialData.subTotal || 0,
  //       cgst: initialData.cgst || 0,
  //       sgst: initialData.sgst || 0,
  //       grandTotal: initialData.grandTotal || 0,
  //     });
  //   } else {
  //     setForm(defaultForm);
  //   }
  // }, [initialData]);
  useEffect(() => {
    if (initialData) {
      setForm({
        estimateNo: initialData.estimateNo || "",
        customerName: initialData.customerName || "",
        items: initialData.items?.length
          ? initialData.items.map((it) => ({ ...it })) // clone each item
          : [
              {
                itemName: "",
                hsn: "",
                qty: 1,
                unit: "",
                price: 0,
                total: 0,
              },
            ],
        subTotal: initialData.subTotal || 0,
        // cgst: initialData.cgst || 0,
        // sgst: initialData.sgst || 0,
        grandTotal: initialData.grandTotal || 0,
      });
    } else {
      setForm(defaultForm);
    }
  }, [initialData]);

  const calculateTotals = (items) => {
    const subTotal = items.reduce(
      (sum, item) => sum + (item.qty * item.price || 0),
      0
    );
    // const cgst = subTotal * 0.09;
    // cons/t sgst = subTotal * 0.09;
    const grandTotal = subTotal;

    return {
      subTotal: +subTotal.toFixed(2),
      // cgst: +cgst.toFixed(2),
      // sgst: +sgst.toFixed(2),
      grandTotal: +grandTotal.toFixed(2),
    };
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...form.items];
    if (field === "qty" || field === "price") {
      newItems[index][field] = parseFloat(value) || 0;
      newItems[index].total = newItems[index].qty * newItems[index].price;
    } else {
      newItems[index][field] = value;
    }
    const totals = calculateTotals(newItems);
    setForm((p) => ({ ...p, items: newItems, ...totals }));
  };

  // const addItem = () => {
  //   const items = [...form.items, { ...defaultItem }];
  //   const totals = calculateTotals(items);
  //   setForm((p) => ({ ...p, items, ...totals }));
  // };

  const addItem = () => {
    const items = [
      ...form.items,
      {
        itemName: "",
        hsn: "",
        qty: 1,
        unit: "",
        price: 0,
        total: 0,
      },
    ];
    const totals = calculateTotals(items);
    setForm((p) => ({ ...p, items, ...totals }));
  };

  const removeItem = (index) => {
    if (form.items.length === 1) return;
    const items = form.items.filter((_, i) => i !== index);
    const totals = calculateTotals(items);
    setForm((p) => ({ ...p, items, ...totals }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totals = calculateTotals(form.items);
    onSubmit({ ...form, ...totals });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5 rounded-3xl p-5
        bg-white/90 dark:bg-slate-900/90 backdrop-blur
        border border-slate-200/60 dark:border-slate-800 shadow-lg"
    >
      {/* Header fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1 text-slate-600 dark:text-slate-300">
            Estimate No
          </label>
          <input
            name="estimateNo"
            value={form.estimateNo}
            onChange={handleChange}
            required
            className="w-full rounded-full border px-4 py-2 text-sm
              bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-700
              text-slate-900 dark:text-white
              focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-slate-600 dark:text-slate-300">
            Customer Name
          </label>
          <input
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
            className="w-full rounded-full border px-4 py-2 text-sm
              bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-700
              text-slate-900 dark:text-white
              focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Items */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Items
          </label>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1 text-xs px-3 py-1 rounded-full
              bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
          >
            <Plus className="h-3 w-3" /> Add
          </button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {form.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 sm:grid-cols-6 gap-2 items-end
                p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60"
            >
              <div className="sm:col-span-2">
                <input
                  value={item.itemName}
                  onChange={(e) =>
                    handleItemChange(index, "itemName", e.target.value)
                  }
                  className="w-full rounded-full border px-2 py-1 text-sm"
                  placeholder="Item name"
                />
              </div>
              <input
                value={item.hsn}
                onChange={(e) => handleItemChange(index, "hsn", e.target.value)}
                className="w-full rounded-full border px-2 py-1 text-sm"
                placeholder="HSN"
              />
              <input
                type="number"
                min="0"
                value={item.qty}
                onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                className="w-full rounded-full border px-2 py-1 text-sm"
              />
              <input
                value={item.unit}
                onChange={(e) =>
                  handleItemChange(index, "unit", e.target.value)
                }
                className="w-full rounded-full border px-2 py-1 text-sm"
                placeholder="Unit"
              />
              <input
                type="number"
                min="0"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, "price", e.target.value)
                }
                className="w-full rounded-full border px-2 py-1 text-sm"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">
                  ₹{(item.total || 0).toFixed(2)}
                </span>
                {form.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-1 rounded-full text-rose-600 hover:bg-rose-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 dark:border-slate-800 text-sm">
        <div>
          <p className="text-xs text-slate-500">Sub Total</p>₹
          {form.subTotal.toFixed(2)}
        </div>

        <div className="text-right font-bold">
          <p className="text-xs text-slate-500">Grand Total</p>₹
          {form.grandTotal.toFixed(2)}
        </div>
      </div>

      <div className="text-right text-xl font-extrabold text-indigo-600">
        Grand Total: ₹{form.grandTotal.toFixed(2)}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-full text-sm font-semibold text-white
          bg-indigo-600 hover:bg-indigo-700 shadow-md
          disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Estimate"
          : "Create Estimate"}
      </button>
    </motion.form>
  );
};

export default EstimateForm;
