import TaskCard from "../../components/TaskCard/TaskCard";

const TaskList = ({ tasks }) => {
    return (
        <div>
            {tasks &&
                tasks.map((t) => {
                    return <TaskCard key={t.id} task={t} />;
                })}
        </div>
    );
};

export default TaskList;
