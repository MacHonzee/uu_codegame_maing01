import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// the base URI of calls for development / staging environments can be configured in *-hi/env/development.json
// (or <stagingEnv>.json), e.g.:
//   "uu5Environment": {
//     "callsBaseUri": "http://localhost:8080/vnd-app/awid"
//   }
const CALLS_BASE_URI = (
  (process.env.NODE_ENV !== "production" ? Environment.get("callsBaseUri") : null) || Environment.appBaseUri
).replace(/\/*$/, "/");

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },

  getAssignments() {
    const commandUri = Calls.getCommandUri("getAssignments");
    return Calls.call("get", commandUri, {});
  },

  getFullAssignment(dtoIn) {
    const commandUri = Calls.getCommandUri("getFullAssignment");
    return Calls.call("get", commandUri, dtoIn);
  },

  addUser(dtoIn) {
    const commandUri = Calls.getCommandUri("addUser");
    return Calls.call("post", commandUri, dtoIn);
  },

  createSolvingSession(dtoIn) {
    const commandUri = Calls.getCommandUri("createSolvingSession");
    return Calls.call("post", commandUri, dtoIn);
  },

  updateSolvingSession(dtoIn) {
    const commandUri = Calls.getCommandUri("updateSolvingSession");
    return Calls.call("post", commandUri, dtoIn);
  },

  getSolvingSession(dtoIn) {
    const commandUri = Calls.getCommandUri("getSession");
    return Calls.call("get", commandUri, dtoIn);
  },

  getInput(dtoIn) {
    const commandUri = Calls.getCommandUri("getInput");
    return Calls.call("get", commandUri, dtoIn);
  },

  getUser(dtoIn) {
    const commandUri = Calls.getCommandUri("getUser");
    return Calls.call("get", commandUri, dtoIn);
  },

  validateAnswer(dtoIn) {
    const commandUri = Calls.getCommandUri("validateResult");
    return Calls.call("post", commandUri, dtoIn);
  },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri, {});
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri, {});
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  getCommandUri(useCase) {
    return CALLS_BASE_URI + useCase.replace(/^\/+/, "");
  },
};

export default Calls;
