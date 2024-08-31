const swaggerActivitySchema = {
  CALL_HISTORY: {
    schema: {
      description: "Call history of a particuler number",
      tags: ["User Activity"],
      querystring: {
        type: "object",
        properties: {
          senderNumber: {
            type: "string",
            description: "Number to fetch the history of",
          },
        },
      },

      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              To: {
                type: "string",
                description: "The number of the receiver",
              },
              CallStatus: {
                type: "string",
                description: "The status of the call",
              },
              Duration: {
                type: "number",
                description: "How long the call went on",
              },
              RecordingUrl: {
                type: "string",
                description: "The url of voicemail, if recorded",
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerActivitySchema;
