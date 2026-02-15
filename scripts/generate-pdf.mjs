/**
 * Script de génération du PDF du manuel utilisateur
 * Combine tous les fichiers markdown et génère un PDF via pdfkit
 */
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MANUAL_DIR = path.join(__dirname, '..', 'docs', 'manuel-utilisateur');
const OUTPUT_PATH = path.join(__dirname, '..', 'docs', 'Manuel_Utilisateur_Scoreboard_Editor.pdf');

const FILES = [
  '01-introduction.md',
  '02-editeur.md',
  '03-body-types.md',
  '04-personnalisation.md',
  '05-horloge-et-phases.md',
  '06-templates.md',
  '07-mode-operateur.md',
  '08-sortie-broadcast.md',
  '09-capture-impression.md',
  '10-photos-joueurs.md',
  '11-logos.md',
  '12-animations-export.md',
  '13-integrations.md',
];

// Colors
const COLORS = {
  title: '#1a1a2e',
  heading1: '#16213e',
  heading2: '#0f3460',
  heading3: '#1a1a5e',
  text: '#2d2d2d',
  tableHeader: '#e8eaf6',
  tableHeaderText: '#1a237e',
  tableBorder: '#c5cae9',
  tableAlt: '#f5f5fa',
  code: '#f0f0f0',
  codeText: '#c62828',
  link: '#1565c0',
  separator: '#e0e0e0',
  coverBg: '#1a1a2e',
  coverText: '#ffffff',
  coverSubtitle: '#90caf9',
};

function parseMarkdown(content) {
  const lines = content.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,4})\s+(.*)/);
    if (headingMatch) {
      blocks.push({
        type: `h${headingMatch[1].length}`,
        text: headingMatch[2].replace(/\*\*/g, ''),
      });
      i++;
      continue;
    }

    // Table
    if (line.includes('|') && i + 1 < lines.length && /\|[\s-:]+\|/.test(lines[i + 1])) {
      const table = { type: 'table', headers: [], rows: [] };
      // Parse header
      table.headers = line.split('|').map(c => c.trim()).filter(c => c !== '');
      i += 2; // skip header and separator
      // Parse rows
      while (i < lines.length && lines[i].includes('|') && lines[i].trim() !== '') {
        const row = lines[i].split('|').map(c => c.trim()).filter(c => c !== '');
        table.rows.push(row);
        i++;
      }
      blocks.push(table);
      continue;
    }

    // Code block
    if (line.trim().startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // skip closing ```
      blocks.push({ type: 'code', text: codeLines.join('\n') });
      continue;
    }

    // List item
    if (/^(\s*)[-*]\s+/.test(line)) {
      const listItems = [];
      while (i < lines.length && /^(\s*)[-*]\s+/.test(lines[i])) {
        const indent = lines[i].match(/^(\s*)/)[1].length;
        const text = lines[i].replace(/^(\s*)[-*]\s+/, '');
        listItems.push({ text, indent });
        i++;
      }
      blocks.push({ type: 'list', items: listItems });
      continue;
    }

    // Numbered list
    if (/^\d+\.\s+/.test(line)) {
      const listItems = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        const text = lines[i].replace(/^\d+\.\s+/, '');
        listItems.push({ text });
        i++;
      }
      blocks.push({ type: 'orderedList', items: listItems });
      continue;
    }

    // Paragraph
    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('#') && !lines[i].startsWith('```') && !/^---+$/.test(lines[i].trim()) && !(lines[i].includes('|') && i + 1 < lines.length && lines[i + 1] && /\|[\s-:]+\|/.test(lines[i + 1]))) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: 'paragraph', text: paraLines.join(' ') });
    }
  }

  return blocks;
}

