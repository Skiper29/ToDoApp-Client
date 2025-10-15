import * as React from "react";
import {useEffect, useState} from "react";
import {Box, Container, Fab, Tab, Tabs,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useAppDispatch, useAppSelector} from "@hooks/hooks.ts";
import {fetchTodos} from "@features/todos/todosSlice.ts";
import {TodoTaskStatus} from "@models/todo.ts";
import PageHeader from "@components/common/PageHeader.tsx";
import TaskList from "@components/todos/TaskList/TaskList.tsx";
import TaskFormDialog from "@components/todos/TaskFormDialog/TaskFormDialog.tsx";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`todo-tabpanel-${index}`}
            aria-labelledby={`todo-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{py: 3}}>{children}</Box>}
        </div>
    );
}

const TodoBoard = () => {
    const dispatch = useAppDispatch();
    const {tasks, loading} = useAppSelector((state) => state.todos);
    const [activeTab, setActiveTab] = useState(0);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    }

    const allTasks = tasks;
    const activeTasks = tasks.filter(
        (task) => task.status === TodoTaskStatus.Todo || task.status === TodoTaskStatus.InProgress
    );
    const completedTasks = tasks.filter((task) => task.status === TodoTaskStatus.Done);

    return (
        <Box sx={{pb: 8}}>
            <PageHeader title="My Tasks"/>

            <Container maxWidth="lg">
                <Box sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        aria-label="todo tabs"
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        <Tab label={`All Tasks (${allTasks.length})`}/>
                        <Tab label={`Active Tasks (${activeTasks.length})`}/>
                        <Tab label={`Completed Tasks (${completedTasks.length})`}/>
                    </Tabs>
                </Box>

                <TabPanel value={activeTab} index={0}>
                    <TaskList tasks={tasks} loading={loading}/>
                </TabPanel>

                <TabPanel value={activeTab} index={1}>
                    <TaskList tasks={activeTasks} loading={loading}/>
                </TabPanel>

                <TabPanel value={activeTab} index={2}>
                    <TaskList tasks={completedTasks} loading={loading}/>
                </TabPanel>
            </Container>

            <Fab
                color="primary"
                aria-label="add task"
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                }}
                onClick={() => setCreateDialogOpen(true)}
            >
                <AddIcon/>
            </Fab>

            <TaskFormDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                mode="create"
            />

        </Box>
    );
};

export default TodoBoard;