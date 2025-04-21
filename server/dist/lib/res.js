export const resApp = (res, statusCode, data) => res.status(statusCode).json(Object.assign(Object.assign({}, data), { ok: true }));
export const res200 = (res, data) => resApp(res, 200, data);
export const res201 = (res, data) => resApp(res, 201, data);
export const res204 = (res) => res.status(204).end();
