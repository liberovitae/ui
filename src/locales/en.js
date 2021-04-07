export default {
  // Site
  'site.name': 'liberovitae.com',
  'site.header': 'Your trusted social connectivity platform.',

  // Venue site header
  'venue.site_header':
    'Your trusted source for venues - free & simple.',

  // Event site header
  'event.site_header':
    'Your go-to source for events - free & simple.',

  // search
  'search.not_found': 'No posts found matching your search',
  'search.posts': 'Search {type}s',

  // jobTypes
  'jobTypes.full': 'Full Time',
  'jobTypes.part': 'Part Time',
  'jobTypes.temp': 'Temporary',
  'jobTypes.contract': 'Contract',
  'jobTypes.freelance': 'Freelance',
  'jobTypes.volunteer': 'Volunteer',

  'companyTypes.hospitality': 'Hospitality',
  'companyTypes.trades': 'Trades',
  'companyTypes.arts': 'Arts & Culture',
  'companyTypes.health': 'Health',
  'companyTypes.services': 'Sales & services',
  'companyTypes.management': 'Management',
  'companyTypes.manufacturing': 'Manufacturing',
  'companyTypes.engineering': 'Engineering',
  'companyTypes.finance': 'Finance',
  'companyTypes.misc': 'Misc',

  // venueTypes
  'venueTypes.retail': 'Retail',
  'venueTypes.hospitality': 'Hospitality',
  'venueTypes.arts': 'Art & Music',
  'venueTypes.services': 'Services',
  'venueTypes.health': 'Health & Sport',
  'venueTypes.misc': 'Misc',

  // eventTypes
  'eventTypes.music': 'Music',
  'eventTypes.arts': 'Visual & Performing Arts',
  'eventTypes.film': 'Film',
  'eventTypes.books': 'Lectures & Books',
  'eventTypes.fashion': 'Fashion',
  'eventTypes.food': 'Food & Drink',
  'eventTypes.festivals': 'Festivals & Fairs',
  'eventTypes.charities': 'Charities',
  'eventTypes.sports': 'Sports & Active Life',
  'eventTypes.nightlife': 'Nightlife',
  'eventTypes.kids': 'Kids & Family',
  'eventTypes.other': 'Other',

  // Common and shared single words/phrases
  'common.name': 'Name',
  'common.title': 'Title',
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
  'common.view': 'View',

  // Navbar
  'navbar.create_post_button': 'Create {type}',
  'navbar.account_button': 'My account',
  'navbar.saved_posts': 'Saved {type}s',
  'navbar.alerts': 'Alerts',
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
  'account.menu.posts': 'Posts',
  'account.menu.alerts': 'Alerts',
  'account.menu.saved': 'Saved',
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

  // Save post
  'account.save_post.hero.title': 'Save {type}',
  'account.save_post.hero.subtitle': 'Create a saved {type}',
  'account.save_post.save_success_snackbar':
    'Successfully saved {type}',
  'account.save_post.save_failure_snackbar': 'Failed to save {type}',
  'account.save_post.save_duplicate_snackbar':
    'The post you selected has already been added to your saved {type}s',
  'account.save_post.save_text': 'Save this {type} for later',
  'account.save_post.save_reminder_label': 'Send email reminder',
  'account.save_post.save_reminder_helperText':
    'Select this option if you like to get a reminder email for this {type} 7 days from now',

  // Saved posts
  'account.saved.hero.title': 'Saved',
  'account.saved.hero.subtitle': 'Manage your saved post',
  'account.saved.description':
    'Your saved events ({eventIcon}), venues ({venueIcon}) & jobs ({jobIcon}) are shown below. Reminder emails will be sent to {email} for listings saved with the reminder option selected. (indicated by {icon} ).',
  'account.saved.reminder_title': 'Saved with reminder email',
  'account.saved.not_found': 'No saved posts found',
  'account.saved.remove_success_snackbar':
    'Successfully removed saved {type}',
  'account.saved.remove_failure_snackbar':
    'Failed to remove saved {type}',
  'account.saved.confirm_delete':
    'Are you sure you want to delete this saved {type}?',
  'account.saved.view_post_button': 'View',
  'account.saved.none_found': 'No saved posts found',

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
  'alerts.none_found': 'No alerts found',

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
  'alert_form.title_input_helperText':
    'Give your alert setup a title to describe what it is about',
  'alert_form.keywords_input_helperText':
    'You can enter a search term here to narrow down your results.',
  'alert_form.location_input_label': 'Location',
  'alert_form.location_input_helperText': `For exact city, state or country filtering if necessary or leave blank for all locations.
    `,

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
    'Your prime source for job opportunities - free & simple.',

  // Job detail
  'job_detail.apply_button': 'Apply now',
  'job_detail.apply_later_button': 'Apply later',
  'job_detail.share_buttons.text': 'Share',
  'job_detail.apply_button_tooltip':
    'To apply for this job please send your application via email to {url}',

  // Post list
  'posts_list.no_jobs':
    'There are no posts yet ... be the first to post one!',
  'posts_list.load_more_button': 'Load more',

  // Post form
  'post_form.hero.title': 'Post a new {type}',
  'post_form.hero.subtitle': 'Edit your {type}',
  'post_form.header': '{type} details',
  'post_form.title.input_label': '{type} name',
  'post_form.types.input_label': '{type} types',
  'post_form.types.input_helperText':
    'Select one or more applicable {type} types.',
  'post_form.location.input_label': '{type} location',
  'post_form.location.input_helperText':
    'If this is a remote/online {type} just enter "Remote" or e.g. "Remote, GB" if country/timezone restrictions apply.',
  'post_form.location.input_placeholder': `e.g. "London, GB" or "San Francisco, CA, US"`,
  'post_form.location.input_helperText':
    'If this is a remote {type} just enter "Remote" or e.g. "Remote, GB" if country/timezone restrictions apply.',
  'post_form.text.input_label': 'Description',
  'post_form.text.input_helperText':
    'Tell us more about your {type}.',
  'post_form.tags.input_label': '{type} tags',
  'post_form.tags.input_helperText':
    'Select or create tags for your {type} (max 10).',
  'post_form.url.input_label': 'Website URL or email address',
  'post_form.url.input_helperText':
    'Enter the URL to your website or a contact email address',
  'post_form.button': 'Continue to preview',
  'post_form.load_failure_snackbar': 'Failed to load {type}',
  'post_form.upload_input_label': 'Logo (optional)',
  // Post preview
  'preview.draft_save.success_snackbar':
    'Successfully saved draft {type}',
  'preview.publish.success_snackbar':
    'Successfully published {type}.',
  'preview.hero.title': 'Post a new {type}',
  'preview.hero.subtitle': 'Preview your {type}',
  'preview.edit_post_button': 'Edit {type}',
  'preview.edit_venue_button': 'Edit {type}',
  'preview.save_draft_button': 'Save draft',
  'preview.publish_button': 'Publish',
  'preview.frontpage_text':
    'This is how it looks on the front page and in search results:',
  'preview.detail_text':
    'Here is the preview of the details page of your {type}:',
  'preview.confirm_text': 'Looks good?',
  'preview.change_button': `No, let's change it`,

  // Account Posts
  'account.posts.hero.title': 'Posts',
  'account.posts.hero.subtitle': 'Manage your posts',
  'account.posts.description': 'Your posts are shown below.',
  'account.posts.create_new_button': 'Create new »',
  'account.posts.none_found': 'No posts found',
  'account.posts.remove_success_snackbar':
    'Successfully removed post',
  'account.posts.remove_failure_snackbar': 'Failed to remove post',
  'account.posts.confirm_delete':
    'Are you sure you want to delete this post?',

  // Account events
  'account.events.create_new_button': 'New event',
  'account.events.remove_success_snackbar':
    'Successfully removed event',
  'account.events.remove_failure_snackbar': 'Failed to remove event',
  'account.events.confirm_delete':
    'Are you sure you want to delete this event?',

  // Post detail
  'post_detail.contact_button': 'Contact {type}',
  'post_detail.visit_button': 'Visit website',
  'post_detail.save_later_button': 'Add to saved {type}s',
  'post_detail.share_buttons.text': 'Share',
  'post_detail.contact_button_tooltip':
    'To contact this {type} please send your an email to {url}',

  // Filter

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
