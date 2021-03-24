import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../../constants/globalVars';
import { Typography, Grid, Box, Button } from '@material-ui/core';
import { LANDING } from '../../../constants/routes';

const Privacy = ({}) => {
  useEffect(() => {
    hero({
      title: 'Privacy policy',
      subtitle: 'Effective date: January 1, 2021',
    });
  }, []);

  return (
    <Box p={1}>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Typography paragraph>
            We respect your identity and privacy and ensure that they
            are protected and that your personal data is processed in
            accordance with the applicable laws. Furthermore, we only
            collect information that is essential for delivering our
            services to you in a proper way and follow a minimalistic
            approach to the collection of any kind of personal data.
          </Typography>
          <Typography paragraph>
            Personal data includes all the details and information
            that refer to a specific or identifiable person.
          </Typography>
          <Typography paragraph>
            This Privacy Policy is our way of informing you which of
            your data we process, why we require this data and how you
            can object to your data being collected.
          </Typography>
          <Typography paragraph>
            When we refer to the processing of your personal data in
            this Privacy Policy, we mean all the ways in which your
            personal data is handled. This includes data storage,
            processing, use, deletion, etc.
          </Typography>
          <Typography variant="h5" gutterBottom>
            Who is responsible for data processing?
          </Typography>
          <Typography paragraph>
            liberovitae.com is responsible for processing your data.
          </Typography>
          <Typography paragraph>
            Please do not hesitate to contact us if you have any
            questions or comments regarding data protection. You can
            contact us by e-mail:{' '}
            <a href="mailto:mail@liberovitae.com">
              mail@liberovitae.com
            </a>
          </Typography>
          <Typography variant="h5" gutterBottom>
            Why do we collect personal data?
          </Typography>
          <Typography paragraph>
            We know how important it is to you that your personal data
            is handled carefully. Data is only ever processed for
            specific purposes. This could be out of technical
            necessity or due to contractual requirements, legal
            provisions, overriding interest, i.e. for legitimate
            reasons, or if you have granted your express consent. We
            collect, store and process personal data where necessary.
            This includes for the purposes of managing customer
            relationships, providing our products and services,
            processing orders and contracts, making sales and issuing
            invoices, responding to questions and concerns, preparing
            information on and marketing our products and services,
            assisting with technical issues and evaluation and further
            developing products and services.
          </Typography>
          <Typography variant="h5" gutterBottom>
            What data is processed when our websites are used?
          </Typography>
          <Typography paragraph>
            You can visit our websites without having to provide any
            personal information as a matter of principle. When you
            visit our websites, our servers temporarily store each
            access in a log file. The following technical data is
            collected in the process and stored until it is
            automatically deleted after seven months at the latest:
          </Typography>
          <ul>
            <li>IP address of the computer requesting access</li>
            <li>The date and time of access</li>
            <li>
              The website from which our website is being accessed,
              including the search term where applicable
            </li>
            <li>The name and URL of the file being requested</li>
            <li>
              Any search queries performed (webpage’s general search
              function, products, etc.)
            </li>
            <li>
              The operating system on your computer (provided by the
              user agent)
            </li>
            <li>
              The browser you are using (provided by the user agent)
            </li>
            <li>The type of device when accessed via mobile phone</li>
            <li>The transmission protocol being used</li>
          </ul>
          <Typography paragraph>
            This data is processed and collected for the purposes of
            system security and stability and for analysing errors and
            performance as well as for internal statistical purposes.
            It enables us to optimise our website.
          </Typography>
          <Typography paragraph>
            The IP address is also analysed together with other data
            when there is an attempt to access the network
            infrastructure or in the event of other unauthorised or
            improper use of our websites for information and defence
            purposes and, where applicable, is used for the purposes
            of identification during criminal proceedings and in civil
            and criminal procedures against the data subject.
          </Typography>
          <Typography paragraph>
            Finally, when you visit our websites, we use cookies and
            other applications and tools which are based on cookies.
            You can find further details below in this Privacy Policy.
          </Typography>
          <Typography paragraph>
            liberovitae.com does not accept any guarantee for
            compliance with data protection regulations for external
            websites that are linked to liberovitae.com websites.
          </Typography>
          <Typography variant="h5" gutterBottom>
            What are cookies and when are they used?
          </Typography>
          <Typography paragraph>
            We use cookies in certain cases. Cookies are small files
            that are stored on your computer or mobile device when you
            visit or use our websites. Cookies store certain settings
            via your browser and data about the exchange with the
            website via your browser. When a cookie is activated, it
            can be given an identification number via which your
            browser is identified and via which the information
            contained in the cookie can be used. You can set up your
            browser so that a warning appears on your screen before a
            cookie is stored. You can also opt out of the benefits of
            personalised cookies, which will mean you cannot use
            certain services.
          </Typography>
          <Typography variant="h5" gutterBottom>
            How are tracking tools used?
          </Typography>
          <Typography paragraph>
            We use our own internal web analytics tools for the
            purposes of designing and continuously optimising our
            websites, apps and e-mails in line with customer needs.
          </Typography>
          <Typography paragraph>
            In conjunction with our websites, pseudonymised user
            profiles are created and small text files used which are
            stored on your computer (see “What are cookies and when
            are they used?” above). The information about your use of
            these websites generated by the cookies is transmitted to
            our suppliers’ servers, where it is stored and prepared on
            our behalf. In addition to the data listed above (see
            “What data is processed when our websites are used?”), we
            receive the following information as part of the process:
          </Typography>
          <ul>
            <li>
              The navigation path via which the visitor is accessing
              the website
            </li>
            <li>
              The length of time spent on the webpage or subpage
            </li>
            <li>
              The subpage from which the visitor leaves the website
            </li>
            <li>
              The country, region or city from which the visitor
              accesses the website
            </li>
            <li>
              The device (type, version, colour depth, resolution,
              width and height of the browser window)
            </li>
            <li>Returning or new visitors</li>
          </ul>
          <Typography paragraph>
            The information is used to evaluate the visitor’s use of
            the websites.
          </Typography>
          <Typography paragraph>
            We use third-party e-mail marketing services when sending
            e-mails. Our e-mails may therefore contain a so-called web
            beacon (tracking pixel) or similar technical tool. A web
            beacon is an invisible graphic measuring 1×1 pixels which
            is associated with the user ID of the relevant e-mail
            subscriber.
          </Typography>
          <Typography paragraph>
            The use of corresponding services enables us to evaluate
            whether our e-mails have been opened by their recipients.
            It also allows their click patterns to be recorded and
            evaluated. We use this data for statistical purposes and
            to optimise the content of our messages. This allows us to
            better align the information and services in our e-mails
            with the specific interests of each individual recipient.
            The tracking pixel is deleted when you delete the e-mail.
          </Typography>
          <Typography paragraph>
            To prevent the use of the web beacon in our e-mails,
            adjust the settings in your e-mail programme to stop HTML
            being displayed in messages.
          </Typography>
          <Typography variant="h5" gutterBottom>
            How long will your data be stored for?
          </Typography>
          <Typography paragraph>
            Your data will be deleted once it is no longer required
            for the purpose for which it was collected (e.g. as part
            of a contractual relationship). If there are legal or
            factual obstacles that prevent us from deleting the data
            (e.g. legal obligation of safekeeping), it will be made
            unavailable instead.
          </Typography>
          <Typography variant="h5" gutterBottom>
            What rights do you have in relation to your personal data?
          </Typography>
          <Typography paragraph>
            You have the following rights in relation to your personal
            data:
          </Typography>
          <ul>
            <li>
              You can request information about the personal data we
              have stored
            </li>
            <li>
              You can request for your personal data to be rectified,
              supplemented, blocked or deleted
            </li>
            <li>
              If you have set up a user account, you can delete this
              or have it deleted
            </li>
            <li>
              You can object to your data being used for marketing
              purposes
            </li>
          </ul>
          <Typography paragraph>
            To exercise these rights, simply write an e-mail to:{' '}
            <a href="mailto:mail@liberovitae.com">
              mail@liberovitae.com
            </a>
          </Typography>
          <Typography variant="h5" gutterBottom>
            Will data be disclosed to third parties?
          </Typography>
          <Typography paragraph>
            Your personal data will not be disclosed, sold or
            transmitted in any other way to third parties outside our
            services unless this is necessary for the purposes of
            executing a contract or you have granted your express
            consent.
          </Typography>
          <Typography paragraph>
            External service providers (for example payments or
            accounting firms) that process data on our behalf are
            under strict obligations as regards to the UK Data
            Protection Act. Under data protection law, these external
            service providers are therefore not considered third
            parties.
          </Typography>
          <Typography variant="h5" gutterBottom>
            Will your personal data be transmitted abroad?
          </Typography>
          <Typography paragraph>
            We are also authorised to transmit your personal data to
            third parties (for example external service providers)
            abroad. These are obliged to comply with data protection
            law to the same extent as we are. If the level of data
            protection in a country does not match that in UK, we
            shall contractually ensure that your personal data is
            protected to the same level as in UK at all times.
          </Typography>
          <Typography variant="h5" gutterBottom>
            Data security
          </Typography>
          <Typography paragraph>
            We employ suitable technical and organisational security
            measures to protect the personal data we store from
            manipulation, partial or total loss and unauthorised
            access by third parties. Our security measures are
            continuously improved in line with technological
            development.
          </Typography>
          <Typography paragraph>
            We also take data protection within liberovitae.com very
            seriously. Our staff and the external service providers
            working on our behalf are committed to maintain
            confidentiality and to comply with data protection
            provisions.
          </Typography>
          <Typography paragraph>
            We will take appropriate precautionary measures to protect
            your data. However, the transmission of information over
            the Internet and other electronic means always carries
            certain security risks and we cannot offer any guarantee
            as regards the security of information transmitted in this
            way.
          </Typography>
          <Typography variant="h5" gutterBottom>
            Amendments to this Privacy Policy
          </Typography>
          <Typography paragraph>
            We reserve the right to amend or supplement this Privacy
            Policy at any time at our discretion. Please consult this
            Privacy Policy regularly.
          </Typography>
          <br />
          <Link to={LANDING}>
            <Button color="primary">
              <FormattedMessage id="common.back" />
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Privacy;
