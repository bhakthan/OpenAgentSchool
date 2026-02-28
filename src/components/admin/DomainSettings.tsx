/**
 * DomainSettings — admin panel for managing custom domain mappings.
 *
 * Allows org admins to add, verify, and remove custom domains, and
 * view DNS instructions and SSL provisioning status.
 *
 * Wrapped in PermissionGate requiring `tenant.manage`.
 */

import { useCallback, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PermissionGate } from '@/lib/auth/permissions';
import {
  addDomain,
  listDomains,
  verifyDomain,
  removeDomain,
  provisionSSL,
  type DomainMapping,
} from '@/lib/api/domains';

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    verified: 'bg-green-100 text-green-800 border-green-300',
    failed: 'bg-red-100 text-red-800 border-red-300',
    provisioning: 'bg-blue-100 text-blue-800 border-blue-300',
    active: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[status] ?? 'bg-gray-100 text-gray-800 border-gray-300'}`}
    >
      {status}
    </span>
  );
}

function SSLBadge({ sslStatus }: { sslStatus: string }) {
  if (sslStatus === 'active') {
    return (
      <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        SSL Active
      </span>
    );
  }
  return <StatusBadge status={sslStatus} />;
}

function DnsInstructions({ domain }: { domain: DomainMapping }) {
  if (domain.verification_status === 'verified') return null;

  return (
    <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm">
      <p className="font-medium text-yellow-800 mb-2">DNS Verification Required</p>
      <p className="text-yellow-700 mb-2">Add the following TXT record to your DNS provider:</p>
      <div className="space-y-1 rounded bg-white p-3 font-mono text-xs border border-yellow-200">
        <p>
          <span className="text-gray-500">Type:</span>{' '}
          <span className="font-semibold text-gray-900">TXT</span>
        </p>
        <p>
          <span className="text-gray-500">Name:</span>{' '}
          <span className="font-semibold text-gray-900 break-all">{domain.dns_record.name}</span>
        </p>
        <p>
          <span className="text-gray-500">Value:</span>{' '}
          <span className="font-semibold text-gray-900 break-all">{domain.dns_record.value}</span>
        </p>
      </div>
      {domain.verification_attempts > 0 && (
        <p className="mt-2 text-xs text-yellow-600">
          Verification attempted {domain.verification_attempts} time{domain.verification_attempts > 1 ? 's' : ''}.
          DNS changes can take up to 48 hours to propagate.
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

function DomainSettingsInner() {
  const [domains, setDomains] = useState<DomainMapping[]>([]);
  const [newDomain, setNewDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const fetchDomains = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listDomains();
      setDomains(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load domains';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  const handleAdd = async () => {
    if (!newDomain.trim()) return;
    setActionLoading('add');
    setError(null);
    setSuccessMessage(null);
    try {
      await addDomain(newDomain.trim().toLowerCase());
      setNewDomain('');
      setSuccessMessage('Domain added! Follow the DNS instructions below to verify ownership.');
      await fetchDomains();
    } catch (err: unknown) {
      const detail =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
        (err instanceof Error ? err.message : 'Failed to add domain');
      setError(detail);
    } finally {
      setActionLoading(null);
    }
  };

  const handleVerify = async (id: string) => {
    setActionLoading(id);
    setError(null);
    setSuccessMessage(null);
    try {
      const result = await verifyDomain(id);
      setSuccessMessage(result.message);
      await fetchDomains();
    } catch (err: unknown) {
      const detail =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
        (err instanceof Error ? err.message : 'Verification failed');
      setError(detail);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemove = async (id: string) => {
    setActionLoading(id);
    setError(null);
    setSuccessMessage(null);
    try {
      await removeDomain(id);
      setConfirmDelete(null);
      setSuccessMessage('Domain removed successfully.');
      await fetchDomains();
    } catch (err: unknown) {
      const detail =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
        (err instanceof Error ? err.message : 'Failed to remove domain');
      setError(detail);
    } finally {
      setActionLoading(null);
    }
  };

  const handleProvisionSSL = async (id: string) => {
    setActionLoading(id);
    setError(null);
    setSuccessMessage(null);
    try {
      const result = await provisionSSL(id);
      setSuccessMessage(result.message);
      await fetchDomains();
    } catch (err: unknown) {
      const detail =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
        (err instanceof Error ? err.message : 'SSL provisioning failed');
      setError(detail);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Domains</CardTitle>
        <CardDescription>
          Map your own domain to your Open Agent School workspace. After adding a domain,
          you&apos;ll need to verify ownership by adding a DNS TXT record.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Messages */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        {/* Add Domain Form */}
        <div className="flex gap-3">
          <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="e.g. learning.acme.com"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
          <button
            onClick={handleAdd}
            disabled={actionLoading === 'add' || !newDomain.trim()}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {actionLoading === 'add' ? 'Adding…' : 'Add Domain'}
          </button>
        </div>

        {/* Domain List */}
        {loading && domains.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-500">Loading domains…</div>
        ) : domains.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-500">
            No custom domains configured. Add one above to get started.
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700">
            {domains.map((d) => (
              <div key={d.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900 dark:text-gray-100">{d.domain}</span>
                    <StatusBadge status={d.verification_status} />
                    <SSLBadge sslStatus={d.ssl_status} />
                  </div>
                  <div className="flex items-center gap-2">
                    {d.verification_status !== 'verified' && (
                      <button
                        onClick={() => handleVerify(d.id)}
                        disabled={actionLoading === d.id}
                        className="rounded-md border border-blue-300 bg-white px-3 py-1.5 text-xs font-medium text-blue-700 shadow-sm hover:bg-blue-50 disabled:opacity-50 dark:border-blue-600 dark:bg-gray-800 dark:text-blue-400"
                      >
                        {actionLoading === d.id ? 'Checking…' : 'Verify'}
                      </button>
                    )}
                    {d.is_active && d.ssl_status === 'pending' && (
                      <button
                        onClick={() => handleProvisionSSL(d.id)}
                        disabled={actionLoading === d.id}
                        className="rounded-md border border-green-300 bg-white px-3 py-1.5 text-xs font-medium text-green-700 shadow-sm hover:bg-green-50 disabled:opacity-50 dark:border-green-600 dark:bg-gray-800 dark:text-green-400"
                      >
                        Provision SSL
                      </button>
                    )}
                    {confirmDelete === d.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleRemove(d.id)}
                          disabled={actionLoading === d.id}
                          className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                        >
                          {actionLoading === d.id ? 'Removing…' : 'Confirm'}
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(d.id)}
                        className="rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 shadow-sm hover:bg-red-50 disabled:opacity-50 dark:border-red-600 dark:bg-gray-800 dark:text-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                <DnsInstructions domain={d} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported (gated) component                                         */
/* ------------------------------------------------------------------ */

export default function DomainSettings() {
  return (
    <PermissionGate
      permission="tenant.manage"
      fallback={
        <Card>
          <CardContent className="py-8 text-center text-sm text-gray-500">
            You need the <strong>tenant.manage</strong> permission to configure custom domains.
          </CardContent>
        </Card>
      }
    >
      <DomainSettingsInner />
    </PermissionGate>
  );
}
