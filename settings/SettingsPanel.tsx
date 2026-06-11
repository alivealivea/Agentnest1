"use client";

import { useState } from "react";
import type { AIProviderConfig, AppSettings } from "@/types";
import { mockProviders } from "@/lib/ai-providers/mockProviders";

interface Props {
  settings: AppSettings;
  providers: AIProviderConfig[];
  onUpdateSettings: (settings: AppSettings) => Promise<void>;
  onUpdateProvider: (provider: AIProviderConfig) => Promise<void>;
  onDeleteProvider: (id: string) => Promise<void>;
}

export function SettingsPanel({ settings, providers, onUpdateSettings, onUpdateProvider, onDeleteProvider }: Props) {
  const [testing, setTesting] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function testProvider(config: AIProviderConfig) {
    setTesting(config.id);
    const provider = mockProviders.find((item) => item.id === config.providerKey) ?? mockProviders[0];
    const ok = await provider.testConnection(config);
    setMessage(ok ? `${config.name} mock connection succeeded.` : `${config.name} mock connection failed.`);
    setTesting(null);
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <div className="panel p-5">
        <p className="eyebrow">Settings</p>
        <h2 className="text-2xl font-black text-charcoal">Local-first control center</h2>
        <div className="mt-5 space-y-4">
          <label className="label">App name<input className="input" value={settings.appName} onChange={(event) => onUpdateSettings({ ...settings, appName: event.target.value })} /></label>
          <label className="label">Monthly target min<input className="input" type="number" value={settings.monthlyTargetMin} onChange={(event) => onUpdateSettings({ ...settings, monthlyTargetMin: Number(event.target.value) })} /></label>
          <label className="label">Monthly target max<input className="input" type="number" value={settings.monthlyTargetMax} onChange={(event) => onUpdateSettings({ ...settings, monthlyTargetMax: Number(event.target.value) })} /></label>
          {[
            ["publicMode", "Public demo mode"],
            ["hideClientNames", "Hide client names"],
            ["hideMoney", "Hide money amounts"]
          ].map(([key, label]) => (
            <label key={key} className="flex items-center justify-between rounded-2xl bg-white p-3 text-sm font-bold text-charcoal shadow-sm">
              {label}
              <input type="checkbox" checked={Boolean(settings[key as keyof AppSettings])} onChange={(event) => onUpdateSettings({ ...settings, [key]: event.target.checked })} />
            </label>
          ))}
        </div>
      </div>
      <div className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Mock AI providers</p>
            <h3 className="text-xl font-black text-charcoal">Model-agnostic adapters</h3>
          </div>
          {message ? <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-600">{message}</span> : null}
        </div>
        <p className="mt-3 rounded-2xl bg-amber-50 p-3 text-sm text-amber-800">API keys are stored only in browser IndexedDB for this MVP. This is convenient for local demos, but not ideal for public deployment.</p>
        <div className="mt-5 grid gap-4">
          {providers.map((config) => (
            <article key={config.id} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="grid gap-3 md:grid-cols-3">
                <label className="label">Provider name<input className="input" value={config.name} onChange={(event) => onUpdateProvider({ ...config, name: event.target.value })} /></label>
                <label className="label">Provider<select className="input" value={config.providerKey} onChange={(event) => onUpdateProvider({ ...config, providerKey: event.target.value })}>{mockProviders.map((provider) => <option key={provider.id} value={provider.id}>{provider.name}</option>)}</select></label>
                <label className="label">Model<input className="input" value={config.modelName} onChange={(event) => onUpdateProvider({ ...config, modelName: event.target.value })} /></label>
                <label className="label">API key<input className="input" type="password" value={config.apiKey ?? ""} onChange={(event) => onUpdateProvider({ ...config, apiKey: event.target.value })} /></label>
                <label className="label">Base URL<input className="input" value={config.baseUrl ?? ""} onChange={(event) => onUpdateProvider({ ...config, baseUrl: event.target.value })} /></label>
                <label className="label">Temperature<input className="input" type="number" step="0.1" value={config.temperature} onChange={(event) => onUpdateProvider({ ...config, temperature: Number(event.target.value) })} /></label>
              </div>
              <label className="label mt-3">System prompt<textarea className="input min-h-20" value={config.systemPrompt ?? ""} onChange={(event) => onUpdateProvider({ ...config, systemPrompt: event.target.value })} /></label>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button className="btn" onClick={() => onUpdateProvider({ ...config, enabled: !config.enabled })}>{config.enabled ? "Disable" : "Enable"}</button>
                <button className="btn-secondary" onClick={() => testProvider(config)} disabled={testing === config.id}>{testing === config.id ? "Testing..." : "Test connection"}</button>
                <button className="btn-danger" onClick={() => onDeleteProvider(config.id)}>Delete key/config</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
