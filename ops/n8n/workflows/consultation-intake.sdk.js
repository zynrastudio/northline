import {
  workflow,
  node,
  trigger,
  sticky,
  ifElse,
  expr,
} from "@n8n/workflow-sdk";

const G2_SECRET = "northline-g2-dev-secret";
const COMPANY_TABLE = "3UnbPyAbh0w9JicF";
const CONTACT_TABLE = "Q6zQpWsxzfXgqfDM";
const OPPORTUNITY_TABLE = "hWzAptglkbZkNqMU";

const note = sticky(
  "Mode A: records + branch status here; prospect confirm stays on Next.js Resend (wire later). Internal notify is a stub until Resend. Marketing domain pending: northlinecreative.online. Header: X-Northline-Webhook-Secret.",
);

const webhook = trigger({
  type: "n8n-nodes-base.webhook",
  version: 2.1,
  config: {
    name: "Consultation Webhook",
    parameters: {
      httpMethod: "POST",
      path: "consultation-intake",
      responseMode: "responseNode",
      options: {},
    },
  },
});

const checkSecret = ifElse({
  version: 2.3,
  config: {
    name: "Secret Valid?",
    parameters: {
      conditions: {
        combinator: "and",
        options: {
          caseSensitive: true,
          leftValue: "",
          typeValidation: "strict",
          version: 2,
        },
        conditions: [
          {
            id: "secret-check",
            leftValue: expr(
              "={{ $json.headers['x-northline-webhook-secret'] }}",
            ),
            rightValue: G2_SECRET,
            operator: { type: "string", operation: "equals" },
          },
        ],
      },
    },
  },
});

const rejectUnauthorized = node({
  type: "n8n-nodes-base.respondToWebhook",
  version: 1.5,
  config: {
    name: "Reject Unauthorized",
    parameters: {
      respondWith: "json",
      responseBody: expr('={{ { ok: false, error: "unauthorized" } }}'),
      options: { responseCode: 401 },
    },
  },
});

const normalize = node({
  type: "n8n-nodes-base.set",
  version: 3.5,
  config: {
    name: "Normalize Payload",
    parameters: {
      mode: "manual",
      includeOtherFields: false,
      assignments: {
        assignments: [
          {
            id: "a1",
            name: "source",
            value: expr("={{ $json.body.source || 'northline-after' }}"),
            type: "string",
          },
          {
            id: "a2",
            name: "submittedAt",
            value: expr(
              "={{ $json.body.submittedAt || $now.toISO() }}",
            ),
            type: "string",
          },
          {
            id: "a3",
            name: "score",
            value: expr("={{ Number($json.body.score) || 0 }}"),
            type: "number",
          },
          {
            id: "a4",
            name: "band",
            value: expr("={{ $json.body.band || 'low' }}"),
            type: "string",
          },
          {
            id: "a5",
            name: "contactName",
            value: expr("={{ $json.body.contact.name }}"),
            type: "string",
          },
          {
            id: "a6",
            name: "contactEmail",
            value: expr("={{ $json.body.contact.email }}"),
            type: "string",
          },
          {
            id: "a7",
            name: "contactPhone",
            value: expr("={{ $json.body.contact.phone || '' }}"),
            type: "string",
          },
          {
            id: "a8",
            name: "companyName",
            value: expr("={{ $json.body.contact.company }}"),
            type: "string",
          },
          {
            id: "a9",
            name: "industry",
            value: expr("={{ $json.body.qualification.industry }}"),
            type: "string",
          },
          {
            id: "a10",
            name: "decisionMaker",
            value: expr("={{ $json.body.qualification.decisionMaker }}"),
            type: "string",
          },
          {
            id: "a11",
            name: "challenges",
            value: expr("={{ $json.body.qualification.challenges }}"),
            type: "string",
          },
          {
            id: "a12",
            name: "budget",
            value: expr("={{ $json.body.qualification.budget }}"),
            type: "string",
          },
          {
            id: "a13",
            name: "timeline",
            value: expr("={{ $json.body.qualification.timeline }}"),
            type: "string",
          },
          {
            id: "a14",
            name: "scope",
            value: expr("={{ $json.body.qualification.scope }}"),
            type: "string",
          },
          {
            id: "a15",
            name: "goals",
            value: expr("={{ $json.body.qualification.goals }}"),
            type: "string",
          },
          {
            id: "a16",
            name: "automationStatus",
            value: expr(
              "={{ $json.body.band === 'qualified' ? 'calendar_offered' : 'resources_sent' }}",
            ),
            type: "string",
          },
          {
            id: "a17",
            name: "salesNotes",
            value:
              "G2 notify stub — Resend internal ping deferred (Mode A). Domain pending: northlinecreative.online",
            type: "string",
          },
        ],
      },
    },
  },
});

