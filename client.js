const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("hello.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const helloPackage = grpcObject.hello;

const client = new helloPackage.HelloService("localhost:50051", grpc.credentials.createInsecure());

client.SayHello({ name: "Maria" }, (err, response) => {
  if (err) return console.error(err);
  console.log("Resposta do servidor:", response.message);
});
