export function downloadTextFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function escapeCsvValue(value: unknown): string {
  const raw = value == null ? '' : String(value);
  const mustQuote = /[\",\n\r]/.test(raw);
  const escaped = raw.replace(/\"/g, '""');
  return mustQuote ? `"${escaped}"` : escaped;
}

export function toCsv(rows: Array<Record<string, unknown>>): string {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];

  for (const row of rows) {
    lines.push(headers.map((h) => escapeCsvValue(row[h])).join(','));
  }

  return lines.join('\n');
}

export async function exportElementToPdf(options: {
  element: HTMLElement;
  filename: string;
  title?: string;
}) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf')
  ]);

  const canvas = await html2canvas(options.element, {
    backgroundColor: '#ffffff',
    scale: 2
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const margin = 32;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;

  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
  const renderWidth = imgWidth * scale;
  const renderHeight = imgHeight * scale;

  const x = (pageWidth - renderWidth) / 2;
  const y = (pageHeight - renderHeight) / 2;

  if (options.title) {
    pdf.setFontSize(14);
    pdf.text(options.title, margin, margin);
  }

  pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight);
  pdf.save(options.filename);
}
