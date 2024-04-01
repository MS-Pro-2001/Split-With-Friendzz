/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import FolderRounded from '@mui/icons-material/FolderRounded';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import Collapse from '@mui/material/Collapse';

import { animated, useSpring } from '@react-spring/web';

function DotIcon() {
  return (
    <Box
      sx={{
        width: 6,
        height: 6,
        borderRadius: '70%',
        bgcolor: 'warning.main',
        display: 'inline-block',
        verticalAlign: 'middle',
        zIndex: 1,
        mr: 1,
      }}
    />
  );
}

const StyledTreeItemLabel = styled(Typography)({
  color: 'inherit',
  fontFamily: 'General Sans',
  fontWeight: 'inherit',
  flexGrow: 1,
});

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color:
    theme.palette.mode === 'light'
      ? theme.palette.grey[800]
      : theme.palette.grey[400],
  position: 'relative',
  [`& .${treeItemClasses.content}`]: {
    'flexDirection': 'row-reverse',
    'borderRadius': theme.spacing(0.7),
    'marginBottom': theme.spacing(0.5),
    'marginTop': theme.spacing(0.5),
    'padding': theme.spacing(0.5),
    'paddingRight': theme.spacing(1),
    'fontWeight': 500,
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
    },
    [`& .${treeItemClasses.iconContainer}`]: {
      marginRight: theme.spacing(2),
    },
    [`&.Mui-expanded `]: {
      '&:not(.Mui-focused, .Mui-selected, .Mui-selected.Mui-focused) .labelIcon':
        {
          color:
            theme.palette.mode === 'light'
              ? theme.palette.primary.main
              : theme.palette.secondary.dark,
        },
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '16px',
        top: '44px',
        height: 'calc(100% - 48px)',
        width: '1.5px',
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[300]
            : theme.palette.grey[700],
      },
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color:
        theme.palette.mode === 'light' ? theme.palette.primary.main : 'blue',
    },
    [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.primary.main
          : theme.palette.secondary.dark,
      color: 'white',
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: theme.spacing(3.5),
    [`& .${treeItemClasses.content}`]: {
      fontWeight: 500,
    },
  },
}));

// const AnimatedCollapse = animated(Collapse);

// function TransitionComponent(props) {
//   const style = useSpring({
//     to: {
//       opacity: props.in ? 1 : 0,
//       transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
//     },
//   });

//   return <AnimatedCollapse style={style} {...props} />;
// }

const StyledTreeItem = React.forwardRef(function StyledTreeItem(props, ref) {
  const { labelIcon: LabelIcon, labelText, ...other } = props;

  return (
    <StyledTreeItemRoot
      // slots={{
      //   groupTransition: TransitionComponent,
      // }}
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            component={LabelIcon}
            className="labelIcon"
            color="inherit"
            sx={{ mr: 1, fontSize: '1.2rem' }}
          />
          <StyledTreeItemLabel variant="body2">{labelText}</StyledTreeItemLabel>
        </Box>
      }
      {...other}
      ref={ref}
    />
  );
});

export default function CustomizedTreeView({ expense, name }) {
  return (
    <SimpleTreeView
      aria-label="gmail"
      defaultSelectedItems="3"
      sx={{
        height: 'fit-content',
        flexGrow: 1,
        width: 200,
        overflowY: 'auto',
      }}
    >
      <StyledTreeItem
        itemId="3"
        labelText={expense.description}
        labelIcon={Label}
      >
        {expense.users[name]?.lena_hain.map((val, key) => {
          return (
            <StyledTreeItem
              key={key}
              itemId={JSON.stringify(key)}
              labelText={`you lend ${val.username} ₹ ${val.amount.toFixed(2)} `}
              labelIcon={DotIcon}
            />
          );
        })}
        {expense.users[name]?.dena_hain.map((val, key) => {
          return (
            <StyledTreeItem
              key={key}
              itemId={JSON.stringify(key)}
              labelText={`you owes ${val.username} ₹ ${val.amount.toFixed(2)} `}
              labelIcon={DotIcon}
            />
          );
        })}
      </StyledTreeItem>

      {/* <StyledTreeItem itemId="2" labelText="Trash" labelIcon={DeleteIcon} /> */}
    </SimpleTreeView>
  );
}
