require("dotenv").config();
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { MongoClient } = require("mongodb");

// Load .proto file
const PROTO_PATH = "./proto/question.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true });
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const questionService = grpcObject.question.QuestionService;

// MongoDB Connection
const client = new MongoClient(process.env.MONGO_URI);
let questionCollection;

async function connectDB() {
  try {
    await client.connect();
    questionCollection = client.db("test").collection("questions");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

// gRPC Search Function for Questions
const searchQuestions = async (call, callback) => {
  const query = call.request.query?.trim();
  const page = call.request.page ? parseInt(call.request.page) : 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  if (!query) return callback(null, { questions: [], totalPages: 0, totalCount: 0 });

  const regex = new RegExp(`\\b${query}`, "i");
  const containsRegex = new RegExp(query, "i");

  try {
    // Get total count of matching questions
    const totalCount = await questionCollection.countDocuments({ title: containsRegex });
    const totalPages = Math.ceil(totalCount / limit);

    const questions = await questionCollection.aggregate([
      { $match: { title: { $regex: regex } } },
      {
        $addFields: {
          startsWithQuery: {
            $cond: [
              { $regexMatch: { input: "$title", regex: `^${query}`, options: "i" } },
              1,  // Higher priority for titles that start with query
              2   // Lower priority for other matches
            ]
          }
        }
      },
      { $sort: { startsWithQuery: 1, title: 1 } },
      { $skip: skip },
      { $limit: limit }
    ])
      .toArray();

    // console.log(questions);
    
    const questionList = questions.map(q => ({
      id: q._id.toString(),
      title: q.title,
      type: q.type,
      anagramType: q.anagramType || null,
      solution: q.solution || null,
      siblingId: q.siblingId ? q.siblingId.toString() : null,
      blocks: q.blocks.map(block => ({
        text: block.text,
        showInOption: block.showInOption,
        isAnswer: block.isAnswer
      })),
      options: q.options.map(option => ({
        text: option.text,
        isCorrectAnswer: option.isCorrectAnswer
      }))
    }));
    
    // console.log(questionList);
    

    //   console.log("✅ Search Results:", totalCount, totalPages);

    callback(null, { questions:questionList, totalCount, totalPages });
  } catch (error) {
    console.error("❌ Search Error:", error);
    callback(error, null);
  }
};


// Start gRPC Server
async function startServer() {
  await connectDB();

  const server = new grpc.Server({
    "grpc.max_receive_message_length": 20 * 1024 * 1024, // 20MB
    "grpc.max_send_message_length": 20 * 1024 * 1024, // 20MB
  });

  server.addService(questionService.service, { SearchQuestions: searchQuestions });

  server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error("❌ gRPC Server Bind Error:", err);
      process.exit(1);
    }
    console.log(`🚀 gRPC Server running on port ${port}`);
  });
}

startServer();
