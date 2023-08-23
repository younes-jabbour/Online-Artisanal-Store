import { createContext, useContext } from "react";

const CourseContext = createContext();

export default CourseContext;
export const useCourseContext = () => useContext(CourseContext);
