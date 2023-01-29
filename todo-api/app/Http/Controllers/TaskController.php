<?php

namespace App\Http\Controllers;


use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{

    public function index()
    {
        $tasks = Task::all();
        return response()->json([
            'status'    => 200,
            'tasks'     => $tasks
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'task_content'  => 'required|max:255',
            'task_status'   => 'required|max:255',
            'task_category' => 'required|max:255'
        ]);
        if($validator->fails())
        {
            return response()->json([
                'validation_errors' => $validator->messages()
            ]);
        }
        else
        {
            $task = new Task;
            $task->task_content  = $request->task_content;
            $task->task_status   = $request->task_status;
            $task->task_category = $request->task_category;
            $task->save();
            return response()->json([
                'status'    => 200,
                'message'   => 'Task Added Successfully'
            ]);
        }
    }

    public function edit($id)
    {
        $task = Task::find($id);
        if($task)
        {
            return response()->json([
                'status'    => 200,
                'task'     => $task
            ]);
        }
        else
        {
            return response()->json([
                'status'    => 404,
                'message'     => 'No Task ID Found'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'task_content'  => 'required|max:255',
            'task_status'   => 'required|max:255',
            'task_category' => 'required|max:255'
        ]);
        if($validator->fails())
        {
            return response()->json([
                'validation_errors' => $validator->messages()
            ]);
        }
        else
        {
            $task = Task::find($id);
            $task->task_content  = $request->task_content;
            $task->task_status   = $request->task_status;
            $task->task_category = $request->task_category;
            $task->save();
            return response()->json([
                'status'    => 200,
                'message'   => 'Task Updated Successfully'
            ]);
        }
    }

    public function destroy($id)
    {
        $task = Task::find($id);
        if($task)
        {
            $task->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Task Deleted Successfully'
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'No Task ID Found'
            ]);
        }
    }
}
