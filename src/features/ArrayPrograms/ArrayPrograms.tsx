import ProblemsLayout from "../../components/Layout/ProblemsLayout";
import { arrayProblems } from "./arrayProblemsData";

export default function ArrayPrograms() {
  return (
    <ProblemsLayout
      title="Array Programming Problems"
      problems={arrayProblems}
    />
  );
}
