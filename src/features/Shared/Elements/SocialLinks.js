import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
}));

const CompanyLinks = ({ twitter, linkedin, website }) => {
  const classes = useStyles();

  return (
    <List className={classes.listContainer}>
      {twitter && (
        <ListItem>
          <a target="_blank" href={`https://twitter.com/${twitter}`}>
            {twitter}
          </a>
        </ListItem>
      )}

      {linkedin && (
        <ListItem>
          <a target="_blank" href={linkedin}>
            LinkedIn
          </a>
        </ListItem>
      )}

      {website && (
        <ListItem>
          <a target="_blank" href={website}>
            Website
          </a>
        </ListItem>
      )}
    </List>
  );
};

export default CompanyLinks;
