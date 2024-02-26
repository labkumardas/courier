export default class notificationText {
  requestSendTitle(name) {
    const senderUsername = name || 'User';
    return `Test Text ${senderUsername}.`;
  }
  requestSendBody(name) {
    return `Hey ${name}, Test Text.`;
  }

}
