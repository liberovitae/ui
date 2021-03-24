import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../../constants/globalVars';
import { JOB_POST } from '../../../constants/routes';
import withAuthorization from '../../Session/withAuthorization';
import { scrollTop } from '../../Shared/ScrollTop';
import CompanyForm from './CompanyForm';

const CompanyCreate = ({ session, refetch, history, account }) => {
  const [state, setState] = useState({
    name: '',
    logo: '',
    website: '',
    tagline: '',
    twitter: '',
    linkedin: '',
  });

  const {
    id,
    name,
    logo,
    website,
    tagline,
    twitter,
    linkedin,
  } = state;

  useEffect(() => {
    session?.me?.company && setState({ ...session.me.company });

    hero({
      title: <FormattedMessage id="company_form.hero.title" />,
      subtitle: <FormattedMessage id="company_form.hero.subtitle" />,
    });
  }, [session]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFile = (name, fileName) => {
    setState((prevState) => ({
      ...prevState,
      [name]: fileName,
    }));
  };

  const onSubmit = (event, mutateCompany) => {
    event.preventDefault();
    try {
      mutateCompany();
      refetch();
      scrollTop();

      if (!account) return history.push(JOB_POST);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CompanyForm
      id={id}
      name={name}
      logo={logo}
      website={website}
      tagline={tagline}
      twitter={twitter}
      linkedin={linkedin}
      handleFile={handleFile}
      onChange={onChange}
      onSubmit={onSubmit}
      session={session}
      account={account}
      refetch={refetch}
    />
  );
};

export default withAuthorization((session) => session && session.me)(
  CompanyCreate,
);
