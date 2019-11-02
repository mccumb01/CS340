
const api = require('../api');
const models = require('../src/models')

describe("The test suite for the UserController in api.js", function() {

  let User = models.User;
  let ctrl = api.UserController; 
  let user
  beforeEach(()=>{
    user = new User();
    // console.log("new user!", user); 
    user.user_id = -1;
    user.username = "Mike";
    user.user_email = "fake@faker.com"; 
    // console.log("Initialized user!", user);
  });

  it("should create a User object passed information for one", function() {
    let a = ctrl.createUser({user_id: -1, username: "Mike", user_email: "fake@faker.com"});
    expect(a).not.toBe(null);
  });
  it("should assign the username to the User", function() {
    let a = ctrl.createUser({user_id: -1, username: "Mike", user_email: "fake@faker.com"});
    expect(a.username).toBe("Mike");
  });
  it("should assign the user_email to the User", function() {
    let a = ctrl.createUser({user_id: -1, username: "Mike", user_email: "fake@faker.com"});
    expect(a.user_email).toBe("fake@faker.com");
  });
  it("should assign an int user_id to the User", function() {
    let a = ctrl.createUser({user_id: -1, username: "Mike", user_email: "fake@faker.com"});
    expect(a.user_id).toBe(-1);
  });
  it("should return the correct user for the given id", function() {
    let a = ctrl.getUser(-1);
    expect(a.user_id).toBe(-1);
  });
});

