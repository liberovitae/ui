import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../../constants/globalVars';
import { Typography, Grid, Box, Button } from '@material-ui/core';
import { LANDING } from '../../../constants/routes';

const listStyle = {
  listStyle: 'none',
};

const Terms = ({}) => {
  useEffect(() => {
    hero({
      title: 'Terms and conditions',
      subtitle: 'Effective date: January 1, 2021',
    });
  }, []);

  return (
    <Box p={1}>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h5" gutterBottom>
            1. Terms and Conditions of use{' '}
          </Typography>
          <Typography paragraph>
            By accessing this site, you accept the following Terms and
            Conditions. You are only authorized to use the site and
            its services if you agree to abide by all applicable laws
            and to these Terms and Conditions. liberovitae.com
            reserves the right at any time and at its own discretion
            to alter, supplement or delete all or part of the content
            of the liberovitae.com website and the present Terms and
            Conditions. This also applies to improvements and/or
            changes to the information stated and services. Please
            check these conditions regularly for any changes. If you
            continue to use the liberovitae.com website after changes
            to these Terms and Conditions have been published, you are
            deemed to have accepted the changes.
          </Typography>
          <Typography variant="h5" gutterBottom>
            2. Copyright
          </Typography>
          <Typography paragraph>
            Permission to use, copy and distribute the information
            published by liberovitae.com on this website is hereby
            granted on the condition that each copy contains this
            copyright notice in its entirety and that no part of the
            contents is used for commercial purposes but restricted to
            use for information purposes within an organization.
          </Typography>
          <Typography variant="h5" gutterBottom>
            3. Accuracy of information provided
          </Typography>
          <Typography paragraph>
            All information published on this website is provided as
            is without any representation or warranty of any kind
            either express or implied including but not limited to
            implied warranties for merchantability, fitness for a
            particular purpose or non-infringement. Any content may
            include technical inaccuracies or typographical errors.
            Changes and additions may be made by liberovitae.com from
            time to time to any information contained herein.
          </Typography>
          <Typography variant="h5" gutterBottom>
            4. User-submitted information
          </Typography>
          <Typography paragraph>
            Certain parts of the site contain information submitted by
            visitors of the site. Examples are job listing information
            provided by employers and others.
          </Typography>
          <Typography variant="h5" gutterBottom>
            4.1. liberovitae.com’s responsibility for user-submitted
            information
          </Typography>
          <Typography paragraph>
            The site acts as a passive channel for online distribution
            of user-submitted information. liberovitae.com will not
            screen information in advance and is not responsible for
            screening or monitoring posted material. The
            user-submitted information does not reflect
            liberovitae.com’s views and liberovitae.com does not have
            any obligation to monitor, edit, or review any
            user-submitted information. liberovitae.com assumes no
            responsibility or liability arising from the
            user-submitted information. We may store and process
            information submitted by users on our site in any country
            in which liberovitae.com or our hosting providers maintain
            facilities. By using our services, you consent to the
            transfer of information you submit among these facilities,
            including those located outside your country.
          </Typography>
          <Typography variant="h5" gutterBottom>
            4.2. Appropriate conduct when submitting information
          </Typography>
          Information submitted by you must be correct and avoid
          language and content which may be regarded as inappropriate
          by other users. All information entered must be in
          compliance with local laws. You are responsible for your own
          conduct and communications and for any consequences thereof.
          You agree to use the site only to send and receive messages
          and material that are legal, proper and related to the
          context. By way of example, and not as a limitation, you
          agree that when using the site, you will not:
          <ul style={listStyle}>
            <li>
              (a) defame, abuse, harass, stalk, threaten or otherwise
              violate the legal rights (such as rights of privacy and
              publicity) of others;
            </li>
            <li>
              (b) upload, post or otherwise make available any
              inappropriate, defamatory, obscene, or unlawful content;
            </li>
            <li>
              (c) upload, post or otherwise make available any content
              that infringes any patent, trademark, copyright, trade
              secret or other proprietary right of any party, unless
              you are the owner of the rights, or have the permission
              of the owner or other legal justification to use such
              content;
            </li>
            <li>
              (d) upload, post or otherwise make available any other
              content, message, or communication prohibited by
              applicable law, the Terms and Conditions or any other
              applicable policies or guidelines;
            </li>
            <li>
              (e) download any file posted by another that you know,
              or reasonably should know, cannot be legally distributed
              in such manner;
            </li>
            <li>
              (f) impersonate another person or entity, or falsify or
              delete any author attributions or proprietary
              designations or labels of the origin or source of
              Content, software or other material;
            </li>

            <li>
              (g) promote or provide instructional information about
              illegal activities;
            </li>
            <li>
              (h) promote physical harm or injury against any group or
              individual; or
            </li>
            <li>
              (i) transmit any viruses, worms, defects, Trojan horses,
              or any items of a destructive nature.
            </li>
          </ul>
          <Typography variant="h5" gutterBottom>
            4.3. Abusive user-submitted information
          </Typography>
          <Typography paragraph>
            Any user can report incorrect, misleading or abusive
            information or content which does not conform to these
            Terms and Conditions by contacting the system
            administrators at{' '}
            <a href="mailto:mail@liberovitae.com">
              mail@liberovitae.com
            </a>
            . liberovitae.com reserves the right to remove or change
            user-submitted information which violates these Terms and
            Conditions without any liability to the user.
            liberovitae.com reserves the right to expel users and
            prevent their further access to the service for violating
            the Terms and Conditions or the law.
          </Typography>
          <Typography variant="h5" gutterBottom>
            4.4. Your rights
          </Typography>
          <Typography paragraph>
            liberovitae.com claims no ownership or control over any
            content submitted by you. You or a third party licensor,
            as appropriate, retain all patent, trademark and copyright
            to any information you submit and you are responsible for
            protecting those rights. By submitting information, you
            grant liberovitae.com a worldwide, non-exclusive,
            royalty-free license to reproduce, adapt and publish the
            information for the purpose of display and distribution.
            This license terminates when such information is deleted
            from the website.
          </Typography>
          <Typography variant="h5" gutterBottom>
            5. Privacy
          </Typography>
          <Typography paragraph>
            liberovitae.com considers privacy an important issue, so
            we build and operate our web services with the protection
            of privacy taken into account. Please refer to our Privacy
            Policy for details.
          </Typography>
          <Typography variant="h5" gutterBottom>
            6. Disclaimer
          </Typography>
          <Typography paragraph>
            liberovitae.com declines all liability whatsoever for loss
            or damage of any kind that you or any third parties may
            incur in connection with access to or use of the
            liberovitae.com website or parts thereof, or from links to
            third parties’ websites. Anyone visiting a liberovitae.com
            website, using the information contained therein or
            availing themselves of the offers featured therein does so
            at their own risk and responsibility. liberovitae.com also
            declines all liability for lost earnings, for
            Internet-related malfunctions of all kinds (e.g.
            suspension of operations, disruption of functions,
            viruses, pernicious components, terrorist acts, etc.), for
            misuse by third parties (hacking into data, copying, etc.)
            and for loss of programs or other data in your information
            systems. This applies even if liberovitae.com websites
            might indicate the possibility of such damage.
          </Typography>
          <Typography variant="h5" gutterBottom>
            7. Linked websites
          </Typography>
          <Typography paragraph>
            Some links on the liberovitae.com website lead to third
            parties’ websites which are outside the control of
            liberovitae.com. liberovitae.com cannot accept
            responsibility for the correctness, completeness or
            lawfulness of the content of these websites or of any
            links to further websites, nor for any offers, products or
            services contained therein. This applies even if such
            websites feature the liberovitae.com logo or another
            protected name. Users access the linked websites at their
            own risk.
          </Typography>
          <Typography variant="h5" gutterBottom>
            8. Applicable law and place of jurisdiction
          </Typography>
          <Typography paragraph>
            The courts at the registered office of liberovitae.com in
            UK have sole jurisdiction over any disputes arising
            between you as visitor to and user of the liberovitae.com
            website and liberovitae.com in connection with the
            operation or use of the liberovitae.com website. Relations
            between the parties shall be governed exclusively by UK
            law.
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

export default Terms;
