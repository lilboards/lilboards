import MoreIcon from '@mui/icons-material/MoreHoriz';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { useCallback, useState } from 'react';
import type { Id } from 'src/types';

import AddColumn from './AddColumn';
import Export from './Export';
import HideLikes from './HideLikes';
import MaxLikes from './MaxLikes';
import Sort from './Sort';
import Timer from './Timer';

interface Props {
  boardId: Id;
}

export default function BoardControls(props: Props) {
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setAnchorElement(event.currentTarget),
    [setAnchorElement],
  );

  const handleClose = useCallback(
    () => setAnchorElement(null),
    [setAnchorElement],
  );

  const isPopoverOpen = Boolean(anchorElement);
  const popoverId = isPopoverOpen ? 'board-controls-popover' : undefined;

  return (
    <Box sx={{ display: 'flex', marginBottom: 4 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AddColumn boardId={props.boardId} />
      </Box>

      {/* desktop */}
      <Stack direction="row" sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Timer sx={{ marginRight: 3 }} boardId={props.boardId} />
        <MaxLikes sx={{ marginRight: 2 }} boardId={props.boardId} />
        <HideLikes />
        <Sort sx={{ marginRight: 0.5 }} boardId={props.boardId} />
        <Export />
      </Stack>

      {/* mobile */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <IconButton
          aria-describedby={popoverId}
          aria-label="Board Controls"
          onClick={handleClick}
          title="Board Controls"
        >
          <MoreIcon />
        </IconButton>

        <Popover
          anchorEl={anchorElement}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          id={popoverId}
          onClose={handleClose}
          open={isPopoverOpen}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
        >
          <Stack>
            <Timer sx={{ margin: 2 }} boardId={props.boardId} />
            <MaxLikes sx={{ margin: 2 }} boardId={props.boardId} />
            <HideLikes sx={{ marginLeft: 1, marginRight: 1 }} />
            <Sort sx={{ margin: 2 }} boardId={props.boardId} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 1,
              }}
            >
              <Export />
            </Box>
          </Stack>
        </Popover>
      </Box>
    </Box>
  );
}
