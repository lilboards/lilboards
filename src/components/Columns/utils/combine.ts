import type { DropResult } from '@hello-pangea/dnd';
import type { Items, LikesItems } from 'src/types';

const separator = '\n\n---\n\n';

/**
 * @see {@link https://github.com/hello-pangea/dnd/blob/main/docs/guides/combining.md}
 */
export function combine(result: DropResult, items: Items, likes: LikesItems) {
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
