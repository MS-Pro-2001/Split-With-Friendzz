import { Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomMemberSelectionModal from '../components/CustomMemberSelectionModal';
import { getUniqueId } from './../../utils/helperFunctions';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import { useForm } from 'react-hook-form';
import CustomAccordion from '../components/CustomAccordion';
import { addExpense } from '../slices/userSlice';

const AddExpensePage = () => {
  const membersList = useSelector((state) => state.data.membersData);
  const expenseList = useSelector((state) => state.data.expenseData);

  const dispatch = useDispatch();
  const [listSelectionType, setListSelectionType] = useState('multiple');

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const [addExpensePayload, setAddExpensePayload] = useState({
    // description: '',
    // price: '',
    paidBy: membersList[0]?.name || '',
    splitBetween: membersList || [],
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (data) => {
    const payload = {
      _id: getUniqueId(),
      ...data,
      ...addExpensePayload,
    };

    dispatch(addExpense(payload));
    resetField('description');
    resetField('price');
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
        component="form"
        id="expenseForm"
        onSubmit={handleSubmit(onSubmit)}
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
            // value={addExpensePayload.description}
            // onChange={handleChange}
            {...register('description', { required: true })}
            error={!!errors.description}
            helperText={!!errors.description && 'Please enter a description'}

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
            // onChange={handleChange}
            {...register('price', { required: true })}
            error={!!errors.price}
            helperText={!!errors.price && 'Please enter a price'}

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
        // onClick={onSubmit}
        type="submit"
        form="expenseForm"
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
      {membersList.map((member) => {
        return (
          <CustomAccordion
            key={member._id}
            member={member}
            expenseList={expenseList}
          />
        );
      })}
    </>
  );
};

export default AddExpensePage;
