import type { Columns, Items } from 'src/types';

const NEWLINE = '\n';

/**
 * Transforms board data to a multidimensional array.
 *
 * @returns - Multidimensional array.
 */
export function transformToRows(columns: Columns, items: Items) {
  const columnValues = Object.values(columns);
  const columnsLength = columnValues.length;

  if (!columnsLength) {
    return [];
  }

  const rows: string[][] = [];
  const headers = columnValues.map(
    (column, index) => column.name || `Column ${index + 1}`,
  );
  rows.push(headers);

  columnValues.forEach(({ itemIds }, columnIndex) => {
    if (!itemIds || !itemIds.length) {
      return;
    }

    itemIds.forEach((itemId, rowIndex) => {
      rowIndex++; // don't override headers
      rows[rowIndex] = rows[rowIndex] || [...Array(columnsLength)];
      rows[rowIndex][columnIndex] = items[itemId].text;
    });
  });

  return rows;
}

/**
 * Transforms board data to CSV.
 *
 * @param columns - Columns.
 * @param items - Items.
 * @returns - CSV.
 */
export function transformToCSV(columns: Columns, items: Items): string {
  const rows = transformToRows(columns, items);

  if (!rows.length) {
    return '';
  }

  let csv = '';
  const headers = rows.shift()!;
  csv += headers.map((header) => JSON.stringify(header)).join(',');
  csv += NEWLINE;

  rows.forEach((row) => {
    csv += row.map((column) => JSON.stringify(column)).join(',');
    csv += NEWLINE;
  });

  return csv.trim();
}

/**
 * Transforms board data to Markdown.
 *
 * @param columns - Columns.
 * @param items - Items.
 * @returns - Markdown.
 */
export function transformToMarkdown(columns: Columns, items: Items): string {
  const rows = transformToRows(columns, items);

  if (!rows.length) {
    return '';
  }

  let markdown = '';
  const headers = rows.shift()!;
  markdown += `| ${headers.join(' | ')} |`;
  markdown += NEWLINE;
  markdown += `|${headers.map(() => ' --- |').join('')}`;
  markdown += NEWLINE;

  rows.forEach((row) => {
    markdown += `| ${row
      .map((text) =>
        typeof text === 'string' ? text.replace(/\n/g, '<br>') : text,
      )
      .join(' | ')} |`;
    markdown += NEWLINE;
  });

  return markdown.trim();
}
