import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from './queries';
import { hero } from '../../../constants/globalVars';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  //   table: {
  //     minWidth: 650,
  //   },
});

const UserList = ({}) => {
  const classes = useStyles();

  const { data } = useQuery(GET_USERS, { variables: { limit: 20 } });

  useEffect(() => {
    hero({ title: 'Users', subtitle: 'Manage users' });
  }, []);

  if (data) {
    const { users } = data;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Verified</TableCell>
              <TableCell align="right">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.username}>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  {row.verified.toString()}
                </TableCell>
                <TableCell align="right">{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return 'No users';
};

export default UserList;
