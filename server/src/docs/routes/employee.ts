// import { createApiSchema } from "~/docs/utils/createApiSchema";
// import { createRoute } from "~/docs/utils/createRoute";

// import {
//   CreateEmployeeRequest,
//   CreateEmployeeResponse,
//   FindManyEmployeeResponse,
// } from "~/app/repositories/employee/types";
// import { endpoints } from "~/routes/endpoints";
// import { getCorrectEndpoint } from "../utils/getCorrectEndpoint";
// import { ApiSchemas, DocumentSchema } from "~/docs/types";
// import { Status } from "~/enums/status";
// import {
//   dispatchNotFoundError,
//   dispatchUnauthorizedByTokenError,
//   dispatchUnauthorizedError,
//   dispatchValidationError,
// } from "~/utils/dispatchError";
// import { Messages } from "~/messages";

// const employeesEndpoints = endpoints.app.employees;

// const createEmployeeRoute = createRoute<
//   Omit<CreateEmployeeRequest, "userId">,
//   CreateEmployeeResponse
// >;

// const findManyEmployeeRoute = createRoute<unknown, FindManyEmployeeResponse>;

// const tag = "Employee";

// const paths = {
//   [getCorrectEndpoint(employeesEndpoints.create)]: createEmployeeRoute({
//     routes: [
//       {
//         method: "post",
//         tags: [tag],
//         description:
//           "Using to create a new employee, only admin employees can create a new employee",
//         summary: "Create",
//         isPrivated: true,
//         requestBody: {
//           schema: "CreateEmployeeRequest",
//           example: {
//             document: "000.000.000-00",
//             email: "johndoe@email.com",
//             firstName: "John",
//             lastName: "Doe",
//           },
//         },
//         responses: [
//           {
//             contentSchemaPath: ApiSchemas.ERROR,
//             code: Status.FORBIDDEN,
//             content: {
//               ok: false,
//               data: dispatchUnauthorizedByTokenError(),
//             },
//             description: "When employee is not logged",
//           },
//           {
//             contentSchemaPath: ApiSchemas.ERROR,
//             code: Status.UNAUTHORIZED,
//             content: {
//               ok: false,
//               data: dispatchUnauthorizedError(),
//             },
//             description:
//               "When the logged employee is not admin or already exists employee with email or document",
//           },
//           {
//             contentSchemaPath: ApiSchemas.ERROR,
//             code: Status.BAD_REQUEST,
//             content: {
//               ok: false,
//               data: dispatchValidationError(Messages.FIELDS_VALIDATION_ERROR),
//             },
//             description: "Fields validation",
//           },
//           {
//             contentSchemaPath: ApiSchemas.ERROR,
//             code: Status.NOT_FOUND,
//             content: {
//               ok: false,
//               data: dispatchNotFoundError(Messages.DOES_NOT_FOUND_USER),
//             },
//             description: "When the logged employee doest not exists",
//           },
//           {
//             contentSchemaPath: "CreateEmployeeResponse",
//             code: Status.CREATED,
//             content: {
//               ok: true,
//               data: {
//                 id: "new-employee-uuid",
//               },
//             },
//             description: "Create employee with success",
//           },
//         ],
//       },
//     ],
//   }),
//   [getCorrectEndpoint(employeesEndpoints.findMany)]: findManyEmployeeRoute({
//     routes: [
//       {
//         method: "get",
//         description: "Find many employees data",
//         summary: "Get all",
//         tags: [tag],
//         isPrivated: true,
//         parameters: [
//           {
//             in: "query",
//             name: "page",
//             description: "Current page",
//             required: false,
//             schema: { type: "string" },
//           },
//           {
//             in: "query",
//             name: "perPage",
//             description: "Number of employees per page",
//             required: false,
//             schema: { type: "string" },
//           },
//           {
//             in: "query",
//             name: "filterBy",
//             description: "Filter employee by email, first name or last name",
//             required: false,
//             schema: { type: "string" },
//           },
//         ],
//         responses: [
//           {
//             contentSchemaPath: ApiSchemas.ERROR,
//             code: Status.FORBIDDEN,
//             content: {
//               ok: false,
//               data: dispatchUnauthorizedByTokenError(),
//             },
//             description: "When employee is not logged",
//           },
//           {
//             contentSchemaPath: ApiSchemas.ERROR,
//             code: Status.UNAUTHORIZED,
//             content: {
//               ok: false,
//               data: dispatchUnauthorizedError(Messages.UNAUTHORIZED),
//             },
//             description:
//               "When the logged employee is not admin or does not exists logged employee",
//           },
//           {
//             contentSchemaPath: ApiSchemas.ERROR,
//             code: Status.NOT_FOUND,
//             content: {
//               ok: false,
//               data: dispatchNotFoundError(Messages.DOES_NOT_FOUND_USER),
//             },
//             description: "When the logged employee doest not exists",
//           },
//           {
//             contentSchemaPath: "FindManyEmployees",
//             code: Status.OK,
//             content: {
//               ok: true,
//               data: {
//                 currentPage: 1,
//                 employees: [
//                   {
//                     admin: false,
//                     email: "johndoe@email.com",
//                     firstName: "John",
//                     lastName: "Doe",
//                     id: "any-uuid",
//                   },
//                 ],
//                 perPage: 10,
//                 total: 1,
//               },
//             },
//             description: "Find employees with success",
//           },
//         ],
//       },
//     ],
//   }),
// };

// const schemas: DocumentSchema = {
//   CreateEmployeeRequest: {
//     type: "object",
//     properties: {
//       document: { type: "string" },
//       email: { type: "string" },
//       firstName: { type: "string" },
//       lastName: { type: "string" },
//     },
//   },
//   CreateEmployeeResponse: createApiSchema({
//     type: "object",
//     properties: {
//       id: { type: "string" },
//     },
//   }),
//   FindManyEmployees: createApiSchema({
//     type: "object",
//     properties: {
//       currentPage: { type: "number" },
//       employees: {
//         type: "array",
//         items: {
//           type: "object",
//           properties: {
//             admin: { type: "boolean" },
//             email: { type: "string" },
//             firstName: { type: "string" },
//             lastName: { type: "string" },
//             id: { type: "string" },
//           },
//         },
//       },
//       perPage: { type: "number" },
//       total: { type: "number" },
//     },
//   }),
// };

// export default { paths, schemas };
