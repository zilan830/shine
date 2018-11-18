const getters = {
  style: state => state.route.style,
  isLoading: state => state.apis.isLoading,
  errorMessage: state => state.apis.errorMessage,
  news: state => state.apis.news,
  hasOperate: state => state.apis.hasOperate,
  leavePendingData: state => state.apis.leavePendingData,
  leaveFinishedData: state => state.apis.leaveFinishedData,
  leaveEndData: state => state.apis.leaveEndData,
  leaveCancelData: state => state.apis.leaveCancelData,
  leaveStoppedData: state => state.apis.leaveStoppedData,
  leveFormData: state => state.apis.leveFormData,
  nextApprove: state => state.apis.nextApprove,
  saveData: state => state.apis.saveData,
  nextStepInfo: state => state.apis.nextStepInfo,
  nextSave: state => state.apis.nextSave,
};

export default getters;
