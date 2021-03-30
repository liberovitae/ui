import React, { useState } from 'react';
import {
  FormLabel,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  ClickAwayListener,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { filterSearch } from '../../constants/globalVars';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  label: {
    '&::first-letter': {
      textTransform: 'uppercase',
    },
  },
}));

const SelectInput = React.memo(
  ({
    id,
    name,
    value,
    data,
    label,
    helperText,
    onChange,
    required,
    type,
  }) => {
    const classes = useStyles();
    console.log(data);

    const [open, setOpen] = useState(false);

    const stopPropagation = (e) => {
      console.log('ping', e);
      e.stopPropagation();
      e.preventDefault();
    };

    const handleClickAway = () => {
      setOpen(false);
    };
    return (
      <FormControl
        required={required}
        variant="outlined"
        className={classes.formControl}
      >
        <InputLabel className={classes.label} id={`${id}-label`}>
          {type} types
        </InputLabel>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Select
            // onClick={(e) => setOpen(true)}
            labelId={`${id}-label`}
            id={id}
            value={value}
            name={name}
            onClose={() => setOpen(false)}
            multiple
            // open={open}
            MenuProps={{
              onEnter: (elem, e) => console.log(elem),
              disableAutoFocusItem: true,
              autoFocus: false,
            }}
            onChange={onChange}
            required={required}
          >
            {data &&
              data.map((item) => (
                <MenuItem
                  onClick={(e) => setOpen(true)}
                  key={item}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
          </Select>
        </ClickAwayListener>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  },
);

export default SelectInput;
