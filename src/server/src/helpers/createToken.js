const createTokenUser = (user) => {
  return {
    username: user.username,
    userId: user._id,
    email: user.email,
  };
};
const createTokenParticipant = (participant) => {
  return {
    lastName: participant.lastName,
    participantId: participant._id,
    firstName: participant.firstName,
    email: participant.email,
  };
};

module.exports = { createTokenUser, createTokenParticipant };
