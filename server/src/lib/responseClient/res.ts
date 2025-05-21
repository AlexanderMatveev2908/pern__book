import { Response } from "express";

export const resApp = (res: Response, statusCode: number, data?: any) =>
  res.status(statusCode).json({ ...data, ok: true });

export const res200 = (res: Response, data?: any) => resApp(res, 200, data);

export const res201 = (res: Response, data?: any) => resApp(res, 201, data);

export const res204 = (res: Response) => res.status(204).end();
