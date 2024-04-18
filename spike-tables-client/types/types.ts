export type Course = {
  id: number;
  title: string;
  coursePeriods: number[];
  academicYearStart: string;
  academicYearEnd: string;
  exams: {
    id: number;
    examDateTime: string;
    isResit: boolean;
  }[];
  courseOfferingStart: string;
  courseOfferingEnd: string;
  language: string;
  owners: {
    accountName: string;
    displayName: string;
    email: string;
    firstName: string;
    lastName: string;
    principalName: string;
    roles: string[];
  }[];
  courseCoordinator: {
    accountName: string;
    displayName: string;
    email: string;
    firstName: string;
    lastName: string;
    principalName: string;
    roles: string[];
  };
  extraCourseCoordinators: {
    accountName: string;
    displayName: string;
    email: string;
    firstName: string;
    lastName: string;
    principalName: string;
    roles: string[];
  }[];
  taskListId: number;
};
