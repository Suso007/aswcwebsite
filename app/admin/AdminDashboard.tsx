// =============================
// FILE: app/admin/AdminDashboard.tsx
// =============================
"use client";
import { useEffect, useMemo, useState } from "react";
import { exportToExcel } from "@/lib/exportExcel"; // adjust path
import ProductImageModal from "../components/ProductImageModal";
import { useRouter } from "next/navigation";


type Category = {
  id: number;
  title: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  description: string;
  image: string;
  tags: string[];
  featured: boolean;
  badges?: string | null;
  bestseller: boolean;
  rating?: number | null;
  size?: string | null;
  type: string;
  categoryId?: number | null;
  category?: Category | null;
};

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  createdAt: string;
};

type ServiceFormMessage = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  productType: string;
  modelNo?: string | null;
  message: string;
  createdAt: string;
};

type Order = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  product: string;
  quantity: string;
  installation?: string | null;
  message?: string | null;
  createdAt: string;
};
type DeletedProduct = { product: Product; index: number };

const tabs = [
  { key: "products", label: "Products" },
  { key: "service", label: "Service Requests" },
  { key: "contact", label: "Contact Messages" },
  { key: "orders", label: "Buy Now Requests" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function AdminDashboard() {
  const [active, setActive] = useState<TabKey>("products");
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <nav className="flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`px-3 py-2 rounded-xl text-sm font-medium border ${
                  active === t.key
                    ? "bg-gray-900 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {active === "products" && <ProductsAdmin />}
        {active === "service" && <ServiceRequests />}
        {active === "contact" && <ContactMessages />}
        {active === "orders" && <OrdersView />}
      </main>
    </div>
  );
}

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) =>
        setCategories(data.map((c: any) => ({ id: c.id, title: c.title })))
      )
      .catch((e) => console.error(e));
  }, []);
  return categories;
}

