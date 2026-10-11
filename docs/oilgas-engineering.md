# Oil Gas Management System CV evidence

Reviewed: 2026-10-12 (Asia/Bangkok).

Source: https://github.com/itzBaowy/oilgas_all, commit `08a9e56a5d611ffd787748b6c74f9a149f46cad3`.

The repository was cloned into a temporary directory and inspected read-only. No application code was run or changed. Its only commit is an upload by the owner's account; this does not establish individual authorship of every module. The owner supplied their internship dates and participation in API development, UI integration and chatbot integration. The CV therefore says “Contributed to” the incident APIs and quantifies implemented functionality, rather than asserting sole ownership or measured performance gains.

| CV statement | Evidence | Meaning of the number / limit |
| --- | --- | --- |
| Express/Prisma incident APIs with MongoDB filtering and pagination | `Backend/package.json`, `Backend/prisma/schema.prisma`, `Backend/src/services/incident.service.js`, `Backend/src/routers/incident.router.js` | Schema provider is MongoDB, not PostgreSQL. Incident list uses filters, `skip`/`take`, and parallel list/count queries. No latency benchmark or throughput measurement was found. |
| 5 fault categories, 3 severity levels | `VALID_TYPES` and `VALID_SEVERITIES` in `Backend/src/services/incident.service.js` | Categories: pressure anomaly, temperature anomaly, leakage, equipment failure and sensor malfunction. Severity: WARNING, CRITICAL, FATAL. These quantify supported classification, not incident volume or a reduction in failures. |
| React interface connected to rig, equipment and production APIs using Axios/TanStack Query | `Frontend/package.json`, `Frontend/src/configs/axiosConfig.js`, service modules under `Frontend/src/services/Instrument`, `Equipment`, `Supervisor`, and their query/mutation hooks | Repository evidence confirms the integration mechanisms; the owner's supplied contribution establishes their participation. No screen count is attributed to the owner. |
| Gemini/LangChain chatbot with 12 operational tools | `Backend/src/services/chatbot.service.js`, `chatbot.tools.js`, `chatbot-tools/*.tools.js`, `Frontend/src/components/common/AIChatDialog.jsx`, `Frontend/src/services/AI/ChatbotService.js` | The factory combines 5 core tools, 3 user tools and 1 each for roles, incidents, inventory and oil transactions. All 12 `tool()` definitions have distinct names. The count describes the integrated chatbot's surface, not 12 tools individually authored by the owner or 12 calls per request. |

Tool names: `get_system_overview`, `get_equipment_summary`, `get_instrument_summary`, `get_warehouse_oil_summary`, `get_my_notifications`, `get_user_statistics`, `get_users_by_status`, `create_user`, `create_or_update_role_with_permissions`, `get_incident_summary`, `get_inventory_alerts`, `get_oil_transaction_summary`.

The tool count was obtained by parsing JavaScript with the TypeScript AST and reading the literal `name` property of each `tool()` call; repository functions were not executed. Router counts were inspected but excluded from the CV because the upload does not establish how many endpoints the owner developed.

No production user count, number of deployed rigs, response-time improvement, fault-resolution improvement or load-test capacity is claimed. Sample data and hardcoded limits are not treated as production results.
