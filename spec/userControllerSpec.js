
const api = require('../api');
const models = require('../src/models')

describe("The test suite for the UserController in api.js", function() {

  let User = models.User;
  let ctrl = api.UserController; 
  let id = null;
  beforeEach(()=>{
    user = new User({});
    // console.log("new user!", user); 
    user.user_id = -1;
    user.username = "Mike";
    user.user_email = "fake@faker.com"; 
    console.log("Initialized user!", user);
  });

  it("should create a User object passed information for one", function() {
    ctrl.createUser({user_id: -1, username: "Mike", user_email: "fake@faker.com"})
                .then(val=>{
                  console.log("CREATE USER SPEC: ", val.insertId);
                  id = val.insertId;
                  expect(val).not.toBe(null);
                });
  });
  it("should return the correct user for the given id", function() {
    
    let a = ctrl.getUserById(id)
    .then(val=>{
      expect(val.user_id).toBe(id);
      expect(val.username).toBe("Mike");
      expect(val.user_email).toBe("Mike");
    });
  });
});

