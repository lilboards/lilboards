import type { Columns, Items } from '../../../types';

/**
 * Transforms board data to a multidimensional array.
 */
export function transformToRows(columns: Columns, items: Items) {
  const columnValues = Object.values(columns);
  const columnsLength = columnValues.length;
  if (!columnsLength) {
    return [];
  }
  const rows: string[][] = [];

  const headers = columnValues.map((column) => column.name);
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
 * Transforms board data to Markdown.
 */
export function transformToMarkdown(columns: Columns, items: Items): string {
  const rows = transformToRows(columns, items);
  if (!rows.length) {
    return '';
  }

  let markdown = '';
  const headers = rows.shift()!;
  markdown += `| ${headers.join(' | ')} |`;
  markdown += '\n';
  markdown += `|${headers.map(() => ' --- |').join('')}`;
  markdown += '\n';

  rows.forEach((row) => {
    markdown += `| ${row
      .map((text) =>
        typeof text === 'string' ? text.replaceAll('\n', '<br>') : text
      )
      .join(' | ')} |`;
    markdown += '\n';
  });

  return markdown;
}