function formatInlineText(doc, text, options = {}) {
  // Process inline formatting: **bold**, `code`, [links](url)
  const parts = [];
  let remaining = text;

  while (remaining.length > 0) {
    // Find the next special pattern
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
    const codeMatch = remaining.match(/`([^`]+)`/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    // Find which comes first
    let firstIndex = remaining.length;
    let firstType = null;
    let firstMatch = null;

    if (boldMatch && boldMatch.index < firstIndex) {
      firstIndex = boldMatch.index;
      firstType = 'bold';
      firstMatch = boldMatch;
    }
    if (codeMatch && codeMatch.index < firstIndex) {
      firstIndex = codeMatch.index;
      firstType = 'code';
      firstMatch = codeMatch;
    }
    if (linkMatch && linkMatch.index < firstIndex) {
      firstIndex = linkMatch.index;
      firstType = 'link';
      firstMatch = linkMatch;
    }

    if (firstType === null) {
      parts.push({ text: remaining });
      break;
    }

    // Text before the match
    if (firstIndex > 0) {
      parts.push({ text: remaining.substring(0, firstIndex) });
    }

    switch (firstType) {
      case 'bold':
        parts.push({ text: firstMatch[1], bold: true });
        remaining = remaining.substring(firstIndex + firstMatch[0].length);
        break;
      case 'code':
        parts.push({ text: firstMatch[1], code: true });
        remaining = remaining.substring(firstIndex + firstMatch[0].length);
        break;
      case 'link':
        parts.push({ text: firstMatch[1], link: firstMatch[2] });
        remaining = remaining.substring(firstIndex + firstMatch[0].length);
        break;
    }
  }

  // Render parts
  const fontSize = options.fontSize || 11;
  const fontColor = options.color || COLORS.text;
  let first = true;

  for (const part of parts) {
    const opts = { continued: part !== parts[parts.length - 1] };
    if (!first) {
      // continue on same line
    }

    if (part.bold) {
      doc.font('Helvetica-Bold').fontSize(fontSize).fillColor(fontColor);
      doc.text(part.text, opts);
    } else if (part.code) {
      doc.font('Courier').fontSize(fontSize - 1).fillColor(COLORS.codeText);
      doc.text(part.text, opts);
    } else if (part.link) {
      doc.font('Helvetica').fontSize(fontSize).fillColor(COLORS.link);
      doc.text(part.text, { ...opts, underline: true });
    } else {
      doc.font('Helvetica').fontSize(fontSize).fillColor(fontColor);
      doc.text(part.text, opts);
    }
    first = false;
  }

  // Reset
  doc.font('Helvetica').fillColor(COLORS.text);
}

function renderBlock(doc, block, pageWidth) {
  const leftMargin = 50;
  const contentWidth = pageWidth - 100;

  switch (block.type) {
    case 'h1':
      doc.moveDown(1.2);
      doc.font('Helvetica-Bold').fontSize(22).fillColor(COLORS.heading1);
      doc.text(block.text, leftMargin, undefined, { width: contentWidth });
      doc.moveDown(0.2);
      // Underline
      const y1 = doc.y;
      doc.moveTo(leftMargin, y1).lineTo(leftMargin + contentWidth, y1).strokeColor(COLORS.heading1).lineWidth(1.5).stroke();
      doc.moveDown(0.6);
      break;

    case 'h2':
      doc.moveDown(0.8);
      doc.font('Helvetica-Bold').fontSize(16).fillColor(COLORS.heading2);
      doc.text(block.text, leftMargin, undefined, { width: contentWidth });
      doc.moveDown(0.4);
      break;

    case 'h3':
      doc.moveDown(0.6);
      doc.font('Helvetica-Bold').fontSize(13).fillColor(COLORS.heading3);
      doc.text(block.text, leftMargin, undefined, { width: contentWidth });
      doc.moveDown(0.3);
      break;

    case 'h4':
      doc.moveDown(0.4);
      doc.font('Helvetica-Bold').fontSize(11.5).fillColor(COLORS.heading3);
      doc.text(block.text, leftMargin, undefined, { width: contentWidth });
      doc.moveDown(0.2);
      break;

    case 'paragraph':
      doc.font('Helvetica').fontSize(11).fillColor(COLORS.text);
      formatInlineText(doc, block.text, { fontSize: 11 });
      doc.moveDown(0.5);
      break;

    case 'list':
      for (const item of block.items) {
        const indent = leftMargin + 15 + (item.indent || 0) * 10;
        const bullet = item.indent > 0 ? '  -' : '-';
        doc.font('Helvetica').fontSize(11).fillColor(COLORS.text);
        doc.text(`${bullet}  `, indent, undefined, { continued: true, width: contentWidth - (indent - leftMargin) });
        formatInlineText(doc, item.text, { fontSize: 11 });
        doc.moveDown(0.15);
      }
      doc.moveDown(0.3);
      break;

    case 'orderedList':
      block.items.forEach((item, idx) => {
        const indent = leftMargin + 15;
        doc.font('Helvetica').fontSize(11).fillColor(COLORS.text);
        doc.text(`${idx + 1}.  `, indent, undefined, { continued: true, width: contentWidth - 15 });
        formatInlineText(doc, item.text, { fontSize: 11 });
        doc.moveDown(0.15);
      });
      doc.moveDown(0.3);
      break;

    case 'code':
      doc.moveDown(0.3);
      const codeX = leftMargin + 10;
      const codeWidth = contentWidth - 20;
      // Background
      const codeHeight = block.text.split('\n').length * 14 + 16;
      const codeY = doc.y;
      if (codeY + codeHeight > doc.page.height - 50) {
        doc.addPage();
      }
      doc.save();
      doc.roundedRect(codeX, doc.y, codeWidth, codeHeight, 4).fill(COLORS.code);
      doc.restore();
      doc.font('Courier').fontSize(9).fillColor('#333333');
      doc.text(block.text, codeX + 8, doc.y + 8, { width: codeWidth - 16 });
      doc.y += 8;
      doc.moveDown(0.5);
      break;

    case 'table':
      renderTable(doc, block, leftMargin, contentWidth);
      doc.moveDown(0.5);
      break;

    case 'hr':
      doc.moveDown(0.5);
      const hrY = doc.y;
      doc.moveTo(leftMargin, hrY).lineTo(leftMargin + contentWidth, hrY).strokeColor(COLORS.separator).lineWidth(0.5).stroke();
      doc.moveDown(0.5);
      break;
  }
}

function renderTable(doc, table, leftMargin, contentWidth) {
  const numCols = table.headers.length;
  const colWidth = contentWidth / numCols;
  const cellPadding = 5;
  const fontSize = 9;
  const rowHeight = 22;

  // Check if table fits on page
  const totalHeight = (table.rows.length + 1) * rowHeight + 10;
  if (doc.y + totalHeight > doc.page.height - 60) {
    doc.addPage();
  }

  let y = doc.y;

  // Header row
  doc.save();
  doc.roundedRect(leftMargin, y, contentWidth, rowHeight, 2).fill(COLORS.tableHeader);
  doc.restore();

  for (let c = 0; c < numCols; c++) {
    doc.font('Helvetica-Bold').fontSize(fontSize).fillColor(COLORS.tableHeaderText);
    doc.text(
      table.headers[c] || '',
      leftMargin + c * colWidth + cellPadding,
      y + 6,
      { width: colWidth - cellPadding * 2, height: rowHeight }
    );
  }

  y += rowHeight;

  // Data rows
  for (let r = 0; r < table.rows.length; r++) {
    // Check page break
    if (y + rowHeight > doc.page.height - 50) {
      doc.addPage();
      y = 50;
    }

    // Alternate row bg
    if (r % 2 === 1) {
      doc.save();
      doc.rect(leftMargin, y, contentWidth, rowHeight).fill(COLORS.tableAlt);
      doc.restore();
    }

    // Row border
    doc.save();
    doc.moveTo(leftMargin, y + rowHeight).lineTo(leftMargin + contentWidth, y + rowHeight).strokeColor(COLORS.tableBorder).lineWidth(0.3).stroke();
    doc.restore();

    for (let c = 0; c < numCols; c++) {
      const cellText = (table.rows[r][c] || '').replace(/\*\*/g, '');
      doc.font('Helvetica').fontSize(fontSize).fillColor(COLORS.text);
      doc.text(
        cellText,
        leftMargin + c * colWidth + cellPadding,
        y + 6,
        { width: colWidth - cellPadding * 2, height: rowHeight }
      );
    }

    y += rowHeight;
  }

  doc.y = y + 5;
}

function addCoverPage(doc, pageWidth, pageHeight) {
  // Background
  doc.rect(0, 0, pageWidth, pageHeight).fill(COLORS.coverBg);

  // Title
  const titleY = pageHeight * 0.3;
  doc.font('Helvetica-Bold').fontSize(36).fillColor(COLORS.coverText);
  doc.text('Scoreboard Editor', 0, titleY, { align: 'center', width: pageWidth });

  doc.moveDown(0.5);
  doc.font('Helvetica').fontSize(20).fillColor(COLORS.coverSubtitle);
  doc.text('Manuel utilisateur', { align: 'center', width: pageWidth });

  doc.moveDown(2);
  doc.font('Helvetica').fontSize(14).fillColor('#b0bec5');
  doc.text('Hockey sur glace - Broadcast professionnel', { align: 'center', width: pageWidth });

  doc.moveDown(0.5);
  doc.font('Helvetica').fontSize(12).fillColor('#78909c');
  doc.text(`Version ${new Date().toLocaleDateString('fr-FR')}`, { align: 'center', width: pageWidth });

  // Decorative line
  const lineY = pageHeight * 0.62;
  doc.moveTo(pageWidth * 0.3, lineY).lineTo(pageWidth * 0.7, lineY).strokeColor(COLORS.coverSubtitle).lineWidth(2).stroke();
}

function addTableOfContents(doc, pageWidth) {
  doc.addPage();
  const leftMargin = 50;
  const contentWidth = pageWidth - 100;

  doc.font('Helvetica-Bold').fontSize(22).fillColor(COLORS.heading1);
  doc.text('Table des matieres', leftMargin, 60, { width: contentWidth });
  doc.moveDown(1);

  const chapters = [
    { num: '01', title: 'Introduction' },
    { num: '02', title: 'Panneau editeur' },
    { num: '03', title: "Types d'affichage" },
    { num: '04', title: 'Personnalisation' },
    { num: '05', title: 'Horloge et phases' },
    { num: '06', title: 'Gestion des templates' },
    { num: '07', title: 'Mode operateur' },
    { num: '08', title: 'Sortie broadcast' },
    { num: '09', title: 'Capture et impression' },
    { num: '10', title: 'Photos des joueurs' },
    { num: '11', title: 'Gestion des logos' },
    { num: '12', title: 'Animations et export' },
    { num: '13', title: 'Integrations' },
  ];

  for (const ch of chapters) {
    doc.font('Helvetica').fontSize(13).fillColor(COLORS.text);
    doc.text(`${ch.num}   ${ch.title}`, leftMargin + 20, undefined, { width: contentWidth - 20 });
    doc.moveDown(0.4);
  }
}

function addPageNumbers(doc) {
  const range = doc.bufferedPageRange();
  for (let i = 1; i < range.count; i++) {
    doc.switchToPage(i);
    doc.font('Helvetica').fontSize(9).fillColor('#999999');
    doc.text(
      `${i + 1}`,
      0,
      doc.page.height - 40,
      { align: 'center', width: doc.page.width }
    );
  }
}

// Main
console.log('Generation du PDF du manuel utilisateur...');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, bottom: 50, left: 50, right: 50 },
  bufferPages: true,
  info: {
    Title: 'Scoreboard Editor - Manuel utilisateur',
    Author: 'Scoreboard Design',
    Subject: 'Manuel utilisateur du Scoreboard Editor pour hockey sur glace',
  },
});

const writeStream = fs.createWriteStream(OUTPUT_PATH);
doc.pipe(writeStream);

const pageWidth = doc.page.width;
const pageHeight = doc.page.height;

// Cover page
addCoverPage(doc, pageWidth, pageHeight);

// Table of contents
addTableOfContents(doc, pageWidth);

// Content
for (const file of FILES) {
  const filepath = path.join(MANUAL_DIR, file);
  const content = fs.readFileSync(filepath, 'utf-8');
  const blocks = parseMarkdown(content);

  // New page for each chapter
  doc.addPage();

  // Chapter header bar
  doc.save();
  doc.rect(0, 0, pageWidth, 6).fill(COLORS.heading1);
  doc.restore();

  doc.y = 30;

  for (const block of blocks) {
    // Check if we need a new page (leave space for content)
    if (doc.y > pageHeight - 80 && block.type !== 'hr') {
      doc.addPage();
    }
    renderBlock(doc, block, pageWidth);
  }
}

// Page numbers
addPageNumbers(doc);

doc.end();

writeStream.on('finish', () => {
  const stats = fs.statSync(OUTPUT_PATH);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  console.log(`PDF genere avec succes : ${OUTPUT_PATH}`);
  console.log(`Taille : ${sizeMB} Mo`);
});

writeStream.on('error', (err) => {
  console.error('Erreur lors de la generation du PDF :', err);
  process.exit(1);
});