function ProductsAdmin() {
  const router = useRouter();
  const categories = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | 0>(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [deletedProducts, setDeletedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    if (!selectedCategoryId) return products;
    return products.filter((p) => p.categoryId === selectedCategoryId);
  }, [products, selectedCategoryId]);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function deleteProduct(p: Product) {
    if (!confirm(`Delete ${p.name}?`)) return;
    const res = await fetch(`/api/products/${p.id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((x) => x.id !== p.id));
      setDeletedProducts((prev) => [p, ...prev]); // store deleted
    } else {
      alert("Failed to delete");
    }
  }

  async function undoDelete(p: Product) {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p), // re-create product with original data
      });
      if (!res.ok) throw new Error("Failed to restore");
      const restored = await res.json();
      setProducts((prev) => [restored, ...prev]);
      setDeletedProducts((prev) => prev.filter((x) => x.id !== p.id));
    } catch (err: any) {
      alert(err.message || "Undo failed");
    }
  }

  return (
    <div className="space-y-6">
      {/* Existing Products UI */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-sm text-gray-600">
            Create, filter by category, and delete products.
          </p>
        </div>
        <button
          onClick={load}
          className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-100 text-sm"
        >
          Refresh
        </button>
      </div>

      {/* Products Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <label className="text-sm">
              <span className="mr-2">Category filter:</span>
              <select
                className="border rounded-lg px-2 py-1"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
              >
                <option value={0}>All</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="overflow-x-auto border rounded-2xl bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <Th>Name</Th>
                  <Th>Category</Th>
                  <Th>Price</Th>
                  <Th>Tags</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No products found
                    </td>
                  </tr>
                )}
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t">
                    <Td>
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-gray-500">#{p.id}</div>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      {p.category?.title ??
                        (p.categoryId ? `#${p.categoryId}` : "Unassigned")}
                    </Td>
                    <Td>₹{Number(p.price).toLocaleString("en-IN")}</Td>
                    <Td>
                      <div className="flex flex-wrap gap-1">
                        {(p.tags || []).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-full bg-gray-100 border text-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedProduct(p)}
                          className="px-2 py-1 text-xs rounded-lg border bg-white hover:bg-gray-100"
                        >
                          +Images
                        </button>
                        <button
                          onClick={() => deleteProduct(p)}
                          className="px-2 py-1 text-xs rounded-lg border bg-white hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <CreateProductForm
            categories={categories}
            onCreated={(p) => setProducts((prev) => [p, ...prev])}
          />
        </div>
      </div>

      {/* Deleted Products Section */}
      {deletedProducts.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Recently Deleted</h3>
          <ul className="space-y-2 mt-2">
            {deletedProducts.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between border p-2 rounded-lg bg-gray-50"
              >
                <span>{p.name}</span>
                <button
                  onClick={() => undoDelete(p)}
                  className="text-sm px-3 py-1 rounded-lg border bg-white hover:bg-gray-100"
                >
                  Undo
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Image Upload Modal */}
      <ProductImageModal
        isOpen={!!selectedProduct}
        onClose={() => {setSelectedProduct(null); router.refresh(); }}
        productId={selectedProduct?.id || 0}
        productName={selectedProduct?.name || ''}
        onImagesUploaded={() => {
          setSelectedProduct(null);
          load(); // Refresh the products list
        }}
      />
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left font-semibold text-gray-700">
      {children}
    </th>
  );
}
function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 align-top ${className || ""}`}>{children}</td>
  );
}

function CreateProductForm({
  categories,
  onCreated,
}: {
  categories: Category[];
  onCreated: (p: Product) => void;
}) {
  const luxuryCategory = categories.find((c) => c.title === "Luxury Watches");

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    categoryId: luxuryCategory ? String(luxuryCategory.id) : "0", // 👈 default to Luxury Watches if found
    tags: "",
    badges: "",
    featured: false,
    bestseller: false,
    rating: "",
    size: "",
    type: "",
    originalPrice: "",
  });

  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload: any = {
        name: form.name.trim(),
        price: Number(form.price),
        description: form.description.trim(),
        image: "/assets/default.png",  // Will be updated after creation
        categoryId: Number(form.categoryId) || null,
        tags: form.tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        badges: form.badges.trim() || null,
        featured: !!form.featured,
        bestseller: !!form.bestseller,
        rating: form.rating ? Number(form.rating) : null,
        size: form.size || null,
        type: form.type,
        originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create");
      const created = await res.json();
      onCreated(created);
      setForm({
        name: "",
        price: "",
        description: "",
        image: "",
        categoryId: "0",
        tags: "",
        badges: "",
        featured: false,
        bestseller: false,
        rating: "",
        size: "",
        type: "",
        originalPrice: "",
      });
      alert("Product created");
    } catch (e: any) {
      alert(e.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white border rounded-2xl p-4 space-y-3"
    >
      <h3 className="text-base font-semibold">Add Product</h3>
      <div className="grid grid-cols-1 gap-3">
        <Input
          label="Name"
          value={form.name}
          onChange={(v) => setForm((s) => ({ ...s, name: v }))}
          required
        />
        <Input
          label="Price (INR)"
          type="number"
          value={form.price}
          onChange={(v) => setForm((s) => ({ ...s, price: v }))}
          required
        />
        <Input
          label="Original Price (optional)"
          type="number"
          value={form.originalPrice}
          onChange={(v) => setForm((s) => ({ ...s, originalPrice: v }))}
        />

        <TextArea
          label="Description"
          value={form.description}
          onChange={(v) => setForm((s) => ({ ...s, description: v }))}
          required
        />

        <label className="text-sm">
          <div className="mb-1 font-medium">Category</div>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={form.categoryId}
            onChange={(e) => {
              setForm((s) => ({ ...s, categoryId: e.target.value }));
              // Log the selected category for debugging
              const selectedCategory = categories.find(
                (c) => c.id === Number(e.target.value)
              );
              console.log("Selected category:", selectedCategory);
            }}
          >
            <option value="0">Unassigned</option>
            {categories.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.title} (ID: {c.id})
              </option>
            ))}
          </select>
        </label>

        {/* Add this debug info below the category selector */}
        {form.categoryId !== "0" && (
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            Selected category ID: {form.categoryId} -
            {categories.find((c) => c.id === Number(form.categoryId))?.title ||
              "Unknown"}
          </div>
        )}

        <Input
          label="Tags (comma separated)"
          value={form.tags}
          onChange={(v) => setForm((s) => ({ ...s, tags: v }))}
        />
        <Input
          label="Badges (comma separated, optional)"
          value={form.badges}
          onChange={(v) => setForm((s) => ({ ...s, badges: v }))}
        />

        <div className="flex items-center gap-4">
          <Checkbox
            label="Featured"
            checked={form.featured}
            onChange={(v) => setForm((s) => ({ ...s, featured: v }))}
          />
          <Checkbox
            label="Bestseller"
            checked={form.bestseller}
            onChange={(v) => setForm((s) => ({ ...s, bestseller: v }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Rating (0-5)"
            type="number"
            value={form.rating}
            onChange={(v) => setForm((s) => ({ ...s, rating: v }))}
          />
          <Input
            label="Size (e.g. 24 inches)"
            value={form.size}
            onChange={(v) => setForm((s) => ({ ...s, size: v }))}
          />
        </div>

        <Input
          label="Type (classic/digital/analog/modern/sports/limited/etc.)"
          value={form.type}
          onChange={(v) => setForm((s) => ({ ...s, type: v }))}
        />
      </div>

      <button
        disabled={submitting}
        className="w-full mt-2 px-4 py-2 rounded-xl bg-gray-900 text-white disabled:opacity-60"
      >
        {submitting ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="text-sm">
      <div className="mb-1 font-medium">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </div>
      <input
        type={type}
        className="w-full border rounded-lg px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="text-sm">
      <div className="mb-1 font-medium">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </div>
      <textarea
        className="w-full border rounded-lg px-3 py-2 h-28 resize-vertical"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </label>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm select-none">
      <input
        type="checkbox"
        className="size-4"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

function ServiceRequests() {
  const [items, setItems] = useState<ServiceFormMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);
    try {
      const res = await fetch("/api/service-form");
      const data = await res.json();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this service request?"))
      return;

    const res = await fetch(`/api/service-form/${id}`, { method: "DELETE" });

    if (res.ok) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert("Failed to delete request.");
    }
  }

  const handleDownload = () => {
    exportToExcel(items, "ServiceRequests");
  };

  return (
    <Section
      title="Service Requests"
      subtitle="Messages submitted from the service form."
    >
      {/* Download button */}
      <div className="flex justify-end p-2">
        <button
          onClick={handleDownload}
          className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm"
        >
          Download Excel
        </button>
      </div>

      <DataTable
        loading={loading}
        headers={[
          "Name",
          "Product Type",
          "Model No",
          "Email",
          "Phone",
          "Message",
          "Created",
          "Actions",
        ]}
      >
        {items.map((m) => (
          <tr key={m.id} className="border-t">
            <Td>{m.name}</Td>
            <Td>{m.productType}</Td>
            <Td>{m.modelNo ?? "-"}</Td>
            <Td>{m.email}</Td>
            <Td>{m.phone ?? "-"}</Td>
            <Td className="max-w-[28rem]">
              <span className="line-clamp-3 block">{m.message}</span>
            </Td>
            <Td>{new Date(m.createdAt).toLocaleString("en-IN")}</Td>
            <Td>
              <button
                onClick={() => handleDelete(m.id)}
                className="px-2 py-1 text-xs rounded-lg border bg-white hover:bg-gray-100"
              >
                Delete
              </button>
            </Td>
          </tr>
        ))}
      </DataTable>
    </Section>
  );
}

function ContactMessages() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this message?")) return;
    const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
    if (res.ok) setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const handleDownload = () => exportToExcel(items, "ContactMessages");

  return (
    <Section
      title="Contact Messages"
      subtitle="Messages submitted from the contact form."
    >
      <div className="flex justify-end p-2">
        <button
          onClick={handleDownload}
          className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm"
        >
          Download Excel
        </button>
      </div>

      <DataTable
        loading={loading}
        headers={[
          "Name",
          "Subject",
          "Email",
          "Phone",
          "Message",
          "Created",
          "Actions",
        ]}
      >
        {items.map((m) => (
          <tr key={m.id} className="border-t">
            <Td>{m.name}</Td>
            <Td>{m.subject}</Td>
            <Td>{m.email}</Td>
            <Td>{m.phone ?? "-"}</Td>
            <Td className="max-w-[28rem]">
              <span className="line-clamp-3 block">{m.message}</span>
            </Td>
            <Td>{new Date(m.createdAt).toLocaleString("en-IN")}</Td>
            <Td>
              <button
                onClick={() => handleDelete(m.id)}
                className="px-2 py-1 text-xs rounded-lg border bg-white hover:bg-gray-100"
              >
                Delete
              </button>
            </Td>
          </tr>
        ))}
      </DataTable>
    </Section>
  );
}

function OrdersView() {
  const [items, setItems] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this order?")) return;
    const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
    if (res.ok) setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const handleDownload = () => exportToExcel(items, "BuyNowRequests");

  return (
    <Section
      title="Buy Now Requests"
      subtitle="Orders placed from the Buy Now form."
    >
      <div className="flex justify-end p-2">
        <button
          onClick={handleDownload}
          className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm"
        >
          Download Excel
        </button>
      </div>

      <DataTable
        loading={loading}
        headers={[
          "Name",
          "Product type",
          "quantity",
          "Installation",
          "Email",
          "Phone",
          "Company",
          "Message",
          "Created",
          "Actions",
        ]}
      >
        {items.map((m) => (
          <tr key={m.id} className="border-t">
            <Td>{m.name}</Td>
            <Td>{m.product}</Td>
            <Td>{m.quantity}</Td>
            <Td>{m.installation ?? "-"}</Td>
            <Td>{m.email}</Td>
            <Td>{m.phone}</Td>
            <Td>{m.company ?? "-"}</Td>
            <Td className="max-w-[24rem]">
              <span className="line-clamp-3 block">{m.message ?? "-"}</span>
            </Td>
            <Td>{new Date(m.createdAt).toLocaleString("en-IN")}</Td>
            <Td>
              <button
                onClick={() => handleDelete(m.id)}
                className="px-2 py-1 text-xs rounded-lg border bg-white hover:bg-gray-100"
              >
                Delete
              </button>
            </Td>
          </tr>
        ))}
      </DataTable>
    </Section>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      <div className="overflow-x-auto border rounded-2xl bg-white">
        {children}
      </div>
    </div>
  );
}

function DataTable({
  headers,
  children,
  loading,
}: {
  headers: string[];
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <table className="min-w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((h) => (
            <Th key={h}>{h}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td
              className="px-4 py-8 text-center text-gray-500"
              colSpan={headers.length}
            >
              Loading...
            </td>
          </tr>
        ) : (
          children
        )}
      </tbody>
    </table>
  );
}
