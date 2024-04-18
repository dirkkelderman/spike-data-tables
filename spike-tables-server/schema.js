const { makeExecutableSchema } = require("graphql-tools");

// Define your GraphQL schema
const typeDefs = `
  type Query {
    fakeData: [FakeData]
  }

  type FakeData {
    id: ID!
    title: String
    coursePeriods: [Int]
    academicYearStart: String
    academicYearEnd: String
    exams: [Exam]
    courseOfferingStart: String
    courseOfferingEnd: String
    language: String
    owners: [Owner]
    courseCoordinator: Coordinator
    extraCourseCoordinators: [Coordinator]
    taskListId: ID
  }

  type Exam {
    id: ID!
    examDateTime: String
    isResit: Boolean
  }

  type Owner {
    accountName: String
    displayName: String
    email: String
    firstName: String
    lastName: String
    principalName: String
    roles: [String]
  }

  type Coordinator {
    accountName: String
    displayName: String
    email: String
    firstName: String
    lastName: String
    principalName: String
    roles: [String]
  }
`;

function getRandomLanguage() {
  const languages = ["NL", "EN", "BOTH"];
  const randomIndex = Math.floor(Math.random() * languages.length);
  return languages[randomIndex];
}

function getRandomUser() {
  const users = [
    {
      accountName: `eugenie.teststudentictsm`,
      displayName: "Eugenie",
      email: `12504009@s-res.uva.nl`,
      firstName: "TeststudentICTSM",
      lastName: "Eugenie",
      principalName: `12504009@uva.nl`,
      roles: ["OPC", "VC"],
    },
    {
      accountName: `appie.teststudentictsm`,
      displayName: "Appie",
      email: `12504009@s-res.uva.nl`,
      firstName: "TeststudentICTSM",
      lastName: "Appi",
      principalName: `12504009@uva.nl`,
      roles: ["OPC", "VC"],
    },
  ];
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}

const dataAmount = 10000;

// Function to generate mock book data
const generateFakeData = async () => {
  const fakeData = [];
  for (let i = 0; i < dataAmount; i++) {
    fakeData.push({
      id: i + 1,
      title: `Matomo click ${i + 1}`,
      coursePeriods: [1],
      academicYearStart: new Date("2025-07-31T22:00:00.000Z"),
      academicYearEnd: new Date("2026-07-30T22:00:00.000Z"),
      exams: [
        {
          id: i + 1,
          examDateTime: new Date("2024-12-31T23:00:00.000Z"),
          isResit: false,
        },
      ],
      courseOfferingStart: new Date("2023-09-04T00:00:00.000Z"),
      courseOfferingEnd: new Date("2023-10-27T00:00:00.000Z"),
      language: getRandomLanguage(),
      owners: [getRandomUser()],
      courseCoordinator: getRandomUser(),
      extraCourseCoordinators: [
        {
          accountName: `appie.teststudentictsm${i}`,
          displayName: "Appie",
          email: `12504009@s-res.uva.nl${i}`,
          firstName: "TeststudentICTSM",
          lastName: "Appi",
          principalName: `12504009@uva.nl${i}`,
          roles: ["OPC", "VC"],
        },
        {
          accountName: `eugenie.teststudentictsm${i}`,
          displayName: "Eugenie",
          email: `12504009@s-res.uva.nl${i}`,
          firstName: "TeststudentICTSM",
          lastName: "Eugenie",
          principalName: `12504009@uva.nl${i}`,
          roles: ["OPC", "VC"],
        },
      ],
      taskListId: i + 1,
    });
  }
  return fakeData;
};

// Define mock resolvers
const resolvers = {
  Query: {
    fakeData: async () => await generateFakeData(),
  },
};

// Create executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
