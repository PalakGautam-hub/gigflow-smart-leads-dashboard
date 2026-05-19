import type { Lead } from '@/types';

export const exportLeadsToCSV = (leads: Lead[], filename = 'leads'): void => {
  const headers = ['Name', 'Email', 'Status', 'Source', 'Created At'];
  const csvRows = [
    headers.join(','),
    ...leads.map((lead) =>
      [
        `"${lead.name}"`,
        `"${lead.email}"`,
        lead.status,
        lead.source,
        new Date(lead.createdAt).toLocaleDateString(),
      ].join(',')
    ),
  ];

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
