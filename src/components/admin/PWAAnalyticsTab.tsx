/**
 * PWA Analytics Tab — Admin dashboard section for PWA install metrics
 * and service-worker health status.
 *
 * Data sources:
 *   • Install events   — localStorage ledger written by InstallAppMenuItem
 *   • SW / cache state — real-time ServiceWorkerContainer & StorageManager APIs
 *   • GA4              — instructions / deep-link to GA4 console
 */

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowClockwise,
  CheckCircle,
  DeviceMobile,
  Desktop,
  AppleLogo,
  CloudArrowDown,
  HardDrives,
  WifiHigh,
  WifiSlash,
  ChartLineUp,
  Gauge,
} from '@phosphor-icons/react';
import { getPWAInstallLog } from '@/components/pwa/InstallAppMenuItem';

// ── Types ────────────────────────────────────────────────────────────

interface SWStatus {
  registered: boolean;
  state: string; // 'activated' | 'installing' | 'waiting' | 'redundant' | 'none'
  scope?: string;
  scriptURL?: string;
}

interface StorageEstimate {
  quota: number;   // bytes
  usage: number;   // bytes
  percent: number;
}

interface InstallSummary {
  total: number;
  byPlatform: Record<string, number>;
  byMethod: Record<string, number>;
  last7Days: number;
  last30Days: number;
  recentEvents: Array<{ timestamp: string; platform: string; method: string }>;
}

// ── Helpers ──────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

function summarizeInstalls(): InstallSummary {
  const log = getPWAInstallLog();
  const now = Date.now();
  const d7 = 7 * 24 * 60 * 60 * 1000;
  const d30 = 30 * 24 * 60 * 60 * 1000;

  const byPlatform: Record<string, number> = {};
  const byMethod: Record<string, number> = {};
  let last7 = 0;
  let last30 = 0;

  for (const entry of log) {
    const ts = new Date(entry.timestamp).getTime();
    byPlatform[entry.platform] = (byPlatform[entry.platform] || 0) + 1;
    byMethod[entry.method] = (byMethod[entry.method] || 0) + 1;
    if (now - ts <= d7) last7++;
    if (now - ts <= d30) last30++;
  }

  return {
    total: log.length,
    byPlatform,
    byMethod,
    last7Days: last7,
    last30Days: last30,
    recentEvents: log.slice(-10).reverse(),
  };
}

async function getSWStatus(): Promise<SWStatus> {
  if (!('serviceWorker' in navigator)) {
    return { registered: false, state: 'unsupported' };
  }
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) return { registered: false, state: 'none' };
    const sw = reg.active || reg.waiting || reg.installing;
    return {
      registered: true,
      state: sw?.state ?? 'unknown',
      scope: reg.scope,
      scriptURL: sw?.scriptURL,
    };
  } catch {
    return { registered: false, state: 'error' };
  }
}

async function getStorageEstimate(): Promise<StorageEstimate> {
  if (!navigator.storage?.estimate) return { quota: 0, usage: 0, percent: 0 };
  const { quota = 0, usage = 0 } = await navigator.storage.estimate();
  return { quota, usage, percent: quota > 0 ? Math.round((usage / quota) * 100) : 0 };
}

// ── Platform icon helper ─────────────────────────────────────────────

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === 'ios') return <AppleLogo className="w-4 h-4" weight="fill" />;
  if (platform === 'android') return <DeviceMobile className="w-4 h-4" weight="fill" />;
  return <Desktop className="w-4 h-4" weight="fill" />;
}

// ── Component ────────────────────────────────────────────────────────

