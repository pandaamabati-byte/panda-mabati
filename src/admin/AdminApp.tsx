import { useEffect, useState, type FormEvent } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ArrowLeft, ImagePlus, LogOut, PackagePlus, Save, ShieldCheck, Trash2 } from "lucide-react";
import { auth, db, storage } from "../services/firebase/client";
import "./admin.css";

type ProductRecord = {
  id: string; name: string; short: string; description: string; use: string; tone: string;
  published: boolean; priceStatus: "pending" | "confirmed"; unitPriceKes?: number;
  priceUnit?: string; effectiveCoverageM?: number; imageUrl?: string; sourceUrl?: string;
};
const empty: ProductRecord = {
  id: "", name: "", short: "", description: "", use: "Residential roofing", tone: "box",
  published: false, priceStatus: "pending", priceUnit: "To confirm",
};
const slug = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function AdminApp() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [form, setForm] = useState<ProductRecord>(empty);
  const [photo, setPhoto] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!auth) { setChecking(false); return; }
    return onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (!nextUser) { setIsAdmin(false); setProducts([]); setChecking(false); return; }
      try {
        const token = await nextUser.getIdTokenResult(true);
        const allowed = token.claims.admin === true;
        setIsAdmin(allowed);
        if (allowed && db) {
          const snapshot = await getDocs(collection(db, "products"));
          setProducts(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as ProductRecord)));
        }
      } catch {
        setMessage("Could not verify administrator access. Refresh and try again.");
        setIsAdmin(false);
      } finally { setChecking(false); }
    });
  }, []);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    if (!auth) return setMessage("Firebase is not configured for this deployment.");
    setBusy(true); setMessage("");
    try {
      const result = await signInWithEmailAndPassword(auth, email.trim(), password);
      const token = await result.user.getIdTokenResult(true);
      if (token.claims.admin !== true) {
        await signOut(auth);
        setMessage("This account is not authorised as a Panda Mabati administrator.");
      }
    } catch { setMessage("Sign-in failed. Check your email and password, then try again."); }
    finally { setBusy(false); }
  };

  const edit = (product: ProductRecord) => { setForm({ ...empty, ...product }); setPhoto(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (!db || !user) return;
    const id = form.id || slug(form.name);
    if (!id || !form.name.trim()) return setMessage("Enter a product name.");
    if (form.priceStatus === "confirmed" && (!form.unitPriceKes || form.unitPriceKes <= 0 || !(form.priceUnit || "").trim() || form.priceUnit === "To confirm")) {
      return setMessage("A confirmed price needs a positive amount and an explicit pricing unit.");
    }
    setBusy(true); setMessage("");
    try {
      let imageUrl = form.imageUrl || "";
      if (photo) {
        if (!storage) throw new Error("Firebase Storage is not configured.");
        if (!photo.type.startsWith("image/") || photo.size > 5 * 1024 * 1024) throw new Error("Choose an image under 5 MB.");
        const imageRef = ref(storage, `products/${id}/${Date.now()}-${photo.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`);
        await uploadBytes(imageRef, photo, { contentType: photo.type });
        imageUrl = await getDownloadURL(imageRef);
      }
      const payload = {
        name: form.name.trim(), short: form.short.trim(), description: form.description.trim(),
        use: form.use.trim(), tone: form.tone.trim(), published: form.published,
        priceStatus: form.priceStatus, ...(form.priceStatus === "confirmed" ? { unitPriceKes: Number(form.unitPriceKes), priceUnit: (form.priceUnit || "").trim() } : { unitPriceKes: null, priceUnit: "To confirm" }),
        effectiveCoverageM: form.effectiveCoverageM ? Number(form.effectiveCoverageM) : null,
        imageUrl, sourceUrl: (form.sourceUrl || "").trim(), updatedAt: new Date().toISOString(), updatedBy: user.uid,
      };
      await setDoc(doc(db, "products", id), payload, { merge: true });
      const updated = { ...payload, id } as ProductRecord;
      setProducts((current) => [updated, ...current.filter((item) => item.id !== id)]);
      setForm(empty); setPhoto(null); setMessage("Product saved. Public visibility follows the Published switch.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not save this product."); }
    finally { setBusy(false); }
  };

  const remove = async (product: ProductRecord) => {
    if (!db || !window.confirm(`Permanently delete ${product.name}?`)) return;
    setBusy(true);
    try { await deleteDoc(doc(db, "products", product.id)); setProducts((items) => items.filter((item) => item.id !== product.id)); if (form.id === product.id) setForm(empty); setMessage("Product deleted."); }
    catch { setMessage("Delete failed. Confirm administrator access and try again."); }
    finally { setBusy(false); }
  };

  if (checking) return <main className="admin-shell"><p>Verifying secure access…</p></main>;
  if (!user || !isAdmin) return (
    <main className="admin-shell admin-auth">
      <a className="admin-back" href="/"><ArrowLeft size={16}/> Back to storefront</a>
      <div className="admin-brand"><ShieldCheck size={25}/><span>PANDA MABATI <small>SECURE ADMINISTRATION</small></span></div>
      <form className="admin-panel admin-login" onSubmit={login}>
        <p className="admin-eyebrow">STAFF ACCESS</p><h1>Sign in to manage products.</h1>
        <label>Email address<input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)}/></label>
        <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}/></label>
        <button className="admin-primary" disabled={busy}>{busy ? "Checking…" : "Secure sign in"}</button>
        {message && <p className="admin-message" role="status">{message}</p>}
        <p className="admin-hint">Access is granted only to Firebase accounts with the server-assigned <code>admin</code> claim.</p>
      </form>
    </main>
  );

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <a className="admin-brand" href="/"><ShieldCheck size={25}/><span>PANDA MABATI <small>ADMIN CONSOLE</small></span></a>
        <div className="admin-user"><span>{user.email}</span><button onClick={() => void signOut(auth!)}><LogOut size={16}/> Sign out</button></div>
      </header>
      <div className="admin-content">
        <div className="admin-heading"><div><p className="admin-eyebrow">CATALOGUE CONTROL</p><h1>Products & pricing</h1><p>Draft safely, verify commercial details, then publish approved products.</p></div><span className="admin-secure"><ShieldCheck size={16}/> Admin verified</span></div>
        <div className="admin-grid">
          <form className="admin-panel admin-editor" onSubmit={save}>
            <div className="admin-panel-heading"><h2>{form.id ? "Edit product" : "Add a product"}</h2><PackagePlus size={20}/></div>
            <label>Product name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Box Profile"/></label>
            <label>Short description<input required value={form.short} onChange={(e) => setForm({ ...form, short: e.target.value })}/></label>
            <label>Full description<textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}/></label>
            <div className="admin-two"><label>Best suited for<input value={form.use} onChange={(e) => setForm({ ...form, use: e.target.value })}/></label><label>Artwork tone<input value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })}/></label></div>
            <label>Manufacturer/source URL<input type="url" value={form.sourceUrl || ""} onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })} placeholder="https://…"/></label>
            <label>Product photograph<input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] || null)}/><small>Optional image upload · maximum 5 MB</small></label>
            {form.imageUrl && !photo && <p className="admin-hint">An image is already attached to this product.</p>}
            <div className="admin-price-box"><h3>Commercial price</h3><label>Approval status<select value={form.priceStatus} onChange={(e) => setForm({ ...form, priceStatus: e.target.value as ProductRecord["priceStatus"] })}><option value="pending">Pending verification</option><option value="confirmed">Confirmed and approved</option></select></label>
              {form.priceStatus === "confirmed" && <div className="admin-two"><label>Price (KES)<input type="number" min="0.01" step="0.01" required value={form.unitPriceKes ?? ""} onChange={(e) => setForm({ ...form, unitPriceKes: Number(e.target.value) })}/></label><label>Pricing unit<input required value={form.priceUnit || ""} onChange={(e) => setForm({ ...form, priceUnit: e.target.value })} placeholder="e.g. per metre"/></label></div>}
              {form.priceStatus === "pending" && <p className="admin-hint">No price is published until amount, unit and approval are confirmed.</p>}
            </div>
            <label>Effective coverage (metres)<input type="number" min="0" step="0.001" value={form.effectiveCoverageM ?? ""} onChange={(e) => setForm({ ...form, effectiveCoverageM: Number(e.target.value) || undefined })}/></label>
            <label className="admin-check"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })}/> Publish on public storefront</label>
            <div className="admin-form-actions"><button className="admin-primary" disabled={busy}><Save size={16}/> {busy ? "Saving…" : "Save product"}</button><button type="button" className="admin-secondary" onClick={() => { setForm(empty); setPhoto(null); }}>Clear form</button></div>
            {message && <p className="admin-message" role="status">{message}</p>}
          </form>
          <section className="admin-panel admin-products"><div className="admin-panel-heading"><h2>Catalogue</h2><span>{products.length} items</span></div>
            {products.length === 0 ? <div className="admin-empty"><PackagePlus size={28}/><p>No products yet. Add your first product.</p></div> : products.map((product) => <article className="admin-product" key={product.id}>
              <div className="admin-product-copy"><strong>{product.name}</strong><small>{product.id}</small><div className="admin-tags"><span className={product.published ? "tag-live" : "tag-draft"}>{product.published ? "Published" : "Draft"}</span><span>{product.priceStatus === "confirmed" ? `KES ${product.unitPriceKes} · ${product.priceUnit}` : "Price pending"}</span></div></div>
              <div className="admin-product-actions"><button onClick={() => edit(product)}>Edit</button><button aria-label={`Delete ${product.name}`} onClick={() => void remove(product)}><Trash2 size={15}/></button></div>
            </article>)}
          </section>
        </div>
        <p className="admin-footnote"><ImagePlus size={15}/> Product images are publicly readable on the storefront; only administrators can upload, replace or delete them.</p>
      </div>
    </main>
  );
}
