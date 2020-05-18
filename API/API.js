//
//  Created by Guilherme Dall'Agnol Deconto on 09/05/20.
//  @Author guilherme.deconto@acad.pucrs.br
//  Copyright © 2020 Deconto. All rights reserved.
//

const hapi = require("hapi");
const joi = require("joi");
const mongoose = require("mongoose");
const cors = require("cors");

const server = new hapi.Server({
  host: "localhost",
  port: 9876,
  routes: { cors: { origin: ["*"] } },
});

/* MongoDb connection */
mongoose.connect("mongodb://localhost/dbprojarq", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/* Model */
const UserModel = mongoose.model("user", {
  email: String,
  name: String,
  password: String,
  team: Number,
  isAdmin: Boolean,
  semester: String,
  curse: String,
  isNormalUser: Boolean,
});

const TeamModel = mongoose.model("team", {
  number: Number,
  name: String,
  platform: String,
  description: String,
  software: String,
  process: String,
  pitch: String,
  inovation: String,
  formation: String,
});

/* Routes */
server.route({
  method: "POST",
  path: "/login",
  options: {
    validate: {
      payload: {
        email: joi.string().required(),
        password: joi.string().required(),
      },
      failAction: (request, resp, error) => {
        return error.isJoi
          ? resp.response(error.details[0]).takeover()
          : resp.response(error).takeover();
      },
    },
  },

  handler: async (request, resp) => {
    try {
      let users = await UserModel.find().exec();
      var id = 0;
      let token = generate_token(30);
      for (user of users) {
        if (user.email == request.payload.email) {
          id = user.id;
        }
      }
      let result = await UserModel.findById(id).exec();
      if (result != null) {
        if (result.password == request.payload.password) {
          data = {
            success: true,
            message: "Login success!",
            user: result,
            authorization: token,
          };
          return resp.response(data);
        } else {
          data = {
            success: false,
            message: "Invalid Password!",
          };
          return resp.response(data);
        }
      } else {
        data = {
          success: false,
          message: "Invalid User!",
        };
        return resp.response(data).code(400);
      }
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

server.route({
  method: "GET",
  path: "/users",
  handler: async (request, resp) => {
    try {
      let users = await UserModel.find().exec();
      let count = await UserModel.countDocuments().exec();
      var data = {
        status: "success",
        message: "Users retrieved successfully",
        count: count,
        users: users,
      };
      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

server.route({
  method: "GET",
  path: "/teams",
  handler: async (request, resp) => {
    try {
      let teams = await TeamModel.find().exec();
      let count = await TeamModel.countDocuments().exec();
      var data = {
        status: "success",
        message: "Teams retrieved successfully",
        count: count,
        teams: teams
      };
      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

server.route({
  method: "GET",
  path: "/user/{id}",
  handler: async (request, resp) => {
    try {
      let result = await UserModel.findById(request.params.id).exec();
      var data = {
        status: "success",
        message: "User retrieved successfully",
        user: result,
      };
      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

server.route({
  method: "GET",
  path: "/team/{id}",
  handler: async (request, resp) => {
    try {
      let result = await TeamModel.findById(request.params.id).exec();
      var data = {
        status: "success",
        message: "Team retrieved successfully",
        team: result,
      };
      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

server.route({
  method: "POST",
  path: "/registeruser",
  options: {
    validate: {
      payload: {
        email: joi.string().required(),
        name: joi.string().required(),
        password: joi.string().required(),
        team: joi.number().required(),
        isAdmin: joi.string().required(),
        semester: joi.number().required(),
        curse: joi.string().required(),
        isNormalUser: joi.string().required(),
      },
      failAction: (request, resp, error) => {
        return error.isJoi
          ? resp.response(error.details[0]).takeover()
          : resp.response(error).takeover();
      },
    },
  },
  handler: async (request, resp) => {
    try {
      let user = new UserModel(request.payload);
      let data = {
        message: "User created!",
        result: user,
      };
      let result = await user.save();

      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

server.route({
  method: "POST",
  path: "/registerteam",
  options: {
    validate: {
      payload: {
        number: joi.number().required(),
        name: joi.string().required(),
        platform: joi.string().required(),
        description: joi.string().required(),
        software: joi.string().required(),
        process: joi.string().required(),
        pitch: joi.string().required(),
        inovation: joi.string().required(),
        formation: joi.string().required(),
      },
      failAction: (request, resp, error) => {
        return error.isJoi
          ? resp.response(error.details[0]).takeover()
          : resp.response(error).takeover();
      },
    },
  },
  handler: async (request, resp) => {
    try {
      let team = new TeamModel(request.payload);
      let data = {
        message: "Team created!",
        result: team,
      };
      let result = await team.save();

      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

server.route({
  method: "POST",
  path: "/users",
  handler: async (request, resp) => {
    try {
      let users = [];
      for (let model of request.payload.teams) {
        const user = new UserModel(model);
        await user.save();
        users.push(user);
      }
      let data = {
        message: "New users created!",
        users: users,
      };
      return resp.response(data);
    } catch (error) {
      console.log(error);
      return resp.response(error).code(500);
    }
  },
});

server.route({
  method: "POST",
  path: "/teams",
  handler: async (request, resp) => {
    try {
      let teams = [];
      for (let model of request.payload.teams) {
        const team = new TeamModel(model);
        await team.save();
        teams.push(team);
      }
      let data = {
        message: "New teams created!",
        teams: teams,
      };
      return resp.response(data);
    } catch (error) {
      console.log(error);
      return resp.response(error).code(500);
    }
  },
});

server.route({
  method: "PUT",
  options: {
    validate: {
      payload: {
        email: joi.string().optional(),
        name: joi.string().optional(),
        password: joi.string().optional(),
      },
      failAction: (request, resp, error) => {
        return error.isJoi
          ? resp.response(error.details[0]).takeover()
          : resp.response(error).takeover();
      },
    },
  },
  path: "/user/{id}",
  handler: async (request, resp) => {
    try {
      let result = await UserModel.findByIdAndUpdate(
        request.params.id,
        request.payload,
        { new: true }
      );
      let data = {
        status: "success",
        message: "User modified successfully",
        user: result,
      };
      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

server.route({
  method: "DELETE",
  path: "/user/{id}",
  handler: async (request, res) => {
    try {
      let result = await UserModel.findByIdAndDelete(request.params.id);
      let data = {
        status: "success",
        message: "User deleted successfully",
        user: result,
      };
      return res.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

server.route({
  method: "DELETE",
  path: "/team/{id}",
  handler: async (request, res) => {
    try {
      let result = await TeamModel.findByIdAndDelete(request.params.id);
      let data = {
        status: "success",
        message: "Team deleted successfully",
        team: result,
      };
      return res.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

server.route({
  method: "DELETE",
  path: "/teams",
  handler: async (request, res) => {
    try {
      let result = await TeamModel.deleteMany();
      let data = {
        status: "success",
        message: "Teams deleted successfully",
        team: result,
      };
      return res.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

server.route({
  method: "DELETE",
  path: "/users",
  handler: async (request, res) => {
    try {
      let result = await UserModel.deleteMany();
      let data = {
        status: "success",
        message: "Users deleted successfully",
        users: result,
      };
      return res.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

/* Server start */

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log("Server started");
});

function generate_token(length) {
  //edit the token allowed characters
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
    ""
  );
  var b = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
}
