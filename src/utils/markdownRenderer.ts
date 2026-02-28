/**
 * Rendu simplifie de markdown en fragments HTML.
 * Gere : titres (#-####), tableaux, listes (avec imbrication),
 * gras, code inline et blocs, liens, blockquotes, regles horizontales, paragraphes.
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
  result = result.replace(/\[([^\]]+)\]\([^)]+\)/g, '<span class="text-blue-400">$1</span>');
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

function getIndentDepth(line: string): number {
  const match = line.match(/^(\s*)/);
  return Math.floor((match?.[1]?.length ?? 0) / 2);
}

const DEPTH_CLASSES = ['', 'pl-6', 'pl-12'] as const;

export function renderMarkdown(markdown: string): string {
  const lines = markdown.split('\n');
  const htmlParts: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = getLine(lines, i);
    const trimmed = line.trim();

    if (trimmed === '') {
      i++;
      continue;
    }

    if (line.startsWith('# ')) {
      htmlParts.push(`<h2 class="text-lg font-bold text-gray-100 mt-6 mb-3">${renderInline(line.slice(2))}</h2>`);
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

    if (line.startsWith('#### ')) {
      htmlParts.push(`<h4 class="text-sm font-medium text-gray-300 mt-3 mb-1">${renderInline(line.slice(5))}</h4>`);
      i++;
      continue;
    }

    if (/^-{3,}$/.test(trimmed)) {
      htmlParts.push('<hr class="border-gray-700 my-4" />');
      i++;
      continue;
    }

    if (trimmed.startsWith('```')) {
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !getLine(lines, i).trim().startsWith('```')) {
        codeLines.push(getLine(lines, i));
        i++;
      }
      if (i < lines.length) i++;
      const codeHtml = codeLines.map(escapeHtml).join('\n');
      htmlParts.push(
        `<pre class="bg-gray-800 rounded p-3 text-sm text-gray-300 overflow-x-auto mb-3 whitespace-pre"><code>${codeHtml}</code></pre>`,
      );
      continue;
    }

    if (trimmed.startsWith('> ') || trimmed === '>') {
      const quoteLines: string[] = [];
      while (i < lines.length) {
        const ql = getLine(lines, i).trim();
        if (ql.startsWith('> ')) {
          quoteLines.push(ql.slice(2));
          i++;
        } else if (ql === '>') {
          quoteLines.push('');
          i++;
        } else {
          break;
        }
      }
      const quoteHtml = quoteLines.map((l) => renderInline(l)).join('<br/>');
      htmlParts.push(
        `<blockquote class="border-l-2 border-gray-600 pl-3 py-1 mb-3 text-sm text-gray-400 bg-gray-800/50 rounded-r">${quoteHtml}</blockquote>`,
      );
      continue;
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableAcc: string[] = [];
      while (i < lines.length && getLine(lines, i).trim().startsWith('|')) {
        tableAcc.push(getLine(lines, i));
        i++;
      }
      htmlParts.push(renderTable(tableAcc));
      continue;
    }

    if (trimmed.startsWith('- ')) {
      const items: Array<{ text: string; depth: number }> = [];
      while (i < lines.length && getLine(lines, i).trim().startsWith('- ')) {
        const raw = getLine(lines, i);
        items.push({ text: raw.trim().slice(2), depth: getIndentDepth(raw) });
        i++;
      }
      const itemsHtml = items
        .map((item) => {
          const cls = DEPTH_CLASSES[Math.min(item.depth, 2)] ?? '';
          const fullClass = cls ? `text-gray-400 ${cls}` : 'text-gray-400';
          return `<li class="${fullClass}">${renderInline(item.text)}</li>`;
        })
        .join('');
      htmlParts.push(`<ul class="list-disc list-inside mb-3 space-y-0.5 text-sm">${itemsHtml}</ul>`);
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
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

    htmlParts.push(`<p class="text-sm text-gray-400 mb-2">${renderInline(trimmed)}</p>`);
    i++;
  }

  return htmlParts.join('');
}
