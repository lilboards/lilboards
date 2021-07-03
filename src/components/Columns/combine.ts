import type { DropResult } from 'react-beautiful-dnd';
import type { Items } from '../../types';

const separator = '\n\n---\n\n';

// https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/combining.md
export default function combine(items: Items, result: DropResult) {
  const sourceItemId = result.draggableId;
  const sourceColumnId = result.source.droppableId;
  const sourceText = items[sourceItemId].text.trim();

  const targetItemId = result.combine!.draggableId;
  const targetText = items[targetItemId].text.trim();

  const combinedText = [targetText, sourceText].join(separator);

  return {
    remove: {
      itemId: sourceItemId,
      columnId: sourceColumnId,
    },
    update: {
      itemId: targetItemId,
      text: combinedText,
    },
  };
}
