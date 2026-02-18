/**
 * Rendu simplifie de markdown en fragments HTML.
 * Gere : titres (##, ###), tableaux, listes, gras (**), code (`), paragraphes.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderInline(text: string): string {
  let result = escapeHtml(text);
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/`(.+?)`/g, '<code class="bg-gray-800 px-1 rounded text-sm">$1</code>');
  return result;
}

function renderTable(tableLines: string[]): string {
  const rows = tableLines.filter((l) => !/^\|[-\s|:]+\|$/.test(l));
  if (rows.length === 0) return '';

  const firstRow = rows[0] ?? '';
  const parseRow = (row: string): string[] =>
    row.split('|').slice(1, -1).map((c) => c.trim());

  const headerCells = parseRow(firstRow);
  const headerHtml = headerCells
    .map((c) => `<th class="px-3 py-1.5 text-left text-gray-300 font-semibold border-b border-gray-700">${renderInline(c)}</th>`)
    .join('');

  const bodyRows = rows.slice(1).map((row) => {
    const cells = parseRow(row);
    const cellsHtml = cells
      .map((c) => `<td class="px-3 py-1 text-gray-400 border-b border-gray-800">${renderInline(c)}</td>`)
      .join('');
    return `<tr>${cellsHtml}</tr>`;
  }).join('');

  return `<table class="w-full text-sm mb-4"><thead><tr>${headerHtml}</tr></thead><tbody>${bodyRows}</tbody></table>`;
}

function getLine(lines: string[], index: number): string {
  return lines[index] ?? '';
}

export function renderMarkdown(markdown: string): string {
  const lines = markdown.split('\n');
  const htmlParts: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = getLine(lines, i);

    if (line.trim() === '') {
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      htmlParts.push(`<h2 class="text-base font-bold text-gray-100 mt-5 mb-2">${renderInline(line.slice(3))}</h2>`);
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      htmlParts.push(`<h3 class="text-sm font-semibold text-gray-200 mt-4 mb-1.5">${renderInline(line.slice(4))}</h3>`);
      i++;
      continue;
    }

    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableAcc: string[] = [];
      while (i < lines.length && getLine(lines, i).trim().startsWith('|')) {
        tableAcc.push(getLine(lines, i));
        i++;
      }
      htmlParts.push(renderTable(tableAcc));
      continue;
    }

    if (line.trim().startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && getLine(lines, i).trim().startsWith('- ')) {
        listItems.push(getLine(lines, i).trim().slice(2));
        i++;
      }
      const itemsHtml = listItems
        .map((item) => `<li class="text-gray-400">${renderInline(item)}</li>`)
        .join('');
      htmlParts.push(`<ul class="list-disc list-inside mb-3 space-y-0.5 text-sm">${itemsHtml}</ul>`);
      continue;
    }

    if (/^\d+\.\s/.test(line.trim())) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(getLine(lines, i).trim())) {
        listItems.push(getLine(lines, i).trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      const itemsHtml = listItems
        .map((item) => `<li class="text-gray-400">${renderInline(item)}</li>`)
        .join('');
      htmlParts.push(`<ol class="list-decimal list-inside mb-3 space-y-0.5 text-sm">${itemsHtml}</ol>`);
      continue;
    }

    htmlParts.push(`<p class="text-sm text-gray-400 mb-2">${renderInline(line.trim())}</p>`);
    i++;
  }

  return htmlParts.join('');
}
