import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_3m6k6he';
const TEMPLATE_ID = 'template_tb7hcg6';
const PUBLIC_KEY = 'vBfjc7u7JsnE7c6JQ';

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

/**
 * Helper to send email notification safely without breaking UI flow
 */
const sendNotification = async (eventType, messageDetails, extraData = {}) => {
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const templateParams = {
    event_type: eventType,
    message: messageDetails,
    time: timestamp,
    timestamp: timestamp,
    user_action: eventType,
    details: JSON.stringify(extraData),
    from_name: 'Apology Website Notification',
    to_name: 'Boyfriend',
    reply_to: 'noreply@apology.app',
    ...extraData
  };

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log(`[EmailJS Success] ${eventType}:`, response.status, response.text);
    return true;
  } catch (error) {
    console.warn(`[EmailJS Notice] ${eventType} send error (non-fatal):`, error);
    return false;
  }
};

/**
 * Trigger 1: When user opens the website
 */
export const sendWebsiteOpenedNotification = () => {
  return sendNotification(
    'Website Opened 🍅',
    'She just opened your apology website! 💖 Get ready!'
  );
};

/**
 * Trigger 2: When she accepts the initial apology
 */
export const sendApologyAcceptedNotification = (buttonChosen) => {
  return sendNotification(
    'Initial Sorry Accepted! ❤️',
    `She clicked "${buttonChosen}" on the main apology screen! Yay! 🎉`
  );
};

/**
 * Trigger 3: When she navigates through the 10 reasons
 */
export const sendReasonsViewedNotification = (reasonIndex, reasonTitle) => {
  return sendNotification(
    `Reason ${reasonIndex}/10 Viewed 📜`,
    `She is reading reason #${reasonIndex}: "${reasonTitle}" 🍅✨`
  );
};

/**
 * Trigger 4: When she accepts the final "pls ek chance de"
 */
export const sendFinalChanceAcceptedNotification = (finalButtonChosen) => {
  return sendNotification(
    '🎉 FINAL CHANCE GIVEN! ❤️🍅',
    `SHE SAID YES! She selected "${finalButtonChosen}" on the final screen! 🎉❤️ Sending extra love!`
  );
};
