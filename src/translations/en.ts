const intervals = {
  month: 'Month',
  week: 'Week',
  day: 'Day',
  year: 'Year',
}
const subscriptionStatus = {
  active: 'Active',
  canceled: 'Canceled',
  incomplete: 'Incomplete',
  incomplete_expired: 'Incomplete Expired',
  past_due: 'Past due',
  trialing: 'Trialing',
  unpaid: 'Unpaid',
}
export const phrases = {
  leaving: "I'm Leaving",
  spaceWillBeFree: 'Space will be free',
  direction: 'Direction',
  directionToNearest: 'To neareast spot!',
  noSpot: "Oh no, it's gone!",
  someoneTookIt: 'Me or someone took it!',
  wellDone: 'Well Done!',
  thanks: 'Thanks!',
  yesICanSee: 'Yeap, I can see',
  nearToMe: 'Near to Me',
  cancel: 'Cancel',
  changedMyMind: 'Changed My Mind',
  markSpot: 'Mark Spot',
  invalid: 'Invalidate',
  spotFree: 'Spot free',
  spotFreeHere: 'Spot free here',
  toCancelMoveIt: 'To Cancel, move on map!',
  validated: 'Validated',
  created: 'Created',
  invalidated: 'Invalidated',
  minLocation: 'You need to be %{distance}m max from spot',
  permissionDenied: 'Permission to access location was denied',
  signIn: 'Sign In',
  signInGoogle: 'Sign In with Google',
  signInApple: 'Sign In with Apple',
  signInGoogleSuccess: 'Google success response',
  signOutTitle: "It' a goodby?",
  signOutDescription: 'Are you sure, that you want sign out?',
  noSignOut: 'No, I wanna stay',
  yesSignOut: "Yes, I'm sure!",
  pins: 'PINS',
  pinOnBoardingDescriptionOne: 'User created a Pin.',
  pinOnBoardingDescriptionTwo: 'Somebody confirmed a Pin.',
  pinOnBoardingDescriptionThree: 'Somebody invalidated a Pin.',
  pinOnBoardingDescriptionThreeExtra: 'Will be removed in aprox. 2 min.',
  back: 'Back',
  continue: 'Continue',
  next: 'Next',
  collaboratorsOnBoardingDescriptionOne: 'Our collaborators on street.',
  collaboratorsOnBoardingDescriptionTwo: 'Our collaborator mark. ',
  collaborators: 'COLLABORATORS',
  subscriptions: 'SUBSCRIPTIONS',
  monthly: 'MONTHLY',
  oneDay: 'ONE DAY',
  subscriptionsScreen: {
    subscriptionsOnBoardingTitleOne: 'STANDARD',
    subscriptionsOnBoardingTitleTwo: 'GOLD',
    subscriptionsOnBoardingTitleThree: 'SOLO',
    subscriptionsOnBoardingDescriptionOne: 'Only access others users Pins',
    subscriptionsOnBoardingDescriptionTwo:
      'Access users and Collaborators Pins',
    subscriptionsOnBoardingDescriptionThree:
      'Access users and Collaborators Pins',
    subscriptionsOnBoardingPriceOne: 'FREE',
    subscriptionsOnBoardingPriceTwo: '€ 3,99',
    subscriptionsOnBoardingPriceThree: '€ 0,50',
  },
  goToCheckout: 'Go to Checkout',
  screens: {
    home: 'Home',
    termsAndCondition: 'Terms and Condition',
    settings: 'Settings',
    instructions: 'Instructions',
    subscriptions: 'Subscriptions',
  },
  subscriptionsList: {
    freeTrialText: '15 Days Free Trial',
    subscriptionFooter: 'then %{price} per month. Cancel anytime.',
    goToCheckout: 'Go to Checkout',
  },
  subscriptionCheckout: {
    subscribe: 'Subscribe',
    userPins: "User's Pins",
    collaboratorPins: "Collaborator's Pins",
    cancelAnytime: 'Cancel anytime',
    fourteenDaysTrial: '14 days trial',
  },
  subscriptionPayment: {
    addPayment: 'Add Payment',
    success: 'Successfully Subscribed',
    error: 'Somenthing went wrong, please try later',
  },
  subscriptionDetails: {
    status: 'Status',
    startDate: 'Start Date',
    currency: 'Currency',
    daysUntilDue: 'Days Until Due',
    trialStart: 'Trial Start',
    trialEnd: 'Trial End',
    subscriptionType: 'Subscription Type',
    subscriptionPrice: 'Subscription Price',
    subscriptionInterval: 'Subscription Interval',
    one_time: 'One Time',
    recurring: 'Recurring',
    collectionMethod: 'Collection Method',
    charge_automatically: 'Charge Automatically',
    send_invoice: 'Send Invoice',
    currentPeriodStart: 'Current Period Start',
    currentPeriodEnd: 'Current Period End',
    cancelAtPeriodEnd: 'Cancel At',
    addPayment: 'Add Payment',
    paymentMethod: 'Payment Method',
    authPayment: 'Authenticate Payment',
    cancel: 'Cancel',
    empty: '-',
    ...subscriptionStatus,
    ...intervals,
  },
  signInCTA: {
    title: 'Ops! you need to be signed.',
    signIn: 'Sign In',
  },
}
