const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");


const packageDefinition = protoLoader.loadSync(`${__dirname}../../../proto/question.proto`, { keepCase: true });
const questionProto = grpc.loadPackageDefinition(packageDefinition).question;

const client = new questionProto.QuestionService(
    "localhost:50051",
    grpc.credentials.createInsecure(),
    {
        "grpc.max_receive_message_length": 20 * 1024 * 1024, // 20MB
        "grpc.max_send_message_length": 20 * 1024 * 1024, // 20MB
    }
);

const searchQuestionBasedONQuery = (req, res) => {
    const { query, page = 1 } = req.query; // Extract query and page from query parameters

    if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Query must be a non-empty string" });
    }

    client.SearchQuestions({ query, page: parseInt(page) }, (err, response) => {
        if (err) {
            console.error("❌ Error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        } 
        
        res.json({ 
            success: true,
            questions: response.questions,
            totalCount: response.totalCount,
            totalPages: response.totalPages
        });
    });
};


module.exports = {
    searchQuestionBasedONQuery
}