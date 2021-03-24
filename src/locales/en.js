export default {
  // Site
  'site.name': 'liberovitae.com',
  'site.header': 'Your trusted social connectivity platform.',

  // search
  'search.not_found': 'No items found matching your search',

  // jobTypes
  'jobTypes.full': 'Full Time',
  'jobTypes.part': 'Part Time',
  'jobTypes.temp': 'Temporary',
  'jobTypes.contract': 'Contract',
  'jobTypes.freelance': 'Freelance',
  'jobTypes.volunteer': 'Volunteer',

  // venueTypes
  'venueTypes.retail': 'Retail',
  'venueTypes.hospitality': 'Hospitality',
  'venueTypes.arts': 'Art & Music',
  'venueTypes.services': 'Services',
  'venueTypes.health': 'Health & Sport',
  'venueTypes.misc': 'Misc',

  // Regions
  'regions.africa': 'Africa',
  'regions.asia': 'Asia/Pacific',
  'regions.europe': 'Europe',
  'regions.middleeast': 'Middle East',
  'regions.namerica': 'North America',
  'regions.samerica': 'South America',
  'regions.remote': 'Remote/Anywhere',

  // Common and shared single words/phrases
  'common.name': 'Name',
  'common.keywords': 'Keywords',
  'common.location': 'Location',
  'common.account': 'Account',
  'common.username': 'Username',
  'common.email': 'Email',
  'common.email_address': 'Email address',
  'common.password': 'Password',
  'common.password_confirmation': 'Password confirmation',
  'common.save': 'Save',
  'common.unmark': 'Unmark',
  'common.mark': 'Mark',
  'common.filled': 'Filled',
  'common.delete': 'Delete',
  'common.edit': 'Edit',
  'common.login': 'Log in',
  'common.logout': 'Log out',
  'common.register': 'Register',
  'common.success': 'Success',
  'common.failure': 'Failure',
  'common.reset': 'Reset',
  'common.title': 'Title',
  'common.subtitle': 'Subtitle',
  'common.text': 'Text',
  'common.back': '« Back',

  // Navbar
  'navbar.post_job_button': 'Post a job',
  'navbar.account_button': 'My account',
  'navbar.saved_jobs': 'Saved jobs',
  'navbar.saved_venues': 'Saved venues',
  'navbar.alerts': 'Alerts',
  'navbar.post_venue_button': 'Post a venue',
  'navbar.search_jobs': 'Search jobs',
  'navbar.search_venues': 'Search venues',
  'navbar.admin_button': 'Admin',

  // Account

  // Login
  'account.login.hero.title': 'Login',
  'account.login.hero.subtitle': 'Welcome back!',
  'account.login.input_username_label': 'Email or username',

  // Verify
  'account.verify.hero.subtitle_success':
    'Your email address has been verified',
  'account.verify.hero.subtitle_failure':
    'Your email address has not been verified',
  'account.verify.success_text':
    'You can now create a venues and post job ads. Below are some links you might find useful.',
  'account.verify.failure_text':
    'The token was not found or is invalid',
  'account.verify.dashboard_warning':
    'Please verify your email address via the link that has been sent to you in our verification email. New user accounts without a verified email address are unable to post venues or job ads and will be deleted automatically after 3 days.',

  // Register
  'account.register.hero.title': 'Register',
  'account.register.hero.subtitle': 'Create your account',
  'account.register.terms_label':
    'I have read and agree to the website {link}. *',
  'account.register.password_helperText':
    'Enter the same password as before, for verification',
  'account.register.privacy_label': `I have read and accept the {link} and allow
  liberovitae.com to collect and store the data I submit
  through this form. *`,
  'account.register.login_text': 'Already have an account? {link}',

  //Menu
  'account.menu.dashboard': 'Dashboard',
  'account.menu.jobs': 'Jobs',
  'account.menu.venues': 'Venues',
  'account.menu.alerts': 'Alerts',
  'account.menu.job_ads': 'Job ads',
  'account.menu.company': 'Company',
  'account.menu.job_alerts': 'Job alerts',
  'account.menu.saved': 'Saved',
  'account.menu.saved_venues': 'Saved venues',
  'account.menu.settings': 'Settings',
  'account.menu.logout': 'Log out',

  // Account dashboard
  'account.dashboard.hero.title': 'Dashboard',
  'account.dashboard.hero.subtitle': `Let's get started!`,
  'account.dashboard.title': 'Hi!',
  'account.dashboard.description': `  From here you can manage your{' '}
  <Link to={routes.JOBS}>job ads</Link>, edit your
  <Link to={routes.EDIT_COMPANY}> company info</Link>, and{' '}
  <Link to={routes.SETTINGS}>
    change your password and account details
  </Link>
  . <br />
  <br />
  Go back to{' '}
  <Link to={routes.LANDING}>job search / front page</Link>.`,

  // Password reset
  'account.password_reset.hero.title': 'Password reset',
  'account.password_reset.hero.subtitle': 'Send password reset email',
  'account.password_reset.description': `Forgotten your password? Enter your email address below, and we'll email you instructions for setting a new one.`,
  'account.password_reset.button': 'Reset my password',
  'account.password_reset.input_label': 'Email',
  'account.password_reset.request_success': `We've emailed you instructions for setting your password, if
  an account exists with the email you entered. You should
  receive them shortly. {break}{break} If you don't receive an email, please
  make sure you've entered the address you registered with,
  and check your spam folder.`,

  'account.password_required_validation_text': 'Password required',
  'account.password.isStrongPassword_validation_text':
    "Password isn't strong enough",
  'account.new_password.hero.title': 'Password reset',
  'account.new_password.hero.subtitle': 'Enter new password',
  'account.new_password.description':
    'Please enter your new password twice so we can verify you typed it correctly.',
  'account.new_password.password_input_label': 'New password',
  'account.new_password.passwordConfirm_input_label':
    'New password confirmation',
  'account.new_password.button': 'Change my password',
  'account.new_password.success_description':
    ' Your password has been set. You may go ahead and login now.',
  'account.new_password.success.hero.title': 'Password reset',
  'account.new_password.success.hero.subtitle':
    'Password reset complete',

  // Jobs
  'account.job_ads.hero.title': 'Jobs',
  'account.job_ads.hero.subtitle':
    'Manage your listings, company info & saved jobs',
  'account.job_ads.description':
    'Your published, expired and filled job listings are shown below.',
  'account.job_ads.create_new_button': 'New job ad',
  'account.job_ads.none_found': 'No job ads found',
  'account.job_ads.company_button': 'Edit company',
  'account.job_ads.remove_success_snackbar':
    'Successfully removed job ad',
  'account.job_ads.remove_failure_snackbar':
    'Failed to remove job ad',
  'account.job_ads.confirm_delete':
    'Are you sure you want to delete this listing?',

  // Account settings
  'account.settings.hero_title': 'Settings',
  'account.settings.hero_subtitle': 'View and edit your user data',
  'account.settings.info_title': 'Account information',
  'account.settings.delete_title': 'Delete account',
  'account.settings.change_email_button': 'Change email',
  'account.settings.change_password_button': 'Change password',
  'account.settings.delete_account_button': 'Delete account',
  'account.settings.delete_account_text':
    'Want to close your account?',

  'account.password.hero.title': 'Password change',
  'account.password.hero.subtitle': 'Enter new password',
  'account.password.description': ` Please enter your old password, for security's sake, and
  then enter your new password twice so we can verify you
  typed it in correctly.`,
  'account.password.password_conditions': ` <ul>
  <li>
    Your password must contain at least 8 characters.
  </li>
  <li>
    Your password must contain an uppercase character, a number and a special character/symbol.
  </li>
</ul>`,
  'account.password.old_password_input_label': 'Old password',
  'account.password.new_password_input_label': 'New password',
  'account.password.new_password_confirmation_input_label':
    'New password confirmation',
  'account.password.required_validation_text':
    'This field is required',
  'account.password.mismatch_validation_text': 'Password mismatch',
  'account.password.save_button': 'Change my password',
  'account.password.back_button': 'Go back',
  'account.password.save_success_snackbar':
    'Successfully updated password',
  'account.password.save_failure.snackbar':
    'Failed to update password',

  // Account edit
  'account.edit.hero.title': 'Account update',
  'account.edit.hero.subtitle': 'Edit your account data',
  'account.edit.save_button': 'Save changes',
  'account.edit.back_button': 'Go back',
  'account.edit.success_snackbar':
    'Successfully updated account details',
  'account.edit.failure_snackbar': 'Failed to update account',
  'account.delete.hero.title': 'Delete account',
  'account.delete.hero.subtitle':
    'Close your account and delete all your data',
  'account.delete.description':
    ' Are you sure you want to close your account and delete all data associated with it?',
  'account.delete.confirm_button': 'Yes, delete everything',
  'account.delete.back_button': 'No, go back',
  'account.delete.success_snackbar': 'Successfully deleted user',
  'account.delete.confirm_text':
    'This action cannot be undone. Are you really sure?',

  // Save item
  'account.save_item.hero.title': 'Save {type}',
  'account.save_item.hero.subtitle': 'Create a saved {type}',
  'account.save_item.save_success_snackbar':
    'Successfully saved listing',
  'account.save_item.save_failure_snackbar': 'Failed to save {type}',
  'account.save_item.save_duplicate_snackbar':
    'The item you selected has already been added to your saved listings',
  'account.save_item.save_text': 'Save this {type} for later',
  'account.save_item.save_reminder_label': 'Send email reminder',
  'account.save_item.save_reminder_helperText':
    'Select this option if you like to get a reminder email for this {type} 7 days from now',

  // Saved items
  'account.saved.hero.title': 'Saved',
  'account.saved.hero.subtitle': 'Manage your saved jobs & venues',
  'account.saved.description':
    'Your saved jobs ({jobIcon}) & venues ({venueIcon}) are shown below. Reminder emails will be sent to {email} for listings saved with the reminder option selected. (indicated by {icon} ).',
  'account.saved.reminder_title': 'Saved with reminder email',
  'account.saved.not_found': 'No saved listings found',
  'account.saved.remove_success_snackbar':
    'Successfully removed saved listing',
  'account.saved.remove_failure_snackbar':
    'Failed to remove saved listing',
  'account.saved.confirm_delete':
    'Are you sure you want to delete this saved listing?',
  'account.saved.view_item_button': 'View',
  'account.saved.none_found': 'No saved listings found',

  // Alerts
  alerts: 'Alerts',
  'alerts.hero.title': 'Alerts',
  'alerts.hero.subtitle': 'Manage your alerts',
  'alerts.description':
    'Your alerts for venues ({venueIcon}) and jobs ({jobIcon}) are show below and will be mailed to',
  'alerts.create_button': 'Create new alert',
  'alerts.show_results_button': 'Show results',
  'alerts.edit_button': 'Edit',
  'alerts.deactivate_button': 'Deactivate',
  'alerts.activate_button': 'Activate',
  'alerts.delete_button': 'Delete',
  'alerts.active': 'Active',
  'alerts.inactive': 'Inactive',
  'alerts.status': 'Status',
  'alerts.frequency': 'Frequency',
  'alerts.delete.success_snackbar': 'Successfully deleted alert',
  'alerts.delete.failure_snackbar': 'Failed to remove alert',
  'alerts.activate.success_snackbar':
    'Successfully deactivated alert',
  'alerts.deactivate.success_snackbar':
    'Successfully activated alert',
  'alerts.confirm_delete':
    'Are you sure you wanted to delete this alert?',
  'alerts.none_found': 'No alert found',

  // Alert form
  'alert_form.hero.subtitle_create': 'Create your alert',
  'alert_form.hero.subtitle_edit': 'Edit your alert',
  'alert_form.title': 'Alert setup',
  'alert_form.description': `
  Daily alerts are sent every morning (UTC) whenever new posts
  appear within the 24h before. So you always get notified
  soon after a new listing has been published that matches
  your criteria below.
 {break}{break}
  The same applies to weekly alerts, except with all posts
  from the previous week appearing in one list, sent out
  every Monday morning (UTC).
  `,
  'alert_form.name_input_helperText':
    'Give your alert setup a name to describe what it is about',
  'alert_form.keywords_input_helperText':
    'You can enter a search term here to narrow down your results.',
  'alert_form.location_input_label': 'Location',
  'alert_form.location_input_helperText': `For exact city, state or country filtering if necessary or leave blank for all locations.
    `,
  'alert_form.regions_input_label': 'Regions',
  'alert_form.regions_input_helperText':
    'Select a region or leave blank if you want to cover all regions.',
  'alert_form.types_input_label': 'Types',
  'alert_form.types_input_helperText':
    'Select a {type} type or leave blank if you want to include all types.',
  'alert_form.frequency_input_label': 'Alert frequency',
  'alert_form.helperText': `You can immediately test your search results after saving by clicking on the "Show results" button in the alert list overview.
  `,
  'alert_form.active_input_label': 'Alert is active',
  'alert_form.not_found_snackbar': 'Alert not found',
  'alert_form.updated_success_snackbar': 'Successfully updated alert',
  'alert_form.created_success_snackbar': 'Sucessfully created alert',

  // Job site header
  'job.site_header':
    'Your prime source for opportunities - free & simple.',

  // Job detail
  'job_detail.apply_button': 'Apply now',
  'job_detail.apply_later_button': 'Apply later',
  'job_detail.share_buttons.text': 'Share',
  'job_detail.apply_button_tooltip':
    'To apply for this job please send your application via email to {url}',

  // Job preview
  'job_preview.draft_save.success_snackbar':
    'Successfully saved draft job',
  'job_preview.publish.success_snackbar':
    'Successfully published job.',
  'job_preview.hero.title': 'Post a job',
  'job_preview.hero.subtitle': 'Preview your job ad',
  'job_preview.edit_item_button': 'Edit job ad',
  'job_preview.edit_company_button': 'Edit company info',
  'job_preview.save_draft_button': 'Save draft',
  'job_preview.publish_button': 'Publish',
  'job_preview.frontpage_text':
    'This is how it looks on the front page and in search results:',
  'job_preview.detail_text':
    'Here is the preview of the details page of your job ad:',
  'job_preview.confirm_text': 'Looks good?',
  'job_preview.change_button': `No, let's change it`,

  // Venue preview
  'venue_preview.draft_save.success_snackbar':
    'Successfully saved draft venue',
  'venue_preview.publish.success_snackbar':
    'Successfully published venue.',
  'venue_preview.hero.title': 'Post a venue',
  'venue_preview.hero.subtitle': 'Preview your venue ad',
  'venue_preview.edit_item_button': 'Edit venue ad',
  'venue_preview.edit_company_button': 'Edit company info',
  'venue_preview.save_draft_button': 'Save draft',
  'venue_preview.publish_button': 'Publish',
  'venue_preview.frontpage_text':
    'This is how it looks on the front page and in search results:',
  'venue_preview.detail_text':
    'Here is the preview of the details page of your venue ad:',
  'venue_preview.confirm_text': 'Looks good?',
  'venue_preview.change_button': `No, let's change it`,

  // Items list
  'items_list.no_jobs':
    'There are no items yet ... be the first to post one!',
  'items_list.load_more_button': 'Load more',

  // Company
  'company_form.hero.title': 'Company',
  'company_form.hero.subtitle': 'Edit your company data',
  'company_form.update.success_snackbar':
    'Your company info has been updated successfully.',
  'company_form.update.failure_snackbar:':
    'Your company info failed to update.',
  'company_form.title': 'Company details',
  'company_form.description': `Below you can edit the company information shown in your
job ads. Changes will be applied immediately to all
existing and future listings. At the moment only one
company per user account can be created and edited.`,
  'company_form.name_input_label': 'Company name',
  'company_form.upload_input_label': 'Logo (optional)',
  'company_form.website_input_label': 'Website (optional)',
  'company_form.tagline_input_label': 'Tagline (optional)',
  'company_form.twitter_input_label': 'Twitter (optional)',
  'company_form.linkedin_input_label': 'LinkedIn (optional)',
  'company_form.button_account': 'Save changes',
  'company_form.button': 'Save changes and proceed',

  // Post job form
  'post_job.hero.title': 'Post a job',
  'post_job.hero.subtitle': 'Edit your job ad',
  'post_job.header': 'Job details',
  'post_job.title.input_label': 'Job title',
  'post_job.types.input_label': 'Job types',
  'post_job.types.input_helperText':
    'Select one or more applicable job types.',
  'post_job.regions.input_label': 'Job regions',
  'post_job.regions.input_helperText':
    'Select one or more regions. For a remote position select "Remote/Anywhere" and any regional restrictions if applicable.',
  'post_job.location.input_label': 'Job location',
  'post_job.location.input_helperText':
    'If this is a remote position just enter "Remote" or e.g. "Remote, GB" if country/timezone restrictions apply.',
  'post_job.location.input_placeholder': `e.g. "London, GB" or "San Francisco, CA, US"`,

  'post_job.description.input_label': 'Description',
  'post_job.description.input_helperText':
    'Add a description of the position - requirements, duties, etc.',
  'post_job.tags.input_label': 'Job tags',
  'post_job.level.input_label': 'Experience level',
  'post_job.level.input_helperText':
    'Select minimum required or leave blank (e.g. if position is an internship)',
  'post_job.tags.input_helperText':
    'Select or create tags for your job (max 10).',
  'post_job.url.input_label': 'Application URL or email address',
  'post_job.url.input_helperText':
    'Enter the URL to your career/job page or an application email address',
  'post_job.button': 'Continue to preview',
  'post_job.load_failure_snackbar': 'Failed to load job',
  'post_job.job_filled_snackbar': 'This job as already been filled',

  // Post venue form
  'post_venue.hero.title': 'Post a venue',
  'post_venue.hero.subtitle': 'Edit your venue',
  'post_venue.header': 'Venue details',
  'post_venue.title.input_label': 'Venue name',
  'post_venue.types.input_label': 'Venue types',
  'post_venue.types.input_helperText':
    'Select one or more applicable venue types.',
  'post_venue.regions.input_label': 'Venue regions',
  'post_venue.regions.input_helperText':
    'Select one or more regions. For a remote/online venue select "Remote/Anywhere".',
  'post_venue.location.input_label': 'Venue location',
  'post_venue.location.input_helperText':
    'If this is a remote/online venue just enter "Remote" or e.g. "Remote, GB" if country/timezone restrictions apply.',
  'post_venue.location.input_placeholder': `e.g. "London, GB" or "San Francisco, CA, US"`,

  'post_venue.description.input_label': 'Description',
  'post_venue.description.input_helperText':
    'Tell us more about your venue.',
  'post_venue.tags.input_label': 'Venue tags',
  'post_venue.tags.input_helperText':
    'Select or create tags for your venue (max 10).',
  'post_venue.url.input_label': 'Website URL or email address',
  'post_venue.url.input_helperText':
    'Enter the URL to your website or a contact email address',
  'post_venue.button': 'Continue to preview',
  'post_venue.load_failure_snackbar': 'Failed to load venue',

  // Venue site header
  'venue.site_header':
    'Your trusted source for venues - free & simple.',

  // Venue preview
  'venue_preview.draft_save.success_snackbar':
    'Successfully saved draft venue',
  'venue_preview.publish.success_snackbar':
    'Successfully published venue.',
  'venue_preview.hero.title': 'Post a venue',
  'venue_preview.hero.subtitle': 'Preview your venue',
  'venue_preview.edit_venue_button': 'Edit venue',
  'venue_preview.save_draft_button': 'Save draft',
  'venue_preview.publish_button': 'Publish',
  'venue_preview.frontpage_text':
    'This is how it looks on the front page and in search results:',
  'venue_preview.detail_text':
    'Here is the preview of the details page of your venue:',
  'venue_preview.confirm_text': 'Looks good?',
  'venue_preview.change_button': `No, let's change it`,

  // Account Venues
  'account.venues.hero.title': 'Venues',
  'account.venues.hero.subtitle':
    'Manage your venues, events & saved venues',
  'account.venues.description':
    'Your published venues & events are shown below.',
  'account.venues.create_new_button': 'New venue',
  'account.venues.none_found': 'No venues found',
  'account.venues.remove_success_snackbar':
    'Successfully removed venue',
  'account.venues.remove_failure_snackbar': 'Failed to remove venue',
  'account.venues.confirm_delete':
    'Are you sure you want to delete this venue?',

  // Venue detail
  'venue_detail.contact_button': 'Contact venue',
  'venue_detail.visit_button': 'Visit website',
  'venue_detail.save_later_button': 'Add to saved venues',
  'venue_detail.share_buttons.text': 'Share',
  'venue_detail.contact_button_tooltip':
    'To contact this venue please send your an email to {url}',

  // Filter
  'filter.regions.input_label':
    'Filter by region and/or "Remote/Anywhere"...',
  'filter.create_job_alert_button': 'Create alert',

  // Footer
  'footer.column1.text': '',
  'footer.column1.link1': 'Find a venue',
  'footer.column1.link2': 'Post a venue',
  'footer.column1.link3': 'Venue alerts',
  'footer.column1.link4': 'Saved venues',
  'footer.column1.link5': 'My account',
  'footer.column2.header': 'Venues',
  'footer.column2.link1': 'Find a job',
  'footer.column2.link2': 'Post a job',
  'footer.column2.link3': 'Job alerts',
  'footer.column2.link4': 'Saved jobs',
  'footer.column2.link5': 'My account',
  'footer.column3.header': 'Jobs',
  'footer.column4.header': 'Connect',

  //// Admin

  'admin.blogs.create_button': 'Create blog post',
  'admin.blogs.description': 'Manage blog posts below',
  'admin.blogs.confirm_delete':
    'Are you sure you want to delete this blog?',
  'admin.blogs.remove_success_snackbar': 'Successefully deleted blog',
  'admin.blogs.remove_failure_snackbar': 'Failed to delete blog',
  'admin.blogs.hero.title': 'Blogs',
  'admin.blogs.hero.subtitle': 'Manage site blog posts',
  'admin.blogs.none_found': 'No blog posts found',

  'admin.menu.blogs': 'Blogs',
  'admin.menu.users': 'Users',
  'admin.menu.dashboard': 'Dashboard',

  // Blogs

  'blog_form.updated_success_snackbar': 'Successfully updated blog',
  'blog_form.created_success_snackbar': 'Sucessfully created blog',
};
