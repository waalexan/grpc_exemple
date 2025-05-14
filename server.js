const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("hello.proto");

const grpcObject = grpc.loadPackageDefinition(packageDef);
const helloPackage = grpcObject.hello;

function sayHello(call, callback) {
    const response = call.request.name + "lkkkkk"
    callback(null, { message: "Olá, " + response });
}

const server = new grpc.Server();
server.addService(helloPackage.HelloService.service, {
  SayHello: sayHello,
});
server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log("Servidor gRPC rodando na porta 50051");
});
