import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomMemberSelectionModal from '../components/CustomMemberSelectionModal';
import { getUniqueId } from './../../utils/helperFunctions';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';

const AddExpensePage = () => {
  const membersList = useSelector((state) => state.usersList.data);
  const [listSelectionType, setListSelectionType] = useState('multiple');

  const [addExpensePayload, setAddExpensePayload] = useState({
    _id: getUniqueId(),
    description: '',
    price: '',
    paidBy: membersList[0].name,
    splitBetween: membersList,
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setAddExpensePayload({
      ...addExpensePayload,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    console.log({ addExpensePayload });
  };

  return (
    <>
      <h1>Add Expense</h1>

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          my: 5,
        }}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DescriptionIcon sx={{ mt: 2, mr: 1 }} />
          <TextField
            sx={{ width: '200px' }}
            label="Enter a description"
            variant="standard"
            name="description"
            value={addExpensePayload.description}
            onChange={handleChange}

            // helperText="Please select your currency"
          />
        </Container>

        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CurrencyRupeeIcon sx={{ mt: 2, mr: 1 }} />

          <TextField
            sx={{ width: '200px' }}
            label="Enter price"
            variant="standard"
            name="price"
            type="number"
            onChange={handleChange}

            // helperText="Please select your currency"
          />
        </Container>
      </Container>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography>Paid By</Typography>
        <Button
          onClick={() => {
            setOpen(true);
            setListSelectionType('single');
          }}
          variant="outlined"
        >
          {addExpensePayload.paidBy}
        </Button>

        <Typography>and Split</Typography>
        <Button
          onClick={() => {
            setOpen(true);
            setListSelectionType('multiple');
          }}
          variant="outlined"
        >
          equally
        </Button>
      </Container>
      <Button
        sx={{ my: 4, width: '300px' }}
        variant="contained"
        onClick={onSubmit}
      >
        Add
      </Button>
      {open && (
        <CustomMemberSelectionModal
          open={open}
          setOpen={setOpen}
          membersList={membersList}
          selectionType={listSelectionType}
          addExpensePayload={addExpensePayload}
          setAddExpensePayload={setAddExpensePayload}
        />
      )}
    </>
  );
};

export default AddExpensePage;
