import moment from 'moment';

function TaskDone({task}) {
    return ( 
        <div className="bg-rose-100 py-4 rounded-lg shadow-xl flex items-center justify-center gap-2 mb-3">
            <div className="task-info text-zinc-900 w-10/12">
                <h1 className="task-title text-lg font-medium capitalize">{task.title}</h1>
                <p className="task-description text-base">{task.description}</p>
                <div className="italic opacity-60 text-sm">
                    {
                        task?.updatedAt ? (
                            <p>Last updated {moment(task.updatedAt).fromNow()}</p>
                        ) : (
                            <p>Last updated just now</p>
                        )
                    }
                </div>
            </div>
        </div>
     );
}

export default TaskDone;