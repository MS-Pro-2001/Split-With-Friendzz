/* eslint-disable react/prop-types */
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

export default function CustomMemberList({
  handleDeleteUser,
  membersList,
  actionType = 'check',
  selectionType = 'multiple',
  addExpensePayload,
  setAddExpensePayload,
}) {
  if (selectionType === 'single') {
    return (
      <List
        dense
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      >
        {membersList.map((user, index) => {
          const labelId = `checkbox-list-secondary-label-${index}`;
          return (
            <ListItem
              onClick={() =>
                setAddExpensePayload({
                  ...addExpensePayload,
                  paidBy: user.name,
                })
              }
              key={index}
              secondaryAction={
                addExpensePayload.paidBy === user.name && <CheckIcon />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`${user.name.slice(0, 1).toUpperCase()}`}
                    src={`/static/images/avatar/${index + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={user.name} />
              </ListItemButton>
              <hr />
            </ListItem>
          );
        })}
      </List>
    );
  }

  return (
    <List
      dense
      sx={{
        width: '100%',
        maxWidth: 360,
        maxHeight: '300px',
        bgcolor: 'background.paper',
        overflow: 'auto',
      }}
    >
      {/* <ListItem
        sx={{ mb: 2 }}
        key={'all'}
        secondaryAction={
          <Checkbox
            edge="end"
            // onChange={handleToggle(value)}
            // checked={checked.indexOf(value) !== -1}
            // inputProps={{ 'aria-labelledby': labelId }}
          />
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemText id={'all'} primary={`Delete All`} />
        </ListItemButton>
      </ListItem> */}
      {membersList.map((user, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <>
            <ListItem
              key={index}
              secondaryAction={
                actionType === 'delete' ? (
                  <DeleteIcon
                    edge="end"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleDeleteUser(user._id)}
                  />
                ) : (
                  <Checkbox
                    edge="end"
                    // onChange={handleToggle(index)}
                    // checked={checked.indexOf(index) !== -1}
                    // inputProps={{ 'aria-labelledby': labelId }}
                  />
                )
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`${user.name.slice(0, 1).toUpperCase()}`}
                    src={`/static/images/avatar/${index + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={user.name} />
              </ListItemButton>
            </ListItem>
            <hr />
          </>
        );
      })}
    </List>
  );
}