const upsertCompany = node({
  type: "n8n-nodes-base.dataTable",
  version: 1.1,
  config: {
    name: "Upsert Company",
    parameters: {
      resource: "row",
      operation: "upsert",
      dataTableId: {
        __rl: true,
        mode: "id",
        value: COMPANY_TABLE,
        cachedResultName: "Company",
      },
      matchType: "allConditions",
      filters: {
        conditions: [
          {
            keyName: "name",
            condition: "eq",
            keyValue: expr("={{ $json.companyName }}"),
          },
        ],
      },
      columns: {
        mappingMode: "defineBelow",
        matchingColumns: ["name"],
        value: {
          name: expr("={{ $json.companyName }}"),
          industry: expr("={{ $json.industry }}"),
        },
        schema: [
          {
            id: "name",
            displayName: "name",
            required: false,
            defaultMatch: true,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "industry",
            displayName: "industry",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
        ],
      },
    },
  },
});

const prepareContact = node({
  type: "n8n-nodes-base.set",
  version: 3.5,
  config: {
    name: "Prepare Contact",
    parameters: {
      mode: "manual",
      includeOtherFields: false,
      assignments: {
        assignments: [
          {
            id: "c1",
            name: "companyId",
            value: expr("={{ String($json.id) }}"),
            type: "string",
          },
          {
            id: "c2",
            name: "contactName",
            value: expr("={{ $('Normalize Payload').item.json.contactName }}"),
            type: "string",
          },
          {
            id: "c3",
            name: "contactEmail",
            value: expr("={{ $('Normalize Payload').item.json.contactEmail }}"),
            type: "string",
          },
          {
            id: "c4",
            name: "contactPhone",
            value: expr("={{ $('Normalize Payload').item.json.contactPhone }}"),
            type: "string",
          },
          {
            id: "c5",
            name: "decisionMaker",
            value: expr("={{ $('Normalize Payload').item.json.decisionMaker }}"),
            type: "string",
          },
        ],
      },
    },
  },
});

const upsertContact = node({
  type: "n8n-nodes-base.dataTable",
  version: 1.1,
  config: {
    name: "Upsert Contact",
    parameters: {
      resource: "row",
      operation: "upsert",
      dataTableId: {
        __rl: true,
        mode: "id",
        value: CONTACT_TABLE,
        cachedResultName: "Contact",
      },
      matchType: "allConditions",
      filters: {
        conditions: [
          {
            keyName: "email",
            condition: "eq",
            keyValue: expr("={{ $json.contactEmail }}"),
          },
        ],
      },
      columns: {
        mappingMode: "defineBelow",
        matchingColumns: ["email"],
        value: {
          companyId: expr("={{ $json.companyId }}"),
          name: expr("={{ $json.contactName }}"),
          email: expr("={{ $json.contactEmail }}"),
          phone: expr("={{ $json.contactPhone }}"),
          decisionMaker: expr("={{ $json.decisionMaker }}"),
        },
        schema: [
          {
            id: "companyId",
            displayName: "companyId",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "name",
            displayName: "name",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "email",
            displayName: "email",
            required: false,
            defaultMatch: true,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "phone",
            displayName: "phone",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "decisionMaker",
            displayName: "decisionMaker",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
        ],
      },
    },
  },
});

const prepareOpportunity = node({
  type: "n8n-nodes-base.set",
  version: 3.5,
  config: {
    name: "Prepare Opportunity",
    parameters: {
      mode: "manual",
      includeOtherFields: false,
      assignments: {
        assignments: [
          {
            id: "o1",
            name: "companyId",
            value: expr(
              "={{ $('Prepare Contact').item.json.companyId }}",
            ),
            type: "string",
          },
          {
            id: "o2",
            name: "contactId",
            value: expr("={{ String($json.id) }}"),
            type: "string",
          },
          {
            id: "o3",
            name: "leadScore",
            value: expr("={{ $('Normalize Payload').item.json.score }}"),
            type: "number",
          },
          {
            id: "o4",
            name: "band",
            value: expr("={{ $('Normalize Payload').item.json.band }}"),
            type: "string",
          },
          {
            id: "o5",
            name: "scope",
            value: expr("={{ $('Normalize Payload').item.json.scope }}"),
            type: "string",
          },
          {
            id: "o6",
            name: "budget",
            value: expr("={{ $('Normalize Payload').item.json.budget }}"),
            type: "string",
          },
          {
            id: "o7",
            name: "timeline",
            value: expr("={{ $('Normalize Payload').item.json.timeline }}"),
            type: "string",
          },
          {
            id: "o8",
            name: "goals",
            value: expr("={{ $('Normalize Payload').item.json.goals }}"),
            type: "string",
          },
          {
            id: "o9",
            name: "challenges",
            value: expr("={{ $('Normalize Payload').item.json.challenges }}"),
            type: "string",
          },
          {
            id: "o10",
            name: "salesNotes",
            value: expr("={{ $('Normalize Payload').item.json.salesNotes }}"),
            type: "string",
          },
          {
            id: "o11",
            name: "automationStatus",
            value: expr(
              "={{ $('Normalize Payload').item.json.automationStatus }}",
            ),
            type: "string",
          },
          {
            id: "o12",
            name: "winLoss",
            value: "open",
            type: "string",
          },
        ],
      },
    },
  },
});

const insertOpportunity = node({
  type: "n8n-nodes-base.dataTable",
  version: 1.1,
  config: {
    name: "Insert Opportunity",
    parameters: {
      resource: "row",
      operation: "insert",
      dataTableId: {
        __rl: true,
        mode: "id",
        value: OPPORTUNITY_TABLE,
        cachedResultName: "Opportunity",
      },
      columns: {
        mappingMode: "defineBelow",
        value: {
          companyId: expr("={{ $json.companyId }}"),
          contactId: expr("={{ $json.contactId }}"),
          leadScore: expr("={{ $json.leadScore }}"),
          band: expr("={{ $json.band }}"),
          scope: expr("={{ $json.scope }}"),
          budget: expr("={{ $json.budget }}"),
          timeline: expr("={{ $json.timeline }}"),
          goals: expr("={{ $json.goals }}"),
          challenges: expr("={{ $json.challenges }}"),
          salesNotes: expr("={{ $json.salesNotes }}"),
          automationStatus: expr("={{ $json.automationStatus }}"),
          winLoss: expr("={{ $json.winLoss }}"),
        },
        schema: [
          {
            id: "companyId",
            displayName: "companyId",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "contactId",
            displayName: "contactId",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "leadScore",
            displayName: "leadScore",
            required: false,
            defaultMatch: false,
            display: true,
            type: "number",
            canBeUsedToMatch: true,
          },
          {
            id: "band",
            displayName: "band",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "scope",
            displayName: "scope",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "budget",
            displayName: "budget",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "timeline",
            displayName: "timeline",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "goals",
            displayName: "goals",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "challenges",
            displayName: "challenges",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "salesNotes",
            displayName: "salesNotes",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "automationStatus",
            displayName: "automationStatus",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
          {
            id: "winLoss",
            displayName: "winLoss",
            required: false,
            defaultMatch: false,
            display: true,
            type: "string",
            canBeUsedToMatch: true,
          },
        ],
      },
    },
  },
});

const notifyStub = node({
  type: "n8n-nodes-base.set",
  version: 3.5,
  config: {
    name: "Internal Notify Stub",
    parameters: {
      mode: "manual",
      includeOtherFields: true,
      assignments: {
        assignments: [
          {
            id: "n1",
            name: "notifyStatus",
            value: "stubbed_pending_resend",
            type: "string",
          },
          {
            id: "n2",
            name: "opportunityId",
            value: expr("={{ String($json.id) }}"),
            type: "string",
          },
          {
            id: "n3",
            name: "band",
            value: expr("={{ $('Normalize Payload').item.json.band }}"),
            type: "string",
          },
          {
            id: "n4",
            name: "score",
            value: expr("={{ $('Normalize Payload').item.json.score }}"),
            type: "number",
          },
        ],
      },
    },
  },
});

const respondOk = node({
  type: "n8n-nodes-base.respondToWebhook",
  version: 1.5,
  config: {
    name: "Respond OK",
    parameters: {
      respondWith: "json",
      responseBody: expr(
        "={{ { ok: true, band: $json.band, score: $json.score, opportunityId: $json.opportunityId, notifyStatus: $json.notifyStatus } }}",
      ),
      options: { responseCode: 200 },
    },
  },
});

export default workflow(
  "northline-consultation-intake",
  "Northline - Consultation Intake",
)
  .add(note)
  .add(webhook)
  .to(
    checkSecret
      .onTrue(
        normalize
          .to(upsertCompany)
          .to(prepareContact)
          .to(upsertContact)
          .to(prepareOpportunity)
          .to(insertOpportunity)
          .to(notifyStub)
          .to(respondOk),
      )
      .onFalse(rejectUnauthorized),
  );
