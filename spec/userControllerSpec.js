
const api = require('../api');
const models = require('../src/models');
const db = require('../dataSources.js')

describe("The test suite for the UserController in api.js", function() {

  let User = models.User;
  let ctrl = api.UserController; 
  let id = null;
  beforeEach(async ()=>{
    //db.nukeDB();
    user = new User({});
    // console.log("new user!", user); 
    user.user_id = -1;
    user.username = "Mike";
    user.user_email = "fake@faker.com"; 
    console.log("Initialized user!", user);
  });

  it("should get all users", async () => {
    return ctrl.getAllUsers().then(res =>{
      console.log("res1?: ", res);
    expect(res).not.toBe(null);
    });
  });

  it("should get user with id=1", () =>{
    return ctrl.getUserById(1).then(val =>{
      console.log("User with id 1?", val);
      expect(val.user_id).toBe(1);
      expect(val.username).toBe('MikeC');
    });
  });

  // it("should create a User object passed information for one", function() {
  //   return ctrl.createUser({user_id: -1, username: "Mike", user_email: "fake@faker.com"})
  //               .then(val=>{
  //                 console.log("CREATE USER SPEC: ", val.insertId);
  //                 id = val.insertId;
  //                 expect(val).not.toBe(null);
  //                 done();
  //               });
  // });
  // it("should not create a User with a duplicate username or email", function() {
  //   ctrl.createUser({user_id: -1, username: "Mike", user_email: "fake@faker.com"});
  //   return ctrl.createUser({user_id: -1, username: "Mike", user_email: "fake@faker.com"})
  //               .then(val=>{
  //                 console.log("CREATE USER SPEC: this should fail");
  //               })
  //               .catch(err => expect(err).not.toBe(null));
  // });
  // it("should return the correct user for the given id", function() {
    
  //   return ctrl.getUserById(4)
  //   .then(val=>{
  //     expect(val.user_id).toBe(4);
  //     expect(val.username).toBe("Mike");
  //     expect(val.user_email).toBe("fake@faker.com");
  //   });
  // });
});

