"use client";

import { useEffect, useState } from "react";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { adminNav } from "@/components/dashboard/nav";

type SettingMap = Record<string, string>;

const fields = [
  { key: "support_email", label: "Support Email", placeholder: "help@ailawacademy.in" },
  { key: "support_whatsapp", label: "Support WhatsApp", placeholder: "+91XXXXXXXXXX" },
  { key: "certificate_disclaimer", label: "Certificate Disclaimer", placeholder: "Certificate confirms course completion only." },
  { key: "payment_instructions", label: "Payment Instructions", placeholder: "UPI/Card/Net banking details" },
  { key: "brand_tagline", label: "Branding Tagline", placeholder: "Legal-Tech Learning Platform" },
  { key: "social_links", label: "Social/Contact Links", placeholder: "LinkedIn, YouTube, Website" }
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingMap>({});
  const [msg, setMsg] = useState("Loading settings...");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (!res.ok) return setMsg(data.error || "Failed to load settings");
      const mapped = (data.settings as Array<{ key: string; value: string }>).reduce<SettingMap>((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
      setSettings(mapped);
      setMsg("");
    }

    void loadSettings();
  }, []);

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const payload = fields.map((field) => ({ key: field.key, value: settings[field.key] || "" }));
    const res = await fetch("/api/admin/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ settings: payload }) });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) return setMsg(data.error || "Failed to save settings");
    setMsg("Settings saved successfully.");
  }

  return <SidebarLayout title="Admin Control" subtitle="Platform settings" nav={[...adminNav]} activeHref="/admin/settings">
    <h1>Settings</h1>
    <form className="card" onSubmit={saveSettings}>
      <div className="grid grid-2">{fields.map((field) => <label key={field.key}>{field.label}<input value={settings[field.key] || ""} placeholder={field.placeholder} onChange={(e) => setSettings((p) => ({ ...p, [field.key]: e.target.value }))} /></label>)}</div>
      <button className="btn" style={{ marginTop: 12 }} disabled={saving}>{saving ? "Saving..." : "Save Settings"}</button>
      {!!msg && <p className="alert alert-info">{msg}</p>}
    </form>
  </SidebarLayout>;
}
