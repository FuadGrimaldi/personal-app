const createTokenUser = (user) => {
  return {
    username: user.username,
    id: user.id,
    email: user.email,
    role: user.role,
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
