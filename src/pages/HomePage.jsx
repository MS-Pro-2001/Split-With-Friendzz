/* eslint-disable react/prop-types */
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import CustomMemberList from '../components/CustomMemberList';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser } from './../slices/userSlice';
import { getUniqueId } from '../../utils/helperFunctions';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

const HomePage = () => {
  const membersList = useSelector((state) => state.data.membersData);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  // const addMember = () => {};
  // const handleDeleteAll = () => {
  //   console.log('All members deleted');
  // };

  const onSubmit = (data) => {
    const user = {
      _id: getUniqueId(),
      name: data.name,
    };
    dispatch(addUser(user));

    resetField('name');
  };
  return (
    <>
      <Typography
        variant="h3"
        sx={{ fontSize: '1.5em', my: 5, lineHeight: 1.5 }}
      >
        Welcome To Split With Friendzz
      </Typography>

      <Grid
        container
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item lg={4.5} md={4} sm={3} xs={0}></Grid>
        <Grid item lg={2} md={3} sm={4} xs={8}>
          <TextField
            variant="outlined"
            label="Enter member name"
            {...register('name', {
              required: { value: true },
            })}
            error={!!errors.name}
            helperText={!!errors.name && 'Please enter a name '}
          />
        </Grid>
        <Grid item lg={2} md={2} sm={2} xs={1}>
          <Button
            sx={{ ml: 5, minWidth: '80px' }}
            variant="contained"
            type="submit"
          >
            + Add
          </Button>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={1}></Grid>
      </Grid>

      {membersList?.length > 1 && (
        <Button
          // onClick={handleDeleteAll}
          sx={{ mt: 3, mb: -3 }}
          variant="outlined"
        >
          Delete All
        </Button>
      )}

      {membersList?.length !== 0 && (
        <>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              my: 5,
            }}
          >
            <CustomMemberList
              handleDeleteUser={handleDeleteUser}
              membersList={membersList}
              actionType="delete"
            />
          </Container>

          <Button variant="contained" color="success">
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to="/add-expense"
            >
              Add expense
            </Link>
          </Button>
        </>
      )}
    </>
  );
};

export default HomePage;
