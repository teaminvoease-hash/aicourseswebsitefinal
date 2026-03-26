"use client";

import { useEffect, useState } from "react";

type SettingMap = Record<string, string>;

const fields: Array<{ key: string; label: string; placeholder: string }> = [
  { key: "smtp_host", label: "SMTP Host", placeholder: "smtp.example.com" },
  { key: "smtp_port", label: "SMTP Port", placeholder: "587" },
  { key: "smtp_user", label: "SMTP Username", placeholder: "noreply@example.com" },
  { key: "smtp_pass", label: "SMTP Password", placeholder: "app-password" },
  { key: "from_email", label: "From Email", placeholder: "support@ailawacademy.in" },
  { key: "support_email", label: "Support Email", placeholder: "help@ailawacademy.in" }
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

    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: payload })
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) return setMsg(data.error || "Failed to save settings");
    setMsg("Settings saved successfully.");
  }

  return (
    <section>
      <h1>Platform Settings</h1>
      <p className="small">Configure SMTP and communication defaults for student notifications.</p>
      <form className="card" onSubmit={saveSettings} style={{ maxWidth: 680, marginTop: 12 }}>
        <div className="grid grid-2">
          {fields.map((field) => (
            <label key={field.key}>
              {field.label}
              <input
                value={settings[field.key] || ""}
                placeholder={field.placeholder}
                onChange={(e) => setSettings((prev) => ({ ...prev, [field.key]: e.target.value }))}
                type={field.key.includes("pass") ? "password" : "text"}
              />
            </label>
          ))}
        </div>
        <button className="btn" style={{ marginTop: 12 }} type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </button>
        {!!msg && <p style={{ marginTop: 10 }}>{msg}</p>}
      </form>
    </section>
  );
}
