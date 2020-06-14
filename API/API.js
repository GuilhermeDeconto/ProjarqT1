
//  Created by Guilherme Dall'Agnol Deconto on 09/05/20.
//  @Author guilherme.deconto@acad.pucrs.br
//  Copyright © 2020 Deconto. All rights reserved.

const hapi = require("hapi"); //Biblioteca para auxiliar no gerenciamento do mongoose
const joi = require("joi"); // Bilibioteca para validar e retornar erros de validação de forma automatizada
const mongoose = require("mongoose"); //Biblioteca do Nodejs que proporciona uma solução baseada em esquemas para modelar os dados da sua aplicação.
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

/* Model */
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
  evaluation: Number,
  evaluators: [String]
});

/* Routes */
//Realizar login
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
      var users = await UserModel.find().exec();
      var id = 0;
      var token = generate_token(30);
      for (user of users) {
        if (user.email === request.payload.email) {
          id = user.id;
        }
      }
      let result = await UserModel.findById(id).exec();
      if (result != null) {
        if (result.password === request.payload.password) {
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

//Buscar todos os usuários que são participantes
server.route({
  method: "GET",
  path: "/users",
  handler: async (request, resp) => {
    try {
      var users = await UserModel.find( { "isNormalUser": true } ).exec();
      var count = await UserModel.countDocuments().exec();
      var data = {
        status: "success",
        message: "Users retrieved successfully",
        count: count - 5,
        users: users,
      };
      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//Buscar todos os times
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
        teams: teams,
      };
      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//Buscar o usuário pelo ID único (gerado pelo banco) dele
server.route({
  method: "GET",
  path: "/user/{id}",
  handler: async (request, resp) => {
    try {
      var result = await UserModel.findById(request.params.id).exec();
      if (result) {
        var data = {
          status: "success",
          message: "User retrieved successfully",
          user: result,
        };
      }

      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//Buscar o time pelo ID único (gerado pelo banco) dele
server.route({
  method: "GET",
  path: "/team/{id}",
  handler: async (request, resp) => {
    try {
      var result = await TeamModel.findById(request.params.id).exec();
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

//Pegar os integrantes de um time para os cards de vizualizações
server.route({
  method: "GET",
  path: "/members/{team}",
  handler: async (request, resp) => {
    try {
      var result = await UserModel.find({ team: request.params.team });
      var data = {
        status: "success",
        message: "Members retrieved successfully",
        members: result,
      };
      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//Buscar resultado da hackatona
server.route({
  method: "GET",
  path: "/result",
  handler: async (request, resp) => {
    try {
      var result = await TeamModel.find().sort({evaluation: -1});
      var data = {
        status: "success",
        message: "Result retrieved successfully",
        teams: result,
      };
      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//Buscar um timepelo número dele
server.route({
  method: "POST",
  path: "/team",
  options: {
    validate: {
      payload: {
        number: joi.number().required(),
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
      var result = await TeamModel.findOne(request.params.number).exec();
      let count = await TeamModel.countDocuments().exec();
      var data = {
        status: "success",
        message: "Team successfully rescued",
        count: count,
        team: result,
      };
      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//Registar um novo usuário
server.route({
  method: "POST",
  path: "/registeruser",
  options: {
    validate: {
      payload: {
        email: joi.string().required(),
        name: joi.string().required(),
        password: joi.string().optional().default(123456),
        team: joi.number().required(),
        isAdmin: joi.boolean().optional().default(false),
        semester: joi.string().required(),
        curse: joi.string().required(),
        isNormalUser: joi.boolean().optional().default(true),
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
      var user = new UserModel(request.payload);
      let result = await user.save();
      let users = await UserModel.find().exec();
      let count = await UserModel.countDocuments().exec();
      var data = {
        message: "User created!",
        users: users,
        count: count
      };

      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});


//Registar um novo time
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
        software: joi.string().optional(),
        process: joi.string().optional(),
        pitch: joi.string().optional(),
        inovation: joi.string().optional(),
        formation: joi.string().optional(),
        evaluation: joi.number().optional(),
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
      var team = new TeamModel(request.payload);
      var result = await team.save();
      var teams = await TeamModel.find().exec();
      var count = await TeamModel.countDocuments().exec();
      var data = {
        message: "Team created!",
        teams: teams,
        count: count
      };

      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//Salvar avaliação dada por um avaliador
server.route({
  method: "POST",
  path: "/savereport",
  options: {
    validate: {
      payload: {
        number: joi.number().required(),
        software: joi.string().required(),
        process: joi.string().required(),
        pitch: joi.string().required(),
        inovation: joi.string().required(),
        formation: joi.string().required(),
        evaluation: joi.number().optional(),
        nameEvaluator: joi.string().optional()
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
      var filter = { number: request.payload.number };
      var doc = await TeamModel.findOne(filter).exec()
      var newArray = doc.evaluators
      if(doc.evaluators.indexOf(request.payload.nameEvaluator) === -1) {
        doc.evaluators.push(request.payload.nameEvaluator)
        newArray = doc.evaluators
      }

      var update = {
        software: request.payload.software,
        process: request.payload.process,
        pitch: request.payload.pitch,
        inovation: request.payload.inovation,
        formation: request.payload.formation,
        evaluation: request.payload.evaluation,
        evaluators: newArray
      };
      team = await TeamModel.findOneAndUpdate(filter, update, {
        new: true,
      })
      var teams = await TeamModel.find().exec();
      var data = {
        message: "Team evaluate!",
        teams: teams,
        doc: doc,
        array: newArray
      };
      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//Atualizar avaliação dada por um avaliador
server.route({
  method: "POST",
  path: "/updatereport",
  options: {
    validate: {
      payload: {
        number: joi.number().required(),
        software: joi.string().required(),
        process: joi.string().required(),
        pitch: joi.string().required(),
        inovation: joi.string().required(),
        formation: joi.string().required(),
        evaluation: joi.number().optional(),
        nameEvaluator: joi.string().optional()
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
      var filter = { number: request.payload.number };
      var doc = await TeamModel.findOne(filter).exec()
      var newArray = doc.evaluators
      var index = doc.evaluators.indexOf(request.payload.nameEvaluator)
      if(index > -1) {
        doc.evaluators.splice(index, 1)
        newArray = doc.evaluators
      }

      var update = {
        software: request.payload.software,
        process: request.payload.process,
        pitch: request.payload.pitch,
        inovation: request.payload.inovation,
        formation: request.payload.formation,
        evaluation: request.payload.evaluation,
        evaluators: newArray
      };
      team = await TeamModel.findOneAndUpdate(filter, update, {
        new: true,
      })
      var teams = await TeamModel.find().exec();
      var data = {
        message: "Team evaluate!",
        teams: teams,
        doc: doc,
        array: doc.evaluators
      };
      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//Inserir muitos usuários de uma vez
server.route({
  method: "POST",
  path: "/users",
  handler: async (request, resp) => {
    try {
      var users = [];
      for (let model of request.payload.users) {
        const user = new UserModel(model);
        await user.save();
        users.push(user);
      }
      var data = {
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

//Salvar muitos times de uma vez só
server.route({
  method: "POST",
  path: "/teams",
  handler: async (request, resp) => {
    try {
      var teams = [];
      for (let model of request.payload.teams) {
        const team = new TeamModel(model);
        await team.save();
        teams.push(team);
      }
      var data = {
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

//Alterar um usuário já contido no banco de dados
server.route({
  method: "PUT",
  options: {
    validate: {
      payload: {
        email: joi.string().optional(),
        name: joi.string().optional(),
        password: joi.string().optional(),
        team: joi.number().optional(),
        isAdmin: joi.boolean().optional(),
        semester: joi.string().optional(),
        curse: joi.string().optional(),
        isNormalUser: joi.boolean().optional(),
        _id: joi.string().optional(),
        __v: joi.number().optional(),
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
      var user = await UserModel.findByIdAndUpdate(
        request.params.id,
        request.payload,
        { new: true }
      );
      var users = await UserModel.find().exec();
      let count = await UserModel.countDocuments().exec();
      if (user) {
        var data = {
          status: "success",
          message: "User modified successfully",
          count: count,
          users: users,
        };
      }

      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//Alterar um time já contido no banco de dados
server.route({
  method: "PUT",
  options: {
    validate: {
      payload: {
        number: joi.number().optional(),
        name: joi.string().optional(),
        platform: joi.string().optional(),
        description: joi.string().optional(),
        software: joi.string().optional(),
        process: joi.string().optional(),
        pitch: joi.string().optional(),
        inovation: joi.string().optional(),
        formation: joi.string().optional(),
        _id: joi.string().optional(),
        __v: joi.number().optional(),
      },
      failAction: (request, resp, error) => {
        return error.isJoi
          ? resp.response(error.details[0]).takeover()
          : resp.response(error).takeover();
      },
    },
  },
  path: "/team/{id}",
  handler: async (request, resp) => {
    try {
      var team = await TeamModel.findByIdAndUpdate(
        request.params.id,
        request.payload,
        { new: true }
      );
      var teams = await TeamModel.find().exec();
      let count = await TeamModel.countDocuments().exec();
      if (team) {
        var data = {
          status: "success",
          message: "Team modified successfully",
          count: count,
          teams: teams,
        };
      }

      return resp.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//Deletar um usuário pelo ID dele
server.route({
  method: "DELETE",
  path: "/user/{id}",
  handler: async (request, res) => {
    try {
      var result = await UserModel.findByIdAndDelete(request.params.id);
      var users = await UserModel.find().exec();
      var data;
      if (result) {
        data = {
          status: "success",
          message: "User deleted successfully",
          users: users,
        };
      }
      return res.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//Deletar um time pelo ID
server.route({
  method: "DELETE",
  path: "/team/{id}",
  handler: async (request, res) => {
    try {
      var result = await TeamModel.findByIdAndDelete(request.params.id);
      var teams = await TeamModel.find().exec();
      var data;
      if (result) {
        data = {
          status: "success",
          message: "Team deleted successfully",
          teams: teams,
        };
      }
      return res.response(data);
    } catch (error) {
      return resp.response(error).code(500);
    }
  },
});

//Deletar todos os times
server.route({
  method: "DELETE",
  path: "/teams",
  handler: async (request, res) => {
    try {
      var result = await TeamModel.deleteMany();
      var data = {
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

//Deletar todos os usuários
server.route({
  method: "DELETE",
  path: "/users",
  handler: async (request, res) => {
    try {
      var result = await UserModel.deleteMany();
      var data = {
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

//Gerar hash token aleatório
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
