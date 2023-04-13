export const addConClass = (param: any) => {
    return `container ${param}`;
};

export const addFluidClass = (param: any) => {
    return `container-fluid ${param}`;
};

export const addClass = (bootstrapClass: any, param: any) => {
    return `${bootstrapClass} ${param}`;
}