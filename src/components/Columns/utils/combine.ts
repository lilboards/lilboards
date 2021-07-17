import type { DropResult } from 'react-beautiful-dnd';
import type { Items, LikeItems } from '../../../types';

const separator = '\n\n---\n\n';

/**
 * @see https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/combining.md
 */
export function combine(result: DropResult, items: Items, likes: LikeItems) {
  const sourceItemId = result.draggableId;
  const sourceColumnId = result.source.droppableId;
  const sourceText = items[sourceItemId].text.trim();

  const targetItemId = result.combine!.draggableId;
  const targetText = items[targetItemId].text.trim();

  const combinedText = [targetText, sourceText].join(separator);
  const combinedLikes = {
    ...likes[sourceItemId],
    ...likes[targetItemId],
  };

  return {
    remove: {
      itemId: sourceItemId,
      columnId: sourceColumnId,
    },
    update: {
      itemId: targetItemId,
      likes: combinedLikes,
      text: combinedText,
    },
  };
}
