
/** 用户类型种子数据 */
export const typeSeeds = [
  {
	"id":1,
    "name": "default",
    "title": "默认",
    "description": "",
    "display_order": 1
  },
  {
	"id":"2",
    "name": "supplier",
    "title": "供应商",
    "description": "",
    "display_order": 2
  },
  {
	"id":"3",
    "name": "company",
    "title": "企业",
    "description": "",
    "display_order": 3
  }
]

/** 超级管理员种子 */
export const accountSeeds = [
  {
	"id":"4417f0ff-9c7d-4ea7-8144-6d2b8eae91cf",
	"manage": 1,
    "username": "admin",
    "password": "1q2w3e!",
    "mobile": "13713731052",
    "email": "admin@yorolook.com",
    "is_distribution": false,
    "distribution_remark": "超级管理员账号",
    "type_id": 1
  }
]

/** 超级管理员种子 */
export const accountRankSeeds = [
	{
	  "account_uuid": "4417f0ff-9c7d-4ea7-8144-6d2b8eae91cf",
	  "type_id": 1,
	  "type_rank_id": 1,
	  "expired_time": "2064-05-10 14:52:05"
	}
  ]

/** 用户类型等级种子数据 */
export const typeRankSeeds = [
	{
		"id": 1,
		"type_id": 1,
		"title": "普通用户",
		"height": 0,
		"growth_value": 0,
		"remark": null,
		"icon": null,
		"discount": 100,
		"display_order": 0,
		"created_at": "2024-05-10 14:52:05",
		"updated_at": "2024-05-10 14:52:05"
	},
	{
		"id": 2,
		"type_id": 1,
		"title": "VIP会员",
		"height": 1,
		"growth_value": 2,
		"remark": null,
		"icon": null,
		"discount": 85,
		"display_order": 1,
		"created_at": "2024-05-10 14:52:26",
		"updated_at": "2024-05-10 14:52:26"
	},
	{
		"id": 3,
		"type_id": 1,
		"title": "联席馆长",
		"height": 2,
		"growth_value": 50,
		"remark": null,
		"icon": null,
		"discount": 65,
		"display_order": 2,
		"created_at": "2024-05-10 14:52:56",
		"updated_at": "2024-05-10 14:52:56"
	},
	{
		"id": 4,
		"type_id": 1,
		"title": "总馆长",
		"height": 3,
		"growth_value": 500,
		"remark": null,
		"icon": null,
		"discount": 55,
		"display_order": 3,
		"created_at": "2024-05-10 14:53:12",
		"updated_at": "2024-05-10 14:53:12"
	},
	{
		"id": 5,
		"type_id": 2,
		"title": "普通企业",
		"height": 0,
		"growth_value": 0,
		"remark": null,
		"icon": null,
		"discount": 100,
		"display_order": 0,
		"created_at": "2024-05-10 15:25:03",
		"updated_at": "2024-05-10 15:25:03"
	},
	{
		"id": 6,
		"type_id": 2,
		"title": "年费企业",
		"height": 1,
		"growth_value": 0,
		"remark": null,
		"icon": null,
		"discount": 100,
		"display_order": 1,
		"created_at": "2024-05-10 15:25:22",
		"updated_at": "2024-05-10 15:25:22"
	},
	{
		"id": 7,
		"type_id": 2,
		"title": "超级企业",
		"height": 2,
		"growth_value": 0,
		"remark": null,
		"icon": null,
		"discount": 100,
		"display_order": 2,
		"created_at": "2024-05-10 15:26:22",
		"updated_at": "2024-05-10 15:26:22"
	},
	{
		"id": 8,
		"type_id": 3,
		"title": "B级",
		"height": 0,
		"growth_value": 0,
		"remark": null,
		"icon": null,
		"discount": 100,
		"display_order": 0,
		"created_at": "2024-05-10 15:27:05",
		"updated_at": "2024-05-10 15:27:05"
	},
	{
		"id": 9,
		"type_id": 3,
		"title": "A级",
		"height": 1,
		"growth_value": 0,
		"remark": null,
		"icon": null,
		"discount": 100,
		"display_order": 1,
		"created_at": "2024-05-10 15:27:14",
		"updated_at": "2024-05-10 15:27:14"
	},
	{
		"id": 10,
		"type_id": 3,
		"title": "S级",
		"height": 2,
		"growth_value": 0,
		"remark": null,
		"icon": null,
		"discount": 100,
		"display_order": 2,
		"created_at": "2024-05-10 15:27:22",
		"updated_at": "2024-05-10 15:27:22"
	},
]

export const dirSeeds = [
  {
    "id": "9f129123-e68b-43ec-b049-e7fb09c48322",
	"system_name": "system",
    "title": "系统库",
    "parent_uuid": "",
    "owner_uuid": "",
	"layer_tree": "",
	"channel_relation":"",
	"physical_path": `.virtual_disk/.system_def/`,
	"deep": 0,
	"covers": "",
	"sys_require": 1,
  }
]
