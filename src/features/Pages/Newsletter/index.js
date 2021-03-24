import React, { useEffect } from 'react';
import TextInput from '../../Shared/Inputs/Text';
import ButtonInput from '../../Shared/Inputs/Button';
import { Fade } from '@material-ui/core';
import { hero } from '../../../constants/globalVars';

const Newsletter = ({}) => {
  useEffect(() => {
    hero({
      title: 'Newsletter',
      subtitle: 'Subscribe below to receive updates',
    });
  }, []);

  return (
    <Fade in>
      <form
        method="post"
        action="https://lists.liberovitae.com/subscription/form"
      >
        <div>
          <p>
            <TextInput required name="email" label="Email" />
          </p>
          <p>
            <TextInput name="name" label="Name (optional)" />
          </p>

          <p>
            <input
              id="6083e"
              type="hidden"
              name="l"
              value="6083e838-475e-47b6-ac79-c6037fb3bdde"
            />
          </p>
          <p>
            <ButtonInput text="Subscribe" />
          </p>
        </div>
      </form>
    </Fade>
  );
};

export default Newsletter;
