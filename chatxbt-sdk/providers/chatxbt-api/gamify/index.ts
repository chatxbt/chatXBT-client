import { chatxbtUtils } from "@chatxbt-sdk/index";

export const allTask = async () => {
    try {
        const { data, headers } = await chatxbtUtils
            .privateApiConnect()
            .get(`gamify/all-task`);

        return {
            status: true,
            data: data.data,
            message: data.message
        };
    } catch (error: any) {
        return {
            status: false,
            message: error.message,
            error: true,
        };
    }
};

export const claimTaskReward = async (taskData: any) => {
    try {
        const { data, headers } = await chatxbtUtils
            .privateApiConnect()
            .post(`gamify/claim-task-reward`, taskData);

        return {
            status: true,
            data: data.data,
            message: data.message
        };
    } catch (error: any) {
        return {
            status: false,
            message: error.message,
            error: true,
        };
    }
};

export const addTask = async (taskData: any) => {
    try {
        const { data, headers } = await chatxbtUtils
            .privateApiConnect()
            .post(`gamify/add-task`, taskData);

        return {
            status: true,
            data: data.data,
            message: data.message
        };
    } catch (error: any) {
        return {
            status: false,
            message: error.message,
            error: true,
        };
    }
};

export const deleteTask = async () => {
    try {
        const { data, headers } = await chatxbtUtils
            .privateApiConnect()
            .get(`gamify/delete-task`);

        return {
            status: true,
            data: data.data,
            message: data.message
        };
    } catch (error: any) {
        return {
            status: false,
            message: error.message,
            error: true,
        };
    }
};

