import React, { useState } from 'react';
import ItemListItem from '../ItemListItem';
import { FormattedMessage } from 'react-intl';
import { useReactiveVar } from '@apollo/client';
import LazyLoad from 'react-lazyload';
import {
  List,
  Divider,
  Fade,
  LinearProgress,
} from '@material-ui/core';
import MoreItemsButton from './MoreItemsButton';
import { makeStyles } from '@material-ui/core/styles';
import { routeConfig } from '../../../constants/globalVars';

const useStyles = makeStyles({
  list: {
    overflow: 'hidden',
  },
  linearProgress: {
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  moreItemsButton: {
    marginTop: '1rem',
    textAlign: 'center',
    width: '100%',
  },
});

const ItemList = React.memo(
  ({ history, items, limit, fetchMore, filter }) => {
    const classes = useStyles();
    const { edges, pageInfo } = items;
    const { hasNextPage, totalDocs, nextPage } = pageInfo;
    const [moreLoading, setMoreLoading] = useState(false);
    const reactiveRouteConfig = useReactiveVar(routeConfig);

    return (
      <Fade in>
        <List className={classes.list}>
          {edges.map((item) => (
            <LazyLoad
              // unmountIfInvisible
              height={110}
              offset={500}
              key={item.id}
            >
              <ItemItem
                reactiveRouteConfig={reactiveRouteConfig}
                history={history}
                item={item}
              />
            </LazyLoad>
          ))}

          {hasNextPage && !moreLoading && (
            <MoreItemsButton
              classes={classes}
              reactiveRouteConfig={reactiveRouteConfig}
              limit={limit}
              pageInfo={pageInfo}
              fetchMore={fetchMore}
              nextPage={nextPage}
              filter={filter}
              setMoreLoading={setMoreLoading}
            >
              <FormattedMessage id="items_list.load_more_button" />
            </MoreItemsButton>
          )}
          {moreLoading && (
            <LinearProgress className={classes.linearProgress} />
          )}
        </List>
      </Fade>
    );
  },
  (prevProps, nextProps) => {},
);

const ItemItemBase = ({ item, reactiveRouteConfig }) => (
  <>
    <Divider variant="fullWidth" component="li" />

    <ItemListItem
      reactiveRouteConfig={reactiveRouteConfig}
      item={item}
    />
  </>
);

const ItemItem = ItemItemBase;

export default ItemList;
