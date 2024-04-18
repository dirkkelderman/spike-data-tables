import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query GetFakeData {
    fakeData {
      id
      title
      coursePeriods
      academicYearStart
      academicYearEnd
      exams {
        id
        examDateTime
        isResit
      }
      courseOfferingStart
      courseOfferingEnd
      language
      owners {
        accountName
        displayName
        email
        firstName
        lastName
        principalName
        roles
      }
      courseCoordinator {
        accountName
        displayName
        email
        firstName
        lastName
        principalName
        roles
      }
      extraCourseCoordinators {
        accountName
        displayName
        email
        firstName
        lastName
        principalName
        roles
      }
      taskListId
    }
  }
`;
