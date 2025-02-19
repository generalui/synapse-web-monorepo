import {
  AccessType,
  RestrictableObjectType,
  SubmissionState,
} from '@sage-bionetworks/synapse-types'
import { EvaluationSubmission } from '@sage-bionetworks/synapse-types'
import { MOCK_USER_ID, MOCK_USER_ID_2 } from '../user/mock_user_profile'

export const mockRejectedSubmission: EvaluationSubmission = {
  id: '3',
  accessRequirementId: '9602626',
  accessRequirementVersion: 1,
  requestId: '1',
  ducFileHandleId: '3997203',
  irbFileHandleId: '3997205',
  accessorChanges: [
    {
      userId: MOCK_USER_ID.toString(),
      type: AccessType.RENEW_ACCESS,
    },
    {
      userId: MOCK_USER_ID_2.toString(),
      type: AccessType.REVOKE_ACCESS,
    },
  ],
  researchProjectSnapshot: {
    id: '1',
    accessRequirementId: '9602626',
    institution: 'Bage Sionetworks',
    projectLead: 'Nick G',
    intendedDataUseStatement: 'Updated IDU',
    createdOn: '2022-05-10T15:49:56.292Z',
    modifiedOn: '2022-05-11T13:25:06.021Z',
    createdBy: MOCK_USER_ID.toString(),
    modifiedBy: MOCK_USER_ID.toString(),
    etag: '8d0d4ec8-4cd9-45a7-b09d-390cd64cfca4',
  },
  isRenewalSubmission: true,
  publication: '',
  summaryOfUse: '',
  submittedOn: '2022-05-11T13:25:20.262Z',
  modifiedOn: '2022-05-11T13:26:18.583Z',
  submittedBy: MOCK_USER_ID.toString(),
  modifiedBy: MOCK_USER_ID.toString(),
  state: SubmissionState.REJECTED,
  rejectedReason:
    'Thank you for submitting your data access request. Before I can accept your request, please address the following:\n\nFix incorrect data.\n\nPlease contact us at act@sagebionetworks.org if you have any questions.\n\nRegards,\nAccess and Compliance Team (ACT)\nact@sagebionetworks.org',
  etag: '626f9567-bf5f-41e0-9bbf-cf1cd23e6b54',
  subjectId: 'syn12156790',
  subjectType: RestrictableObjectType.ENTITY,
}
export const mockSubmittedSubmission: EvaluationSubmission = {
  id: '1',
  accessRequirementId: '9602626',
  accessRequirementVersion: 1,
  requestId: '1',
  ducFileHandleId: '3997203',
  irbFileHandleId: '3997205',
  attachments: ['123456', '123457'],
  accessorChanges: [
    {
      userId: MOCK_USER_ID.toString(),
      type: AccessType.GAIN_ACCESS,
    },
    {
      userId: MOCK_USER_ID_2.toString(),
      type: AccessType.GAIN_ACCESS,
    },
  ],
  researchProjectSnapshot: {
    id: '1',
    accessRequirementId: '9602626',
    institution: 'Bage Sionetworks',
    projectLead: 'Nick G',
    intendedDataUseStatement:
      'I plan to see if the data is real data, because I suspect that this is really fake data created solely for a testing environment where software engineers pretend to be the users for whom they are trying to build features.',
    createdOn: '2022-05-10T15:49:56.292Z',
    modifiedOn: '2022-05-10T15:49:56.292Z',
    createdBy: MOCK_USER_ID.toString(),
    modifiedBy: MOCK_USER_ID.toString(),
    etag: '7ea28f9e-81cb-43be-a614-9eb1a0dabafc',
  },
  isRenewalSubmission: false,
  submittedOn: '2022-05-10T15:50:19.275Z',
  modifiedOn: '2022-05-10T15:50:19.275Z',
  submittedBy: MOCK_USER_ID.toString(),
  modifiedBy: MOCK_USER_ID.toString(),
  state: SubmissionState.SUBMITTED,
  etag: '40820b64-c436-486b-8fb8-afef931fbcb3',
  subjectId: 'syn12156790',
  subjectType: RestrictableObjectType.ENTITY,
}
export const mockApprovedSubmission: EvaluationSubmission = {
  id: '2',
  accessRequirementId: '9602626',
  accessRequirementVersion: 1,
  requestId: '2',
  ducFileHandleId: '3997211',
  irbFileHandleId: '3997213',
  attachments: ['3997211'],
  accessorChanges: [
    {
      userId: MOCK_USER_ID.toString(),
      type: AccessType.GAIN_ACCESS,
    },
  ],
  researchProjectSnapshot: {
    id: '2',
    accessRequirementId: '9602626',
    institution: 'None',
    projectLead: 'NickACT',
    intendedDataUseStatement: 'Give me data pls',
    createdOn: '2022-05-10T17:17:14.757Z',
    modifiedOn: '2022-05-10T17:18:17.913Z',
    createdBy: MOCK_USER_ID.toString(),
    modifiedBy: MOCK_USER_ID.toString(),
    etag: '270234fd-da28-4098-8fd2-5693fee82c19',
  },
  isRenewalSubmission: false,
  submittedOn: '2022-05-10T17:18:28.801Z',
  modifiedOn: '2022-05-10T17:20:09.356Z',
  submittedBy: MOCK_USER_ID.toString(),
  modifiedBy: MOCK_USER_ID.toString(),
  state: SubmissionState.APPROVED,
  etag: '5fefb2d1-8600-4e1e-96e1-cf57f2ff7fd0',
  subjectId: 'syn12156790',
  subjectType: RestrictableObjectType.ENTITY,
}

export const mockDemoSubmission: EvaluationSubmission = {
  id: '4',
  accessRequirementId: '9603055',
  accessRequirementVersion: 1,
  requestId: '1',
  ducFileHandleId: '3997203',
  irbFileHandleId: '3997205',
  attachments: ['123456', '123457'],
  accessorChanges: [
    {
      userId: '3431185',
      type: AccessType.RENEW_ACCESS,
    },
    {
      userId: '3350396',
      type: AccessType.GAIN_ACCESS,
    },
    {
      userId: '3371908',
      type: AccessType.REVOKE_ACCESS,
    },
  ],
  researchProjectSnapshot: {
    id: '1',
    accessRequirementId: '9603055',
    institution: 'Bage Sionetworks',
    projectLead: 'Adam H',
    intendedDataUseStatement:
      'I plan to see if the data is real data, because I suspect that this is really fake data created solely for a testing environment.',
    createdOn: '2022-05-10T15:49:56.292Z',
    modifiedOn: '2022-05-10T15:49:56.292Z',
    createdBy: '3431185',
    modifiedBy: '3431185',
    etag: '7ea28f9e-81cb-43be-a614-9eb1a0dabafc',
  },
  isRenewalSubmission: false,
  submittedOn: '2022-05-10T15:50:19.275Z',
  modifiedOn: '2022-05-10T15:50:19.275Z',
  submittedBy: '3431185',
  modifiedBy: '3431185',
  state: SubmissionState.SUBMITTED,
  etag: '40820b64-c436-486b-8fb8-afef931fbcb3',
  subjectId: 'syn12156790',
  subjectType: RestrictableObjectType.ENTITY,
}

export const mockSubmissions: EvaluationSubmission[] = [
  mockApprovedSubmission,
  mockRejectedSubmission,
  mockSubmittedSubmission,
  mockDemoSubmission,
]
