/* eslint-disable no-await-in-loop */
import type { Context } from "moleculer";
import { Op } from "sequelize";
import { createParams, listParams } from "../models/dtos/order";
import createService from "./base";

const service = createService("orderItem");

service.actions = {
	...service.actions,
};

export default service;
