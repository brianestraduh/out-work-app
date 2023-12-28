import { Link } from "react-router-dom";
import CreateWorkouts from "./CreateWorkouts";
import EditWorkouts from "./EditWorkouts";
function CreateEditWorkouts() {
  return (
    <div>
      <div>
        <CreateWorkouts />
      </div>
      <div>
        <EditWorkouts />
      </div>
      <Link to="/">Back</Link>
    </div>
  );
}
export default CreateEditWorkouts;