export function PWAAnalyticsTab() {
  const [swStatus, setSWStatus] = useState<SWStatus | null>(null);
  const [storage, setStorage] = useState<StorageEstimate | null>(null);
  const [installs, setInstalls] = useState<InstallSummary | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const refresh = async () => {
      const [sw, st] = await Promise.all([getSWStatus(), getStorageEstimate()]);
      setSWStatus(sw);
      setStorage(st);
      setInstalls(summarizeInstalls());
    };
    refresh();

    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, [refreshKey]);

  const handleRefresh = () => setRefreshKey((k) => k + 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">PWA Analytics</h3>
        <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
          <ArrowClockwise className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* ── Summary Cards ──────────────────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Installs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Installs</CardTitle>
            <CloudArrowDown className="h-4 w-4 text-muted-foreground" weight="duotone" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{installs?.total ?? '—'}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All-time install events (this device)
            </p>
          </CardContent>
        </Card>

        {/* Last 7 Days */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 7 Days</CardTitle>
            <ChartLineUp className="h-4 w-4 text-muted-foreground" weight="duotone" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{installs?.last7Days ?? '—'}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Recent install events
            </p>
          </CardContent>
        </Card>

        {/* SW Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Worker</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" weight="duotone" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {swStatus?.state === 'activated' ? (
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                  <CheckCircle className="w-3 h-3 mr-1" weight="fill" />
                  Active
                </Badge>
              ) : (
                <Badge variant="secondary">
                  {swStatus?.state ?? 'checking…'}
                </Badge>
              )}
            </div>
            {swStatus?.scope && (
              <p className="text-xs text-muted-foreground mt-1 truncate" title={swStatus.scope}>
                Scope: {swStatus.scope}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Connectivity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connectivity</CardTitle>
            {isOnline ? (
              <WifiHigh className="h-4 w-4 text-emerald-500" weight="fill" />
            ) : (
              <WifiSlash className="h-4 w-4 text-red-500" weight="fill" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isOnline ? 'Online' : 'Offline'}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Current network status
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── Storage Usage ──────────────────────────────────────────── */}
      {storage && storage.quota > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <HardDrives className="w-4 h-4 text-muted-foreground" weight="duotone" />
              <CardTitle className="text-base">Cache Storage</CardTitle>
            </div>
            <CardDescription>
              {formatBytes(storage.usage)} of {formatBytes(storage.quota)} used ({storage.percent}%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${Math.min(storage.percent, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Installs by Platform ───────────────────────────────────── */}
      {installs && installs.total > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* By Platform */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Installs by Platform</CardTitle>
              <CardDescription>Breakdown of install events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(installs.byPlatform).map(([platform, count]) => (
                  <div key={platform} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <PlatformIcon platform={platform} />
                      <span className="capitalize">{platform}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold">{count}</span>
                      <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(count / installs.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* By Method */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Install Method</CardTitle>
              <CardDescription>How users installed the PWA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(installs.byMethod).map(([method, count]) => (
                  <div key={method} className="flex items-center justify-between">
                    <span className="text-sm capitalize">
                      {method === 'prompt' ? 'Install Prompt' : method === 'manual' ? 'Manual (iOS)' : 'Browser Event'}
                    </span>
                    <span className="font-mono text-sm font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Recent Install Events ──────────────────────────────────── */}
      {installs && installs.recentEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Install Events</CardTitle>
            <CardDescription>Last {installs.recentEvents.length} events logged on this device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-2 px-3 font-medium">Date</th>
                    <th className="text-left py-2 px-3 font-medium">Platform</th>
                    <th className="text-left py-2 px-3 font-medium">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {installs.recentEvents.map((ev, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2 px-3 text-muted-foreground text-xs">
                        {new Date(ev.timestamp).toLocaleString(undefined, {
                          month: 'short', day: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-1.5">
                          <PlatformIcon platform={ev.platform} />
                          <span className="capitalize">{ev.platform}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 capitalize">
                        {ev.method === 'prompt' ? 'Install Prompt' : ev.method === 'manual' ? 'Manual (iOS)' : 'Browser Event'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── GA4 Deep-Link guidance ─────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Full Analytics in GA4</CardTitle>
          <CardDescription>
            Cross-device PWA install data is tracked via Google Analytics 4 events.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              The following GA4 events are tracked automatically:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><code className="text-xs bg-muted px-1 rounded">pwa_install</code> — User accepted the install prompt or browser confirmed install</li>
              <li><code className="text-xs bg-muted px-1 rounded">pwa_install_prompt_shown</code> — Install dialog was opened</li>
              <li><code className="text-xs bg-muted px-1 rounded">pwa_install_dismissed</code> — User declined the install prompt</li>
            </ul>
            <p className="text-xs mt-3">
              View aggregate data in{' '}
              <a
                href="https://analytics.google.com/analytics/web/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                GA4 → Events → pwa_install
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
