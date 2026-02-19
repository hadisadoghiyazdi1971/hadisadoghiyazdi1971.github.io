export async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw await res.json().catch(() => ({}));
  return res.json() as Promise<T>;
}
export async function postBlob(url: string, body: unknown): Promise<Blob> {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw await res.json().catch(() => ({}));
  return res.blob();
}
